import db from "../drizzle/db"
import { commentselect, commentInsert, CommentTable } from "../drizzle/schema"
import {eq} from "drizzle-orm";


export const commentService = async (): Promise<commentselect[]> => {
    try {
        const comments = await db.query.CommentTable.findMany();
        console.log('Comments fetched:', comments);
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}
export const oneCommentService = async (id: number): Promise<commentselect | undefined> => {
    return await db.query.CommentTable.findFirst({
        where: eq(CommentTable.id, id)
    })
}

export const addCommentService = async (comment: commentInsert) => {
    await db.insert(CommentTable).values(comment)
    return "Comment added successfully";
}

export const updateCommentService = async (id: number, comment: commentInsert) => {
    await db.update(CommentTable).set(comment).where(eq(CommentTable.id, id));
    return "Comment update successfully";
}

export const deleteCommentService = async (id: number) => {
    await db.delete(CommentTable).where(eq(CommentTable.id, id));
    return "Comment deleted successfully"
}