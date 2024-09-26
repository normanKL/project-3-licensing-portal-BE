//- ./controllers/takafulController.ts

import { Request, Response } from "express";
import Takaful, { ITakaful } from "../models/Takaful";

export const createTakaful = async (req: Request, res: Response) => {
    try {
        const { completed, pending, licensing, status } = req.body
        const newTakaful: ITakaful = new Takaful({
            completed,
            pending,
            licensing,
            status,
        })

        await newTakaful.save()

        res.status(201).json(newTakaful)
    } catch (error) {
        console.error("Error creating Takaful:", error);
        res.status(500).json({ message: "❗️ Failed to create Takaful", error });
    }
}
