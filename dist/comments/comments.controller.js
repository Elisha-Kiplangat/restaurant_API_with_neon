"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentController = exports.updateCommentController = exports.addCommentController = exports.oneCommentController = exports.commentController = void 0;
const comments_service_1 = require("./comments.service");
const commentController = async (c) => {
    try {
        const comments = await (0, comments_service_1.commentService)();
        return c.json(comments);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.commentController = commentController;
const oneCommentController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const order = await (0, comments_service_1.oneCommentService)(id);
    if (order == undefined) {
        return c.text("order not found", 404);
    }
    return c.json(order, 200);
};
exports.oneCommentController = oneCommentController;
//add user
const addCommentController = async (c) => {
    try {
        const comment = await c.req.json();
        const createdComment = await (0, comments_service_1.addCommentService)(comment);
        if (!createdComment)
            return c.text("Comment not created", 404);
        return c.json({ msg: createdComment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addCommentController = addCommentController;
const updateCommentController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await (0, comments_service_1.oneCommentService)(id);
        if (searchedUser == undefined)
            return c.text("Comment not found", 404);
        // get the data and update it
        const res = await (0, comments_service_1.updateCommentService)(id, user);
        // return a success message
        if (!res)
            return c.text("comment not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCommentController = updateCommentController;
const deleteCommentController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, comments_service_1.oneCommentService)(id);
        if (user == undefined)
            return c.text("Comment not found", 404);
        //deleting the user
        const res = await (0, comments_service_1.deleteCommentService)(id);
        if (!res)
            return c.text("Comment not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCommentController = deleteCommentController;
