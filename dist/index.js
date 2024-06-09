"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const restaurant_router_1 = require("./restaurant/restaurant.router");
const users_router_1 = require("./users/users.router");
const orders_router_1 = require("./orders/orders.router");
const state_router_1 = require("./state/state.router");
const menuItem_router_1 = require("./menuItem/menuItem.router");
const category_router_1 = require("./category/category.router");
const comments_router_1 = require("./comments/comments.router");
const address_router_1 = require("./address/address.router");
const city_router_1 = require("./city/city.router");
const orderMenuItem_router_1 = require("./orderMenuItem/orderMenuItem.router");
const statusCatalog_router_1 = require("./statusCatalog/statusCatalog.router");
const driver_router_1 = require("./driver/driver.router");
const restaurantOwner_router_1 = require("./restaurantOwner/restaurantOwner.router");
const orderStatus_router_1 = require("./orderStatus/orderStatus.router");
const app = new hono_1.Hono();
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.route('/', restaurant_router_1.restaurantRouter);
app.route('/', users_router_1.userRouter);
app.route('/', orders_router_1.ordersRouter);
app.route('/', state_router_1.stateRouter);
app.route('/', menuItem_router_1.menuItemRouter);
app.route('/', category_router_1.categoryRouter);
app.route('/', comments_router_1.commentRouter);
app.route('/', address_router_1.addressRouter);
app.route('/', city_router_1.cityRouter);
app.route('/', orderMenuItem_router_1.orderMenuItemRouter);
app.route('/', statusCatalog_router_1.statusCatalogRouter);
app.route('/', driver_router_1.driverRouter);
app.route('/', restaurantOwner_router_1.restaurantOwnerRouter);
app.route('/', orderStatus_router_1.orderStatusRouter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: parseInt(process.env.PORT || '3000')
});
console.log(`Server is running on port ${process.env.PORT}`);
