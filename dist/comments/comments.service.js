"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.updateCommentService = exports.addCommentService = exports.oneCommentService = exports.commentService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const commentService = async () => {
    try {
        const comments = await db_1.default.query.CommentTable.findMany();
        console.log('Comments fetched:', comments);
        return comments;
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};
exports.commentService = commentService;
const oneCommentService = async (id) => {
    return await db_1.default.query.CommentTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CommentTable.id, id)
    });
};
exports.oneCommentService = oneCommentService;
const addCommentService = async (comment) => {
    await db_1.default.insert(schema_1.CommentTable).values(comment);
    return "Comment added successfully";
};
exports.addCommentService = addCommentService;
const updateCommentService = async (id, comment) => {
    await db_1.default.update(schema_1.CommentTable).set(comment).where((0, drizzle_orm_1.eq)(schema_1.CommentTable.id, id));
    return "Comment update successfully";
};
exports.updateCommentService = updateCommentService;
const deleteCommentService = async (id) => {
    await db_1.default.delete(schema_1.CommentTable).where((0, drizzle_orm_1.eq)(schema_1.CommentTable.id, id));
    return "Comment deleted successfully";
};
exports.deleteCommentService = deleteCommentService;
