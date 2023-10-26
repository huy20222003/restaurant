//router
import authRouter from './authRouter.mjs';
import productsRouter from './productsRouter.mjs';
import categorysRouter from './categorysRouter.mjs';
import cartRouter from './cartRouter.mjs';
import employeesRouter from './employeesRouter.mjs';
import adminAuthRouter from './adminAuthRouter.mjs';
import userRouter from './usersRouter.mjs';
import ordersRouter from './ordersRouter.mjs';
import roleRouter from './roleRouter.mjs';
import paymentRouter from './paymentRouter.mjs';

//------------------------------------------------------------


function routes(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/auth/admin', adminAuthRouter);
  app.use('/api/v1/products', productsRouter);
  app.use('/api/v1/category', categorysRouter);
  app.use('/api/v1/cart', cartRouter);
  app.use('/api/v1/employee', employeesRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/order', ordersRouter);
  app.use('/api/v1/role', roleRouter);
  app.use('/api/v1/payment', paymentRouter);
}

export default routes;
