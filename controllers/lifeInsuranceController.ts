//- ./controllers/lifeInsuranceController.ts

import { Request, Response } from "express";
import LifeInsurance, { ILifeInsurance } from "../models/LifeInsurance";

export const createLifeInsurance = async (req: Request, res: Response) => {
    try {
        const { completed, pending, licensing, status } = req.body
        const newLifeInsurance: ILifeInsurance = new LifeInsurance({
            completed,
            pending,
            licensing,
            status,
        })

        await newLifeInsurance.save()
        res.status(201).json(newLifeInsurance)
    } catch (error) {
        res.status(500).json({ message: "❗️ Failed to create life insurance", error })
    }
}

export const updateLifeInsurance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { completed, pending, licensing, status } = req.body
        const updatedLifeInsurance = await LifeInsurance.findByIdAndUpdate(
            id,
            { completed, pending, licensing, status },
            { new: true, runValidators: true }
        )

        if (!updatedLifeInsurance) {
            return res.status(404).json({ message: "❗️ Life insurance record not found" })
        }

        res.status(200).json(updatedLifeInsurance)
    } catch (error) {
        res.status(500).json({ message: "❗️ Failed to update life insurance", error })
    }
}