import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import { restaurantRouter } from './restaurant/restaurant.router'
import { userRouter } from './users/users.router'
import { ordersRouter } from './orders/orders.router'
import { stateRouter } from './state/state.router'
import { menuItemRouter } from './menuItem/menuItem.router'
import { categoryRouter } from './category/category.router'
import { commentRouter } from './comments/comments.router'
import { addressRouter } from './address/address.router'
import { cityRouter } from './city/city.router'
import { orderMenuItemRouter } from './orderMenuItem/orderMenuItem.router'
import { statusCatalogRouter } from './statusCatalog/statusCatalog.router'
import { driverRouter } from './driver/driver.router'
import { restaurantOwnerRouter } from './restaurantOwner/restaurantOwner.router'
import { orderStatusRouter } from './orderStatus/orderStatus.router'
import { authRouter } from './auth/auth.router'

const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

app.route('/', restaurantRouter)

app.route('/', userRouter)

app.route('/', authRouter)

app.route('/', ordersRouter)

app.route('/', stateRouter)

app.route('/', menuItemRouter)

app.route('/', categoryRouter)

app.route('/', commentRouter)

app.route('/', addressRouter)

app.route('/', cityRouter)

app.route('/', orderMenuItemRouter)

app.route('/', statusCatalogRouter)

app.route('/', driverRouter)

app.route('/', restaurantOwnerRouter)

app.route('/', orderStatusRouter)


app.get('/', (c) => {
    // Send the HTML content as response
    return c.html(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restaurant Data</title>
            <style>
                /* Basic styling */
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                h1{
                  aliign: center;
                }
                .link {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 16px;
                }
                .link:hover {
                    color: blue; /* Change color on hover */
                }
            </style>
        </head>
        <body>
            <h1>Restaurant Data</h1>
            <ul> 
                <li><a class="link" href="/users">View Users</a></li>
                <li><a class="link" href="/register">Register </a></li>
                <li><a class="link" href="/restaurants">View Restaurants</a></li>

                <li><a class="link" href="/states">View states</a></li>
                <li><a class="link" href="/orders">View orders</a></li>
                <li><a class="link" href="/menu-items">View menu-items</a></li>
                <li><a class="link" href="/order-menu-items">View order-mannu-items</a></li>
                <li><a class="link" href="/catalogs">View catalogs</a></li>
               

                <!-- Add more links for other tables as needed -->
            </ul>
        </body>
        </html>
    `);
});

serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || '3000')
})

console.log(`Server is running on port ${process.env.PORT}`)