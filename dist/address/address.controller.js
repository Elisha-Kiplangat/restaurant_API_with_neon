"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = exports.updateAddressController = exports.addAddressController = exports.oneAddressController = exports.addressController = void 0;
const address_service_1 = require("./address.service");
const addressController = async (c) => {
    try {
        const address = await (0, address_service_1.addressService)();
        return c.json(address);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};
exports.addressController = addressController;
// one user
const oneAddressController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const address = await (0, address_service_1.oneAddressService)(id);
    if (address == undefined) {
        return c.text("Address not found", 404);
    }
    return c.json(address, 200);
};
exports.oneAddressController = oneAddressController;
//add user
const addAddressController = async (c) => {
    try {
        const address = await c.req.json();
        const createdUser = await (0, address_service_1.addAddressService)(address);
        if (!createdUser)
            return c.text("Address not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.addAddressController = addAddressController;
const updateAddressController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searchedAddress = await (0, address_service_1.oneAddressService)(id);
        if (searchedAddress == undefined)
            return c.text("Address not found", 404);
        // get the data and update it
        const res = await (0, address_service_1.updateAddressService)(id, user);
        // return a success message
        if (!res)
            return c.text("Address not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateAddressController = updateAddressController;
const deleteAddressController = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const address = await (0, address_service_1.oneAddressService)(id);
        if (address == undefined)
            return c.text("Address not found", 404);
        //deleting the user
        const res = await (0, address_service_1.deleteAddressService)(id);
        if (!res)
            return c.text("Address not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteAddressController = deleteAddressController;
