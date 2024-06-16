import { Hono } from 'hono'
import { userController, oneUserController, addUserController, userDetailController, updateUserController, deleteUserController } from './users.controller'
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const userRouter = new Hono();

userRouter.get('/users', adminRoleAuth, userController);

//one user
userRouter.get("/users/:id", allRoleAuth, oneUserController)

//add user

userRouter.post("users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addUserController)




//update a user
userRouter.put("/users/:id",adminRoleAuth, updateUserController)

userRouter.delete("/delete/:id", adminRoleAuth, deleteUserController)

userRouter.get("/user-details/:id", adminRoleAuth, userDetailController)


export default userRouter;