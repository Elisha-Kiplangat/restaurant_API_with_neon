"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const hono_1 = require("hono");
const category_controller_1 = require("./category.controller");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
exports.categoryRouter = new hono_1.Hono();
exports.categoryRouter.get('categories', category_controller_1.categoryController);
exports.categoryRouter.get("/categories/:id", category_controller_1.oneCategoryController);
exports.categoryRouter.post("categories", (0, zod_validator_1.zValidator)('json', validator_1.categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), category_controller_1.addCategory);
exports.categoryRouter.put("/categories/:id", category_controller_1.updateCategoryController);
exports.categoryRouter.delete("/categories/:id", category_controller_1.deleteCategoryController);
exports.default = exports.categoryRouter;
