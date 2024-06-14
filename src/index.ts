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
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8f9fa;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 2.5rem;
            color: #343a40;
        }

        ul {
            list-style-type: none;
            padding: 0;
            max-width: 300px;
            margin: auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        .link {
            display: block;
            margin-bottom: 10px;
            font-size: 18px;
            text-decoration: none;
            color: #007bff;
            transition: color 0.3s ease, background-color 0.3s ease;
            padding: 10px;
            border-radius: 5px;
        }

        .link:hover {
            color: #fff;
            background-color: #007bff;
        }
    </style>
</head>
<body>

    <div>
        <h1>Restaurant Data API by Elisha</h1>
        <ul>
            
            <li><a class="link" href="/register">Register</a></li>
            <li><a class="link" href="/login">Login</a></li>
            <li><a class="link" href="/users">View Users</a></li>
            <li><a class="link" href="/restaurants">View Restaurants</a></li>
            <li><a class="link" href="/states">View States</a></li>
            <li><a class="link" href="/orders">View Orders</a></li>
            <li><a class="link" href="/menu-items">View Menu Items</a></li>
            <li><a class="link" href="/order-menu-items">View Order Menu Items</a></li>
            <li><a class="link" href="/catalogs">View Catalogs</a></li>
        </ul>
    </div>
</body>
</html>

    `);
});

serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || '3000')
})

console.log(`Server is running on port ${process.env.PORT}`)