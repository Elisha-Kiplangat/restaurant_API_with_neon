"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const hono_1 = require("hono");
const comments_controller_1 = require("./comments.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.commentRouter = new hono_1.Hono();
exports.commentRouter.get('comments', comments_controller_1.commentController);
//one order
exports.commentRouter.get("/comments/:id", comments_controller_1.oneCommentController);
exports.commentRouter.post("comments", (0, zod_validator_1.zValidator)('json', validator_1.commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), comments_controller_1.addCommentController);
exports.commentRouter.put("/comments:id", comments_controller_1.updateCommentController);
exports.commentRouter.delete("/comments/:id", comments_controller_1.deleteCommentController);
exports.default = exports.commentRouter;
