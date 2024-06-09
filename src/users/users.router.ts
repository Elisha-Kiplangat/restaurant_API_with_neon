import {Hono} from 'hono'
import {userController, oneUserController, addUserController, updateUserController, deleteUserController} from './users.controller'
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";

export const userRouter = new Hono();

userRouter.get('users', userController);

//one user
userRouter.get("/users/:id", oneUserController)

//add user

userRouter.post("users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addUserController)




//update a user
userRouter.put("/users/:id", updateUserController)

userRouter.delete("/users/:id", deleteUserController)


export default userRouter;