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

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

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


serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || '3000')
})

console.log(`Server is running on port ${process.env.PORT}`)