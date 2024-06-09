"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusSchema = exports.restaurantOwnerSchema = exports.driverSchema = exports.statusCatalogSchema = exports.orderMenuItemSchema = exports.citySchema = exports.categorySchema = exports.menuItemSchema = exports.orderSchema = exports.restaurantSchema = exports.addressSchema = exports.commentSchema = exports.stateSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    phone: zod_1.z.string(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
});
exports.stateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    code: zod_1.z.string()
});
exports.commentSchema = zod_1.z.object({
    orderId: zod_1.z.number(),
    userId: zod_1.z.number(),
    commentText: zod_1.z.string(),
    isComplaint: zod_1.z.boolean(),
    isPraise: zod_1.z.boolean(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
});
exports.addressSchema = zod_1.z.object({
    streetAddress1: zod_1.z.string(),
    streetAddress2: zod_1.z.string(),
    zipCode: zod_1.z.number(),
    deliveryInstructions: zod_1.z.string(),
    userId: zod_1.z.number(),
    cityId: zod_1.z.number(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
});
exports.restaurantSchema = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    zip: zod_1.z.number(),
    cityId: zod_1.z.number(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
});
exports.orderSchema = zod_1.z.object({
    restaurantId: zod_1.z.number(),
    estimatedDeliveryTime: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for delivery date',
    }).transform((val) => new Date(val)),
    actualDeliveryTime: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for actual delivery date',
    }).transform((val) => new Date(val)),
    deliveryAddressId: zod_1.z.number(),
    userId: zod_1.z.number(),
    driverId: zod_1.z.number(),
    price: zod_1.z.number(),
    discount: zod_1.z.number(),
    finalPrice: zod_1.z.number(),
    comment: zod_1.z.string(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
});
exports.menuItemSchema = zod_1.z.object({
    name: zod_1.z.string(),
    restaurant_id: zod_1.z.number(),
    category_id: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    price: zod_1.z.number(),
    active: zod_1.z.boolean(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
});
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string()
});
exports.citySchema = zod_1.z.object({
    name: zod_1.z.string(),
    stateId: zod_1.z.number()
});
exports.orderMenuItemSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    menu_item_id: zod_1.z.number(),
    quantity: zod_1.z.number(),
    itemPrice: zod_1.z.number(),
    price: zod_1.z.number(),
    comment: zod_1.z.string()
});
exports.statusCatalogSchema = zod_1.z.object({
    name: zod_1.z.string()
});
exports.driverSchema = zod_1.z.object({
    carMake: zod_1.z.string(),
    carModel: zod_1.z.string(),
    carYear: zod_1.z.number(),
    userId: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
});
exports.restaurantOwnerSchema = zod_1.z.object({
    restaurantId: zod_1.z.number(),
    ownerId: zod_1.z.number()
});
exports.orderStatusSchema = zod_1.z.object({
    orderId: zod_1.z.number(),
    statusCatalogId: zod_1.z.number(),
    createdAt: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val))
});
