//router
import authRouter from './authRouter.mjs';
import productsRouter from './productsRouter.mjs';
import categorysRouter from './categorysRouter.mjs';
import cartRouter from './cartRouter.mjs';
import employeesRouter from './employeesRouter.mjs';
import adminAuthRouter from './adminAuthRouter.mjs';
import userRouter from './usersRouter.mjs';
import ordersRouter from './ordersRouter.mjs';


//------------------------------------------------------------


function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/auth/admin', adminAuthRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/category', categorysRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/employee', employeesRouter);
  app.use('/api/user', userRouter);
  app.use('/api/order', ordersRouter);
}

export default routes;
