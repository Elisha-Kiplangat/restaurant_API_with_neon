
import { create } from 'domain'
import { number, z } from 'zod'


export const userSchema = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
})

export const stateSchema = z.object({
    name: z.string(),
    code: z.string()
})



export const commentSchema = z.object({
    orderId: z.number(),
    userId: z.number(),
    commentText: z.string(),
    isComplaint: z.boolean(),
    isPraise: z.boolean(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
})

export const addressSchema = z.object({
    streetAddress1: z.string(),
    streetAddress2: z.string(),
    zipCode: z.number(),
    deliveryInstructions: z.string(),
    userId: z.number(),
    cityId: z.number(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
})

export const restaurantSchema = z.object({
    name: z.string(),
    address: z.string(),
    zip: z.number(),
    cityId: z.number(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
})

export const orderSchema = z.object({
    restaurantId: z.number(),
    estimatedDeliveryTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for delivery date',
    }).transform((val) => new Date(val)),
    actualDeliveryTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for actual delivery date',
    }).transform((val) => new Date(val)),
    deliveryAddressId: z.number(),
    userId: z.number(),
    driverId: z.number(),
    price: z.number(),
    discount: z.number(),
    finalPrice: z.number(),
    comment: z.string(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
})

export const menuItemSchema = z.object({
    name: z.string(),
    restaurant_id: z.number(),
    category_id: z.number(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    active: z.boolean(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
})

export const categorySchema = z.object({
    name: z.string()
})

export const citySchema = z.object({
    name: z.string(),
    stateId: z.number()
})

export const orderMenuItemSchema = z.object({
    order_id: z.number(),
    menu_item_id: z.number(),
    quantity: z.number(),
    itemPrice: z.number(),
    price: z.number(),
    comment: z.string()
})

export const statusCatalogSchema = z.object({
    name: z.string()
})

export const driverSchema = z.object({
    carMake: z.string(),
    carModel: z.string(),
    carYear: z.number(),
    userId: z.number(),
    online: z.boolean(),
    delivering: z.boolean(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val))
})

export const restaurantOwnerSchema = z.object({
    restaurantId: z.number(),
    ownerId: z.number()
})

export const orderStatusSchema = z.object({
    orderId: z.number(),
    statusCatalogId: z.number(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val))
})

//login schema
export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

//register schema
export const registerSchema = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for createdAt',
    }).transform((val) => new Date(val)),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updatedAt',
    }).transform((val) => new Date(val)),
    role: z.string().optional()
})