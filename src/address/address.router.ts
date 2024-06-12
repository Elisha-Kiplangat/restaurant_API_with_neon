import {Hono} from 'hono'
import {addressController, oneAddressController, addAddressController, updateAddressController, deleteAddressController} from './address.controller'
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const addressRouter = new Hono();

addressRouter.get('addresses', adminRoleAuth, addressController);

//one user
addressRouter.get("/addresses/:id", userRoleAuth, oneAddressController)

//add user

addressRouter.post("addresses", userRoleAuth, zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addAddressController)

//update a user
addressRouter.put("/users/:id", updateAddressController)

addressRouter.delete("/users/:id", adminRoleAuth, deleteAddressController)


export default addressRouter;