import { Context } from "hono";
import { commentService, addCommentService,updateCommentService, deleteCommentService, oneCommentService } from "./comments.service";

export const commentController = async (c: Context) => {
    try{
        const comments = await commentService();
        return c.json(comments);
    } catch (err: any) {
        console.error(err)
        return c.json({error: 'Internal Server Error'}, 500)
    }
    
}
export const oneCommentController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order = await oneCommentService(id);
    if (order == undefined) {
        return c.text("order not found", 404);
    }
    return c.json(order, 200);
}

//add user

export const addCommentController: any = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const createdComment = await addCommentService(comment);

        if (!createdComment) return c.text("Comment not created", 404);
        return c.json({ msg: createdComment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCommentController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await oneCommentService(id);
        if (searchedUser == undefined) return c.text("Comment not found", 404);
        // get the data and update it
        const res = await updateCommentService(id, user);
        // return a success message
        if (!res) return c.text("comment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCommentController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await oneCommentService(id);
        if (user == undefined) return c.text("Comment not found", 404);
        //deleting the user
        const res = await deleteCommentService(id);
        if (!res) return c.text("Comment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}