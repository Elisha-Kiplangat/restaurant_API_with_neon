import { Context } from 'hono';
import 'dotenv/config';
import { registerService, loginService } from './auth.service';

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

// export const updatepasswordController = async (c: Context) => {
//     try {
//         const { email, password } = await c.req.json();
//         const hashedPass = await bcrypt.hash(password, 10);
//         const message = await updatepasswordService(email, hashedPass);
//         return c.json({ msg: message }, 200);
//     } catch (error: any) {
//         if (error.message === "User not found") {
//             return c.json({ error: "User not found" }, 404);
//         }
//         return c.json({ error: error?.message || "An error occurred" }, 400);
//     }
// }