//- ./models/userController

import Users from "../models/User"
import { Request, Response } from "express";
import { validatePassword, checkPassword } from "../models/User";
import formatValidationError from "../errors/validation";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export const signup = async (req: Request, res: Response) => {
    try {
      if (checkPassword(req.body.password, req.body.passwordConfirmation)) {
        const user = await Users.create(req.body)
        res.send(user)
      } else {
        res.status(400).send({
          message: "❗️ Passwords do not match",
          errors: { password: "❗️ Does not match password" },
        });
      }
    } catch (e) {
      res.status(400).send({
        message: "❗️ There was an error creating the user",
        errors: formatValidationError(e),
      })
    }
  }

  export const login = async (req: Request, res: Response) => {
    try {
      const incomingPassword = req.body.password
      const incomingEmail = req.body.email
      const foundUser = await Users.findOne({ email: incomingEmail })
  
      if (!foundUser) {
        return res.status(401).json({ message: "❗️ login failed. User not found" })
      }
  
      const isValidPw: boolean = validatePassword(
        incomingPassword,
        foundUser.password
      )
  
      if (isValidPw) {
        const token = jwt.sign(
          { userId: foundUser._id, email: foundUser.email }, 
          process.env.SECRET || "developmentSecret", 
          { expiresIn: "24h" } 
        )
  
        res.send({ message: "Login successful", token })
      } else {
        res
          .status(401)
          .send({ message: "❗️ Login failed. Check credentials and try again!" })
      }
    } catch (e) {
      res
        .status(401)
        .send({ message: "❗️ Login failed. Check credentials and try again!" })
    }
  };

  export async function getCurrentUser(req: Request, res: Response) {
    try {
      res.status(200).send(req.currentUser)
    } catch (error) {
      res
        .status(500)
        .send({ message: "❗️ There was an error, please try again later." });
    }
  }

  export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "❗️ There was an error retrieving users." })
    }
}
  
  