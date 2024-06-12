import {Hono} from 'hono'
import {commentController, oneCommentController, addCommentController, updateCommentController, deleteCommentController} from './comments.controller'
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const commentRouter = new Hono();

commentRouter.get('comments', adminRoleAuth, commentController);
//one order
commentRouter.get("/comments/:id", userRoleAuth, oneCommentController)

commentRouter.post("comments", userRoleAuth, zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCommentController)

commentRouter.put("/comments:id", userRoleAuth, updateCommentController)

commentRouter.delete("/comments/:id", adminRoleAuth, deleteCommentController)

export default commentRouter;