//- ./models/Specialist.ts

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, max: 280 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const specialistSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    designation: { type: String, required: true },
    region: {
        type: String,
        enum: [
            'Northern 1',
            'Northern 2',
            'Central 1',
            'Central 2',
            'Southern',
            'East Malaysia'
        ],
        required: true
    },
    branch: { type: String, required: true },
    // adding 'refencing relationship' - Life Insurance & Takaful
    insurance: { type: mongoose.Schema.Types.ObjectId, ref: 'LifeInsurance'},
    takaful: { type: mongoose.Schema.Types.ObjectId, ref: 'Takaful'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: [commentSchema]
})

export default mongoose.model('Specialists', specialistSchema)