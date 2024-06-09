"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverTableRelation = exports.userTableRelation = exports.statusCatalogTableRelation = exports.orderTableRelation = exports.addressTableRelation = exports.stateTableRelation = exports.cityTableRelation = exports.restaurantTableRelation = exports.categoryTableRelation = exports.menuItemTableRelation = exports.CommentTable = exports.driverTable = exports.userTable = exports.restaurantOwnerTable = exports.statusCatalogTable = exports.orderStatusTable = exports.orderTable = exports.order_menu_itemTable = exports.addressTable = exports.stateTable = exports.cityTable = exports.restaurantTable = exports.categoryTable = exports.menu_itemTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Tables
// menu_item table
exports.menu_itemTable = (0, pg_core_1.pgTable)("menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").notNull().references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    category_id: (0, pg_core_1.integer)("category_id").notNull().references(() => exports.categoryTable.id, { onDelete: "cascade" }),
    description: (0, pg_core_1.text)("description").notNull(),
    ingredients: (0, pg_core_1.text)("ingredients").notNull(),
    price: (0, pg_core_1.real)("price").notNull(),
    active: (0, pg_core_1.boolean)("active").notNull(),
    createdAt: (0, pg_core_1.date)("created_at").notNull(),
    updatedAt: (0, pg_core_1.date)("updated_at").notNull(),
});
//Category table
exports.categoryTable = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
});
//Restaurant table
exports.restaurantTable = (0, pg_core_1.pgTable)("restaurant", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    address: (0, pg_core_1.varchar)("street_address", { length: 255 }).notNull(),
    zip: (0, pg_core_1.varchar)("zip_code", { length: 255 }).notNull(),
    cityId: (0, pg_core_1.integer)("city_id").notNull().references(() => exports.cityTable.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.date)("createdAt").notNull(),
    updated_at: (0, pg_core_1.date)("updatedAt").notNull(),
});
//City table
exports.cityTable = (0, pg_core_1.pgTable)("city", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    stateId: (0, pg_core_1.integer)("state_id").notNull().references(() => exports.stateTable.id, { onDelete: "cascade" }),
});
//State table
exports.stateTable = (0, pg_core_1.pgTable)("states", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    code: (0, pg_core_1.varchar)("code", { length: 255 }).notNull(),
});
//Address table
exports.addressTable = (0, pg_core_1.pgTable)("address", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    streetAddress1: (0, pg_core_1.varchar)("street_address_1", { length: 255 }).notNull(),
    streetAddress2: (0, pg_core_1.varchar)("street_address_2", { length: 255 }).notNull(),
    zipCode: (0, pg_core_1.varchar)("zip_code", { length: 255 }).notNull(),
    deliveryInstructions: (0, pg_core_1.text)("delivery_instructions").notNull(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    cityId: (0, pg_core_1.integer)("city_id").notNull().references(() => exports.cityTable.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.date)("created_at").notNull(),
    updatedAt: (0, pg_core_1.date)("updated_at").notNull()
});
//Order menu item table
exports.order_menu_itemTable = (0, pg_core_1.pgTable)("order_menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").notNull().references(() => exports.orderTable.id, { onDelete: "cascade" }),
    menu_item_id: (0, pg_core_1.integer)("menu_item_id").notNull().references(() => exports.menu_itemTable.id, { onDelete: "cascade" }),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    itemPrice: (0, pg_core_1.real)("item_price").notNull(),
    price: (0, pg_core_1.real)("price").notNull(),
    comment: (0, pg_core_1.text)("comment").notNull(),
});
//Orders table
exports.orderTable = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurantId: (0, pg_core_1.integer)("restaurant_id").notNull().references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    estimatedDeliveryTime: (0, pg_core_1.date)("estimated_delivery_time").notNull(),
    actualDeliveryTime: (0, pg_core_1.date)("actual_delivery_time"),
    deliveryAddressId: (0, pg_core_1.integer)("delivery_address_id").notNull().references(() => exports.addressTable.id, { onDelete: "cascade" }),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    driverId: (0, pg_core_1.integer)("driver_id").references(() => exports.driverTable.id, { onDelete: "cascade" }),
    price: (0, pg_core_1.real)("price").notNull(),
    discount: (0, pg_core_1.real)("discount").notNull(),
    finalPrice: (0, pg_core_1.real)("final_price").notNull(),
    comment: (0, pg_core_1.text)("comment"),
    createdAt: (0, pg_core_1.date)("created_at").notNull(),
    updatedAt: (0, pg_core_1.date)("updated_at").notNull(),
});
//Order status table
exports.orderStatusTable = (0, pg_core_1.pgTable)("order_status", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    orderId: (0, pg_core_1.integer)("order_id").notNull().references(() => exports.orderTable.id, { onDelete: "cascade" }),
    statusCatalogId: (0, pg_core_1.integer)("status_catalog_id").notNull().references(() => exports.statusCatalogTable.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.date)("created_at").notNull(),
});
//Status catalog table
exports.statusCatalogTable = (0, pg_core_1.pgTable)("status_catalog", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
});
//restaurant owner table
exports.restaurantOwnerTable = (0, pg_core_1.pgTable)("restaurant_owner", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurantId: (0, pg_core_1.integer)("restaurant_id").notNull().references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    ownerId: (0, pg_core_1.integer)("owner_id").notNull()
});
//User table
exports.userTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 255 }).notNull(),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 255 }).notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.date)("created_at").notNull(),
    updatedAt: (0, pg_core_1.date)("updated_at").notNull(),
});
//Driver table
exports.driverTable = (0, pg_core_1.pgTable)("driver", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    carMake: (0, pg_core_1.varchar)("car_make", { length: 255 }).notNull(),
    carModel: (0, pg_core_1.varchar)("car_model", { length: 255 }).notNull(),
    carYear: (0, pg_core_1.varchar)("car_year", { length: 255 }).notNull(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    online: (0, pg_core_1.boolean)("online").notNull(),
    delivering: (0, pg_core_1.boolean)("delivering").notNull(),
    createdAt: (0, pg_core_1.date)("created_at").notNull(),
    updatedAt: (0, pg_core_1.date)("updated_at").notNull(),
});
//Comment table
exports.CommentTable = (0, pg_core_1.pgTable)("comment", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    orderId: (0, pg_core_1.integer)("order_id").notNull().references(() => exports.orderTable.id, { onDelete: "cascade" }),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    commentText: (0, pg_core_1.text)("comment_text").notNull(),
    isComplaint: (0, pg_core_1.boolean)("is_complaint").notNull(),
    isPraise: (0, pg_core_1.boolean)("is_praise").notNull(),
    createdAt: (0, pg_core_1.date)("created_at").notNull(),
    updatedAt: (0, pg_core_1.date)("updated_at").notNull(),
});
//Relationships
// menu item table relations
exports.menuItemTableRelation = (0, drizzle_orm_1.relations)(exports.menu_itemTable, ({ one }) => ({
    restaurant: one(exports.restaurantTable, {
        fields: [exports.menu_itemTable.restaurant_id],
        references: [exports.restaurantTable.id],
    }),
    category: one(exports.categoryTable, {
        fields: [exports.menu_itemTable.category_id],
        references: [exports.categoryTable.id],
    }),
}));
// category table relations
exports.categoryTableRelation = (0, drizzle_orm_1.relations)(exports.categoryTable, ({ one }) => ({
    menu_item: one(exports.menu_itemTable, {
        fields: [exports.categoryTable.id],
        references: [exports.menu_itemTable.category_id],
    }),
}));
//restaurant table relation
exports.restaurantTableRelation = (0, drizzle_orm_1.relations)(exports.restaurantTable, ({ one, many }) => ({
    address: one(exports.addressTable, {
        fields: [exports.restaurantTable.address],
        references: [exports.addressTable.id],
    })
}));
//city table relation
exports.cityTableRelation = (0, drizzle_orm_1.relations)(exports.cityTable, ({ one }) => ({
    restaurant: one(exports.restaurantTable, {
        fields: [exports.cityTable.id],
        references: [exports.restaurantTable.cityId]
    }),
    address: one(exports.addressTable, {
        fields: [exports.cityTable.id],
        references: [exports.addressTable.cityId]
    })
}));
//state table relation
exports.stateTableRelation = (0, drizzle_orm_1.relations)(exports.stateTable, ({ one }) => ({
    city: one(exports.cityTable, {
        fields: [exports.stateTable.id],
        references: [exports.cityTable.stateId]
    })
}));
//address table relation
exports.addressTableRelation = (0, drizzle_orm_1.relations)(exports.addressTable, ({ one }) => ({
    order: one(exports.orderTable, {
        fields: [exports.addressTable.id],
        references: [exports.orderTable.deliveryAddressId],
    })
}));
// order menu item table relation
// order table relation
exports.orderTableRelation = (0, drizzle_orm_1.relations)(exports.orderTable, ({ one }) => ({
    order: one(exports.order_menu_itemTable, {
        fields: [exports.orderTable.id],
        references: [exports.order_menu_itemTable.order_id],
    }),
    status: one(exports.orderStatusTable, {
        fields: [exports.orderTable.id],
        references: [exports.orderStatusTable.orderId]
    }),
    comments: one(exports.CommentTable, {
        fields: [exports.orderTable.id],
        references: [exports.CommentTable.orderId]
    })
}));
//status catalog relation
exports.statusCatalogTableRelation = (0, drizzle_orm_1.relations)(exports.statusCatalogTable, ({ one }) => ({
    status: one(exports.orderStatusTable, {
        fields: [exports.statusCatalogTable.id],
        references: [exports.orderStatusTable.statusCatalogId]
    })
}));
// restaurant owner relation
// user table relation
exports.userTableRelation = (0, drizzle_orm_1.relations)(exports.userTable, ({ one }) => ({
    address: one(exports.addressTable, {
        fields: [exports.userTable.id],
        references: [exports.addressTable.userId]
    }),
    order: one(exports.orderTable, {
        fields: [exports.userTable.id],
        references: [exports.orderTable.userId]
    }),
    comment: one(exports.CommentTable, {
        fields: [exports.userTable.id],
        references: [exports.CommentTable.userId]
    }),
    driver: one(exports.driverTable, {
        fields: [exports.userTable.id],
        references: [exports.driverTable.userId]
    }),
    owner: one(exports.restaurantOwnerTable, {
        fields: [exports.userTable.id],
        references: [exports.restaurantOwnerTable.ownerId]
    })
}));
// driver table relation
exports.driverTableRelation = (0, drizzle_orm_1.relations)(exports.driverTable, ({ one }) => ({
    order: one(exports.orderTable, {
        fields: [exports.driverTable.id],
        references: [exports.orderTable.driverId]
    })
}));
