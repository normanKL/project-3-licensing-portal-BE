//- ./controllers/specialistController.ts

import { Request, Response } from "express";
import Specialists from "../models/Specialist";
import formatValidationError from "../errors/validation";
import LifeInsurance from "../models/LifeInsurance";
import Takaful from "../models/Takaful"
import mongoose from "mongoose";

export const createSpecialist = async (req: Request, res: Response) => {
    const { region, insurance, takaful, ...specialistData } = req.body
    const userRegion = req.currentUser.region

    try {
        if (region !== userRegion) {
            return res.status(403).json({ message: "❗️ Unauthorized: You can only create specialists in your region" })
        }

        const specialist = await Specialists.create({
            ...specialistData,
            user: req.currentUser._id,
            region: userRegion,
            insurance,
            takaful
        })

        res.status(201).json(specialist)
    } catch (error) {
        res.status(400).json({
            message: "❗️ Failed to create specialist",
            errors: formatValidationError(error),
        })
    }
}

export const updateSpecialist = async (req: Request, res: Response) => {
    const { specialistId } = req.params
    const userRegion = req.currentUser.region
    const { insurance, takaful } = req.body

    try {
        const specialist = await Specialists.findById(specialistId).populate('insurance').populate('takaful')

        if (!specialist) {
            return res.status(404).json({ message: "❗️ Specialist not found" });
        }

        if (specialist.region !== userRegion) {
            return res.status(403).json({ message: "❗️ Unauthorized: You can only update specialists in your region" });
        }

        if (insurance) {
            const insuranceId = specialist.insurance;
            if (!insuranceId) {
                const newInsurance = new LifeInsurance(insurance)
                await newInsurance.save()
                specialist.insurance = newInsurance._id
            } else {
                const updatedInsurance = await LifeInsurance.findByIdAndUpdate(insuranceId, insurance, { new: true })
                if (!updatedInsurance) {
                    return res.status(404).json({ message: "❗️ Insurance not found" })
                }
            }
        }

        if (takaful) {
            const takafulId = specialist.takaful
            if (!takafulId) {
                const newTakaful = new Takaful(takaful)
                await newTakaful.save()
                specialist.takaful = newTakaful._id
            } else {
                const updatedTakaful = await Takaful.findByIdAndUpdate(takafulId, takaful, { new: true })
                if (!updatedTakaful) {
                    return res.status(404).json({ message: "❗️ Takaful not found" })
                }
            }
        }

        const updatedSpecialist = await specialist.save()
        res.status(200).json(updatedSpecialist)
    } catch (error) {
        res.status(500).json({ message: "❗️ Failed to update specialist", error });
    }
}

export const deleteSpecialist = async (req: Request, res: Response) => {
    const { specialistId } = req.params
    const userRegion = req.currentUser.region

    try {
        const specialist = await Specialists.findById(specialistId)

        if (!specialist) {
            return res.status(404).json({ message: "❗️ Specialist not found" })
        }

        if (specialist.region !== userRegion) {
            return res.status(403).json({ message: "❗️ Unauthorized: You can only delete specialists in your region" })
        }

        await Specialists.deleteOne({ _id: specialistId })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: "Failed to delete specialist", error })
    }
};

export const getAllSpecialists = async (req: Request, res: Response) => {
    try {
        const specialists = await Specialists.find()
            .populate('user')
            .populate('insurance')
            .populate('takaful')
        res.status(200).json(specialists)
    } catch (error) {
        res.status(500).json({ message: "❗️ Failed to retrieve specialists", error })
    }
}

export const getSpecialists = async (req: Request, res: Response) => {
    try {
        const { name, region, branch } = req.query
        const filter: any = {}

        if (name && typeof name === 'string') {
            filter.name = new RegExp(name, 'i') // Case-insensitive name search
        }

        if (region && typeof region === 'string') {
            filter.region = region
        }

        if (branch && typeof branch === 'string') {
            filter.branch = branch
        }

        const specialists = await Specialists.find(filter)
            .populate('user')
            .populate('insurance')
            .populate('takaful')

        res.status(200).json(specialists)
    } catch (error) {
        console.error("Error retrieving specialists:", error)

        // Check if the error is an instance of the Error object
        if (error instanceof Error) {
            res.status(500).json({ message: "❗️ Error retrieving specialists", error: error.message })
        } else {
            // Handle case where the error is not an instance of Error (e.g., if it’s a string)
            res.status(500).json({ message: "❗️ Error retrieving specialists", error: String(error) })
        }
    }
}

export const getSpecialistById = async (req: Request, res: Response) => {
    const { specialistId } = req.params

    try {
        const specialist = await Specialists.findById(specialistId)
            .populate('user')
            .populate('insurance')
            .populate('takaful')

        if (!specialist) {
            return res.status(404).json({ message: "❗️ Specialist not found" })
        }

        res.status(200).json(specialist)
    } catch (error) {
        res.status(500).json({ message: "❗️ Failed to retrieve specialist", error })
    }
}

export const getSpecialistsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params // Get userId from the route params
        const specialists = await Specialists.find({ user: userId })
            .populate('user')
            .populate('insurance')
            .populate('takaful')

        if (specialists.length === 0) {
            return res.status(404).json({ message: "❗️ No specialists found for this user" })
        }

        res.status(200).json(specialists);
    } catch (error) {
        res.status(500).json({ message: "❗️ Failed to retrieve specialists", error })
    }
};

export const getSpecialistsByRegion = async (req: Request, res: Response) => {
    const { region } = req.query;

    if (!region) {
        return res.status(400).json({ message: "❗️ Region is required" })
    }

    try {
        const specialists = await Specialists.find({ region })
            .populate('user')
            .populate('insurance')
            .populate('takaful');

        if (specialists.length === 0) {
            return res.status(404).json({ message: "❗️ No specialists found for this region" })
        }

        res.status(200).json(specialists);
    } catch (error) {
        console.error("Error retrieving specialists by region:", error)
        res.status(500).json({ message: "❗️ Failed to retrieve specialists", error })
    }
}