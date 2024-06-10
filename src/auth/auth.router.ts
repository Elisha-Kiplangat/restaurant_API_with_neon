import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { registerSchema, loginSchema } from '../validator';
import { registerController, loginController } from './auth.controller';

export const authRouter = new Hono();

authRouter.post('register', zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }

}), registerController);

authRouter.post("auth", zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerController)

authRouter.post('login', zValidator('json', loginSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }

}), loginController);
