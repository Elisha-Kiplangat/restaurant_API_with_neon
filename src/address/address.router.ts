import {Hono} from 'hono'
import {addressController, oneAddressController, addAddressController, updateAddressController, deleteAddressController} from './address.controller'
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validator";

export const addressRouter = new Hono();

addressRouter.get('addresses', addressController);

//one user
addressRouter.get("/addresses/:id", oneAddressController)

//add user

addressRouter.post("addresses", zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), addAddressController)




//update a user
addressRouter.put("/users/:id", updateAddressController)

addressRouter.delete("/users/:id", deleteAddressController)


export default addressRouter;