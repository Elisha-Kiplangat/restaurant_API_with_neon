import "dotenv/config";
import { verify } from "hono/jwt"
import { Context, Next } from "hono";


//AUTHENTICATION MIDDLEWARE
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret)
        return decoded;
    } catch (error: any) {
        return null
    }
}
//AUTHORIZATION MIDDLEWARE
export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");

    if (!token) return c.json({ error: "Token not provided" }, 401);

    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decoded) return c.json({ error: "Invalid token" }, 401);

    if (decoded.role !== requiredRole) return c.json({ error: "Unauthorized" }, 401);
    return next();

    //both user and admin
    
    // if (requiredRole === "all") {
    //     if (decoded.role === "admin" || decoded.role === "user") {
    //         c.req.user = decoded;
    //         return next();
    //     }
    // } else if (decoded.role === requiredRole) {
    //     c.req.user = decoded;
    //     return next();
    // }

    return c.json({ error: "Unauthorized" }, 401);
}
 

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin")
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user")
export const allRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "all")

