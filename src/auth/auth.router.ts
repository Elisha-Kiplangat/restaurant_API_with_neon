import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { registerSchema, loginSchema, updatePassSchema } from '../validator';
import { registerController, loginController, updatepasswordController } from './auth.controller';
import { adminRoleAuth } from '../middleware/bearAuth';

export const authRouter = new Hono();

authRouter.post('register', zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }

}), registerController);

// authRouter.post("auth", zValidator('json', registerSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }), registerController)

authRouter.post('login', zValidator('json', loginSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }

}), loginController);


authRouter.put('update-password', zValidator('json', updatePassSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }

}),
    updatepasswordController
);
