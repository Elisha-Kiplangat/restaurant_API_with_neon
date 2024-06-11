"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.userRouter = new hono_1.Hono();
exports.userRouter.get('/users', bearAuth_1.adminRoleAuth, users_controller_1.userController);
//one user
exports.userRouter.get("/users/:id", bearAuth_1.userRoleAuth, users_controller_1.oneUserController);
//add user
exports.userRouter.post("users", (0, zod_validator_1.zValidator)('json', validator_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), users_controller_1.addUserController);
//update a user
exports.userRouter.put("/users/:id", users_controller_1.updateUserController);
exports.userRouter.delete("/users/:id", users_controller_1.deleteUserController);
exports.default = exports.userRouter;
