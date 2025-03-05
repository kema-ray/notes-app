// api/user

// Hashing passwords
// - Prevents PW from being stored in plaintext
// - mypassword123 jnjvsadcjncuwinuiwebjksab,/#@$fasDFVCASDR$@#

// Salts
// - salt = string of random characters
// - Typically added to the beginning of a user's PW
//    - mypassword123 becomes x#fSA#Amypassword123
// - Used to prevent hackers from using precomputed hash tables to crack a PW
// - Each user gets their own salt so even if two users have the same PW
//   their password's look completely different

// Generate secret:
// - node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.email || !body.password) {
            throw new Error("Email and password are required");
        }

        // Check if user already exists (prevent duplicates)
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                salt: salt,
            },
        });

        return { data: "success", user: newUser };
    } catch (error) {
        console.error("API Error:", error.message);
        return createError({ statusCode: 500, message: error.message });
    }
});
