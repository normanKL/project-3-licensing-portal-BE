//- ./controllers/commentController.ts

import { Request, Response } from "express";
import Specialists from "../models/Specialist";

export const createComment = async (req: Request, res: Response) => {
    const { specialistId } = req.params;
    const { text } = req.body;

    try {
        const specialist = await Specialists.findById(specialistId);

        if (!specialist) {
            return res.status(404).json({ message: "Specialist not found" });
        }

        const newComment = { text, user: req.currentUser._id }; // Add the current user ID
        specialist.comment.push(newComment);

        await specialist.save();

        return res.status(201).json(specialist);
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(400).json({ message: "Failed to create comment", error });
    }
};


export const updateComment = async (req: Request, res: Response) => {
    const { specialistId, commentId } = req.params;

    try {
        const specialist = await Specialists.findById(specialistId);

        if (!specialist) {
            return res.status(404).json({ message: "Specialist not found" });
        }

        const comment = specialist.comment.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        if (!comment.user || !comment.user.equals(req.currentUser._id)) {
            return res.status(401).json({ message: "Unauthorized: You cannot update this comment" });
        }

        comment.set(req.body); 

        await specialist.save();

        return res.status(200).json(specialist);
    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(400).json({ message: "Failed to update comment", error });
    }
};


export const deleteComment = async (req: Request, res: Response) => {
    const { specialistId, commentId } = req.params;

    try {
        const specialist = await Specialists.findById(specialistId);

        if (!specialist) {
            return res.status(404).json({ message: "Specialist not found" });
        }

        const comment = specialist.comment.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if the user is the owner of the comment
        if (!comment.user || !comment.user.equals(req.currentUser._id)) {
            return res.status(401).json({ message: "Unauthorized: You cannot delete this comment" });
        }

        // Use pull to remove the comment from the array
        specialist.comment.pull(commentId);
        await specialist.save();

        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(400).json({ message: "Failed to delete comment", error });
    }
};
