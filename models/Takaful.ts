//- ./models/Takaful.ts

import mongoose from "mongoose";

const takafulSchema = new mongoose.Schema({
    completed: {
        type: String,
        enum: [
            'Module A',
            'Module C',
            'Module A & C',
            'None'
        ],
        required: false // Make optional
    },
    pending: {
        type: String,
        enum: [
            'Module A',
            'Module C',
            'Module A & C',
            'None'
        ],
        required: false // Make optional
    },
    licensing: {
        type: String,
        enum: [
            'Pending exam',
            'In progress - Transfer',
            'In progress - New',
            'Failed or blacklisted',
            'Completed'
        ],
        required: false // Make optional
    },
    status: {
        type: String,
        enum: [
            'Completed',
            'Pending exam',
            'In progress',
            'Query from regulator',
            'Failed or blacklisted'
        ],
        required: false // Make optional
    }
});

export default mongoose.model('Takaful', takafulSchema);

export interface ITakaful extends mongoose.Document {
    completed?: string | null; // Allow null
    pending?: string | null; // Allow null
    licensing?: string | null; // Allow null
    status?: string | null; // Allow null
}
