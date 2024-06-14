import {Hono} from 'hono'
import {commentController, oneCommentController, addCommentController, updateCommentController, deleteCommentController} from './comments.controller'
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validator";
import { adminRoleAuth, userRoleAuth, allRoleAuth } from "../middleware/bearAuth";


export const commentRouter = new Hono();

commentRouter.get('comments', adminRoleAuth, commentController);
//one order
commentRouter.get("/comments/:id", allRoleAuth, oneCommentController)

commentRouter.post("comments", allRoleAuth, zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCommentController)

commentRouter.put("/comments:id", allRoleAuth, updateCommentController)

commentRouter.delete("/comments/:id", adminRoleAuth, deleteCommentController)

export default commentRouter;