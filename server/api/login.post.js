// /api/login

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!validator.isEmail(body.email)) {
            throw createError({
                statusCode: 400,
                message: "Invalid email address",
            });
        };

        if (!validator.isStrongPassword(body.password, {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
        })) {
            throw createError({
                statusCode: 400,
                message: "Password is not 8 characters long",
            });
        };

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        // Hash password
        const isValid = await bcrypt.compare(body.password, user.password);
        console.log("valid", isValid);

        if(!isValid) {
            throw createError({
                statusCode: 401,
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        setCookie(event, "NoteNestJWT", token);

        return { data: "success", user: user };
    } catch (error) {
        console.log(error.code);

        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                message: "An email with this address already exists",
            })
        }
        throw error;
    }
});
