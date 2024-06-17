import { Context } from 'hono';
import 'dotenv/config';
import { registerService, loginService, updatepasswordService } from './auth.service';

import bcrypt from 'bcrypt';
import { sign } from 'hono/jwt';


export const registerController = async (c: Context) => {
    try {
        const user = await c.req.json();
        console.log('Registering user:', user);
        const pass = user.password;
        const hashedPass = await bcrypt.hash(pass, 10);
        user.password = hashedPass;
        const createdUser = await registerService(user);

        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const loginController = async (c: Context) => {
        try {
            const user = await c.req.json();
            //check user exist
            const userExist = await loginService(user);
            if (userExist === null) return c.json({ error: "User not found" }, 404);  // not found         
            const userMatch = await bcrypt.compare(user.password, userExist?.password as string);
            if (!userMatch) {
                return c.json({ error: "Invalid credentials" }, 401);  // unauthorized
            } else {
                // create a payload
                const payload = {
                    sub: userExist?.email,
                    role: userExist?.role,
                    exp: Math.floor(Date.now() / 1000) + (60 * 180)  // 3 hour  => SESSION EXPIRATION
                }
                let secret = process.env.JWT_SECRET as string;  // secret key
                const token = await sign(payload, secret);   // create a JWT token
                let user = userExist?.email;
                let role = userExist?.role;
                return c.json({ token, user: { role, user } }, 200);  // return token and user details
            }
        } catch (error: any) {
            return c.json({ error: error?.message }, 400)
        }

    }

export const updatepasswordController = async (c: Context) => {
    try {
        const { email, password } = await c.req.json();
        const hashedPass = await bcrypt.hash(password, 10);
        const message = await updatepasswordService(email, hashedPass);
        return c.json({ msg: message }, 200);
    } catch (error: any) {
        if (error.message === "User not found") {
            return c.json({ error: "User not found" }, 404);
        }
        return c.json({ error: error?.message || "An error occurred" }, 400);
    }
}

import { AuthTable } from '../drizzle/schema';
import db from '../drizzle/db';
import { sql } from 'drizzle-orm';
import mailFunction from '../mail/reset';
import jwt from 'jsonwebtoken';
// import { generateResetToken } from './auth.service'; // Moved token generation to a service

export const generateResetToken = async (user: any): Promise<string> => {
    const payload = {
        email: user.email
    };
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRESIN;
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
    return token;
};

export const verifyResetToken = (token: string): string | object => {
    const secret = process.env.JWT_SECRET as string;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

export const requestPasswordResetController = async (c: Context) => {
    try {
        const { email } = await c.req.json();

        // Get user info
        const user = await db.select().from(AuthTable).where(sql`${AuthTable.email} = ${email}`).limit(1);

        if (user.length === 0) {
            return c.json({ error: "User not found" }, 404);
        }

        // Generate reset token
        const token = await generateResetToken(user[0]); // Pass the user object

        const userName = user[0].email; // Adjust based on your actual user table structure

        // Prepare data for the email template
        const resetLink = `https://restaurant-mngt.azurewebsites.net/reset-password?token=${token}`;
        const data = { email, resetLink, appName: 'Restaurant' };

        // Send reset password email
        await mailFunction(email, 'Password Reset Request', data); // Pass data to the mail function

        return c.json({ msg: 'Password reset email sent successfully' }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message || "An error occurred" }, 400);
    }
};

export const resetPasswordController = async (c: Context) => {
    try {
        const { token, newPassword } = await c.req.json();

        const decoded = verifyResetToken(token);
        const email = (decoded as any).email;

        // Update the user's password in the database
        await db.update(AuthTable).set({ password: newPassword }).where(sql`${AuthTable.email} = ${email}`);

        return c.json({ msg: 'Password reset successful' }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message || "An error occurred" }, 400);
    }
};
