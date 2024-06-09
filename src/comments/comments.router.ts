import {Hono} from 'hono'
import {commentController, oneCommentController, addCommentController, updateCommentController, deleteCommentController} from './comments.controller'
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validator";

export const commentRouter = new Hono();

commentRouter.get('comments', commentController);
//one order
commentRouter.get("/comments/:id", oneCommentController)

commentRouter.post("comments", zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addCommentController)

commentRouter.put("/comments:id", updateCommentController)

commentRouter.delete("/comments/:id", deleteCommentController)

export default commentRouter;