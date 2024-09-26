//- ./models/User.ts

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import mongooseHidden from "mongoose-hidden";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (email: string) =>
            validator.isEmail(email) && email.endsWith('@hbbc.com')
    },
    password: {
        type: String,
        required: true,
        validate: (password: string) =>
            validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1,
                minNumbers: 1
            })
    },
    image: { type: String, required: true},
    designation: {type: String, required: true},
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
        required: true},
    branch:{type: String, required: true}
})


userSchema.pre("save", function hashPassword(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
})

export function validatePassword(
    plainTextPassword: string,
    hashedPasswordFromDB: string
) { 
    return bcrypt.compareSync(plainTextPassword, hashedPasswordFromDB)
}

export function checkPassword (
    password: string, 
    passwordConfirmation: string
) {
    return password === passwordConfirmation
}

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true } }))

export default mongoose.model("User", userSchema)