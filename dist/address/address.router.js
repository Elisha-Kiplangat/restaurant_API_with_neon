"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const hono_1 = require("hono");
const address_controller_1 = require("./address.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const bearAuth_1 = require("../middleware/bearAuth");
exports.addressRouter = new hono_1.Hono();
exports.addressRouter.get('addresses', bearAuth_1.adminRoleAuth, address_controller_1.addressController);
//one user
exports.addressRouter.get("/addresses/:id", bearAuth_1.allRoleAuth, address_controller_1.oneAddressController);
//add user
exports.addressRouter.post("addresses", bearAuth_1.allRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), address_controller_1.addAddressController);
//update a user
exports.addressRouter.put("/users/:id", bearAuth_1.allRoleAuth, address_controller_1.updateAddressController);
exports.addressRouter.delete("/users/:id", bearAuth_1.adminRoleAuth, address_controller_1.deleteAddressController);
exports.default = exports.addressRouter;
