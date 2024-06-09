import { pgTable, text, varchar, serial, boolean, real, date, primaryKey, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { datetime } from 'drizzle-orm/mysql-core';



// Tables

// menu_item table

export const menu_itemTable = pgTable("menu_item", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
    category_id: integer("category_id").notNull().references(() => categoryTable.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    ingredients: text("ingredients").notNull(),
    price: real("price").notNull(),
    active: boolean("active").notNull(),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
    

})

//Category table

export const categoryTable: any = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
     
})

//Restaurant table

export const restaurantTable = pgTable("restaurant", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    address: varchar("street_address", { length: 255 }).notNull(),
    zip: varchar("zip_code", { length: 255 }).notNull(),
    cityId: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }),
    created_at: date("createdAt").notNull(),
    updated_at: date("updatedAt").notNull(),
    
})


//City table

export const cityTable = pgTable("city", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    stateId: integer("state_id").notNull().references(() => stateTable.id, { onDelete: "cascade" }),
   
})


//State table

export const stateTable = pgTable("states", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 255 }).notNull(),
    
})


//Address table

export const addressTable = pgTable("address", {
    id: serial("id").primaryKey(),
    streetAddress1: varchar("street_address_1", { length: 255 }).notNull(),
    streetAddress2: varchar("street_address_2", { length: 255 }).notNull(),
    zipCode: varchar("zip_code", { length: 255 }).notNull(),
    deliveryInstructions: text("delivery_instructions").notNull(),
    userId: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    cityId: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull()
    
})


//Order menu item table

export const order_menu_itemTable: any = pgTable("order_menu_item", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(() => orderTable.id, { onDelete: "cascade" }),
    menu_item_id: integer("menu_item_id").notNull().references(() => menu_itemTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    itemPrice: real("item_price").notNull(),
    price: real("price").notNull(),
    comment: text("comment").notNull(),
    
})

//Orders table

export const orderTable: any = pgTable("orders", {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
    estimatedDeliveryTime: date("estimated_delivery_time").notNull(),
    actualDeliveryTime: date("actual_delivery_time"),
    deliveryAddressId: integer("delivery_address_id").notNull().references(() => addressTable.id, { onDelete: "cascade" }),
    userId: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    driverId: integer("driver_id").references(() => driverTable.id, { onDelete: "cascade" }),
    price: real("price").notNull(),
    discount: real("discount").notNull(),
    finalPrice: real("final_price").notNull(),
    comment: text("comment"),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
    
})

//Order status table

export const orderStatusTable = pgTable("order_status", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull().references(() => orderTable.id, { onDelete: "cascade" }),
    statusCatalogId: integer("status_catalog_id").notNull().references(() => statusCatalogTable.id, { onDelete: "cascade" }),
    createdAt: date("created_at").notNull(),
    
})

//Status catalog table

export const statusCatalogTable = pgTable("status_catalog", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    
})

//restaurant owner table

export const restaurantOwnerTable = pgTable("restaurant_owner", {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
    ownerId: integer("owner_id").notNull()
    
})

//User table

export const userTable = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
    
})

//Driver table

export const driverTable = pgTable("driver", {
    id: serial("id").primaryKey(),
    carMake: varchar("car_make", { length: 255 }).notNull(),
    carModel: varchar("car_model", { length: 255 }).notNull(),
    carYear: varchar("car_year", { length: 255 }).notNull(),
    userId: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    online: boolean("online").notNull(),
    delivering: boolean("delivering").notNull(),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
    
})

//Comment table

export const CommentTable = pgTable("comment", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull().references(() => orderTable.id, { onDelete: "cascade" }),
    userId: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    commentText: text("comment_text").notNull(),
    isComplaint: boolean("is_complaint").notNull(),
    isPraise: boolean("is_praise").notNull(),
    createdAt: date("created_at").notNull(),
    updatedAt: date("updated_at").notNull(),
    
})

//Relationships
// menu item table relations

export const menuItemTableRelation = relations(menu_itemTable, ({ one }) => ({
    restaurant: one(restaurantTable, {
        fields: [menu_itemTable.restaurant_id],
        references: [restaurantTable.id],
    }),
    category: one(categoryTable, {
        fields: [menu_itemTable.category_id],
        references: [categoryTable.id],
    }),
}));
// category table relations

export const categoryTableRelation = relations(categoryTable, ({ one }) => ({
    menu_item: one(menu_itemTable, {
        fields: [categoryTable.id],
        references: [menu_itemTable.category_id],
    }),
}));
//restaurant table relation

export const restaurantTableRelation = relations(restaurantTable, ({ one, many }) => ({
    address: one(addressTable, {
        fields: [restaurantTable.address],
        references: [addressTable.id],
    })
}));
//city table relation

export const cityTableRelation = relations(cityTable, ({one}) => ({
    restaurant: one(restaurantTable, {
        fields: [cityTable.id],
        references: [restaurantTable.cityId]
    }),
    address: one(addressTable, {
        fields: [cityTable.id],
        references: [addressTable.cityId]
    })
}));
//state table relation

export const stateTableRelation = relations(stateTable, ({one}) => ({
    city: one(cityTable, {
        fields: [stateTable.id],
        references: [cityTable.stateId]
    })
}));

//address table relation

export const addressTableRelation = relations(addressTable, ({ one }) => ({
    order: one(orderTable, {
        fields: [addressTable.id],
        references: [orderTable.deliveryAddressId],
    })

}));
// order menu item table relation
// order table relation

export const orderTableRelation = relations(orderTable, ({ one }) => ({
    order: one(order_menu_itemTable, {
        fields: [orderTable.id],
        references: [order_menu_itemTable.order_id],
    }),
    status: one(orderStatusTable, {
        fields: [orderTable.id],
        references: [orderStatusTable.orderId]

    }),
    comments: one(CommentTable, {
        fields: [orderTable.id],
        references: [CommentTable.orderId]
    
    })

}));

//status catalog relation

export const statusCatalogTableRelation = relations(statusCatalogTable, ({ one }) => ({
    status: one(orderStatusTable, {
        fields: [statusCatalogTable.id],
        references: [orderStatusTable.statusCatalogId]
    })
}));
// restaurant owner relation
// user table relation
export const userTableRelation = relations(userTable, ({ one }) => ({
    address: one(addressTable, {
        fields: [userTable.id],
        references: [addressTable.userId]
    }),
    order: one(orderTable, {
        fields: [userTable.id],
        references: [orderTable.userId]
    }),
    comment: one(CommentTable, {
        fields: [userTable.id],
        references: [CommentTable.userId]
    }),
    driver: one(driverTable, {
        fields: [userTable.id],
        references: [driverTable.userId]
    }),
    owner: one(restaurantOwnerTable, {
        fields: [userTable.id],
        references: [restaurantOwnerTable.ownerId]
    })
}));
// driver table relation

export const driverTableRelation = relations(driverTable, ({ one }) => ({
    order: one(orderTable, {
        fields: [driverTable.id],
        references: [orderTable.driverId]
    })
}));






export type MenuItemselect = typeof menu_itemTable.$inferSelect;
export type MenuItemInsert = typeof menu_itemTable.$inferInsert;

export type restaurantselect = typeof restaurantTable.$inferSelect;
export type restaurantInsert = typeof restaurantTable.$inferInsert;

export type cityselect = typeof cityTable.$inferSelect;
export type cityInsert = typeof cityTable.$inferInsert;

export type orderselect = typeof orderTable.$inferSelect;
export type orderInsert = typeof orderTable.$inferInsert;

export type categoryselect = typeof categoryTable.$inferSelect;
export type categoryInsert = typeof categoryTable.$inferInsert;

export type stateselect = typeof stateTable.$inferSelect;
export type stateInsert = typeof stateTable.$inferInsert;

export type addressselect = typeof addressTable.$inferSelect;
export type addressInsert = typeof addressTable.$inferInsert;

export type statusCatalogselect = typeof statusCatalogTable.$inferSelect;
export type statusCatalogInsert = typeof statusCatalogTable.$inferInsert;

export type userselect = typeof userTable.$inferSelect;
export type userInsert = typeof userTable.$inferInsert;

export type driverselect = typeof driverTable.$inferSelect;
export type driverInsert = typeof driverTable.$inferInsert;

export type commentselect = typeof CommentTable.$inferSelect;
export type commentInsert = typeof CommentTable.$inferInsert;

export type orderMenuItemselect = typeof order_menu_itemTable.$inferSelect;
export type orderMenuItemInsert = typeof order_menu_itemTable.$inferInsert;

export type orderStatusSelect = typeof orderStatusTable.$inferSelect;
export type orderStatusInsert = typeof orderStatusTable.$inferInsert;

export type restaurantOwnerselect = typeof restaurantOwnerTable.$inferSelect;
export type restaurantOwnerInsert = typeof restaurantOwnerTable.$inferInsert;