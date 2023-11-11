import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import HomeLayout from '../layouts/home';
//user page
const HomePage = lazy(() => import('../Pages/User/HomePage'));
const LoginPage = lazy(() => import('../Pages/User/Auth/Login'));
const RegisterPage = lazy(() => import('../Pages/User/Auth/Register'));
const Page404 = lazy(() => import('../Pages/Page404'));
const ProductsPage = lazy(() =>
  import('../Pages/User/ProductsPage/ProductsPage')
);
const ProductPageDetail = lazy(() =>
  import('../Pages/User/ProductsPage/ProductPageDetail')
);
const DashboardAppPage = lazy(() => import('../Pages/User/DashboardAppPage'));
const CartPage = lazy(() => import('../Pages/User/CartPages'));
const OrderPage = lazy(() => import('../Pages/User/OrderPage/OrderPage'));
const OrderPageDetail = lazy(() =>
  import('../Pages/User/OrderPage/OrderPageDetail')
);
const PaymentStatus = lazy(() =>
  import('../Pages/User/OrderPage/PaymentStatus')
);
const Reservation = lazy(() =>
  import('../Pages/User/Reservation/Reservation')
);
const ReservationList = lazy(() =>
  import('../Pages/User/Reservation/ReservationList')
);
const ProfilePage = lazy(() => import('../Pages/User/ProfilePage'));
const FAQPage = lazy(() => import('../Pages/User/FAQPage'));
const AboutPage = lazy(() => import('../Pages/User/AboutPage'));
const SettingPage = lazy(() => import('../Pages/User/SettingPage'));
//Admin Page
const AdminLogin = lazy(() => import('../Pages/Admin/Auth/AdminLogin'));
const AdminDashboard = lazy(() => import('../Pages/Admin/AdminDashboard'));
const DashboardLayoutAdmin = lazy(() =>
  import('../layouts/admin/DashboardLayoutAdmin')
);
const CategoryManage = lazy(() =>
  import('../Pages/Admin/CategoryManage/CategoryManage')
);
const CategoryDetail = lazy(() =>
  import('../Pages/Admin/CategoryManage/CategoryDetail')
);
const CustomerManage = lazy(() =>
  import('../Pages/Admin/CustomerManage/CustomerManage')
);
const CustomerDetail = lazy(() =>
  import('../Pages/Admin/CustomerManage/CustomerDetail')
);
const ProductManage = lazy(() =>
  import('../Pages/Admin/ProductManage/ProductManage')
);
const ProductForm = lazy(() =>
  import('../Pages/Admin/ProductManage/ProductForm')
);
const EmployeeManage = lazy(() =>
  import('../Pages/Admin/EmployeeManage/EmployeeManage')
);
const EmployeeDetail = lazy(() =>
  import('../Pages/Admin/EmployeeManage/EmployeeDetail')
);
const OrderManage = lazy(() =>
  import('../Pages/Admin/OrderManage/OrderManage')
);
const OrderDetail = lazy(() =>
  import('../Pages/Admin/OrderManage/OrderDetail')
);
const PaymentManage = lazy(() => import('../Pages/Admin/PaymentManage/PaymentManage'));
const ReservationManage = lazy(() => import('../Pages/Admin/ReservationManage/ReservationManage'));
const ProfileAdminPage = lazy(() => import('../Pages/Admin/Profile'));
const SettingAdminPage = lazy(() => import('../Pages/Admin/Setting'));
//loader
import Loader from '../Components/Loader';
//private router
import PrivateRouter from './PrivateRouter';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/faq', element: <FAQPage /> },
        { path: '/about', element: <AboutPage /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:_id', element: <ProductPageDetail /> },
        {
          path: 'cart',
          element: (
            <PrivateRouter element={<CartPage />} redirectTo="/auth/login" />
          ),
        },
        {
          path: 'order',
          element: (
            <PrivateRouter element={<OrderPage />} redirectTo="/auth/login" />
          ),
        },
        {
          path: 'reservation',
          element: (
            <PrivateRouter element={<Reservation />} redirectTo="/auth/login" />
          ),
        },
        {
          path: 'reservation/reservation-list',
          element: (
            <PrivateRouter element={<ReservationList />} redirectTo="/auth/login" />
          ),
        },
        {
          path: 'order/:_id',
          element: (
            <PrivateRouter
              element={<OrderPageDetail />}
              redirectTo="/auth/login"
            />
          ),
        },
        {
          path: 'order/payment-status/:_id',
          element: (
            <PrivateRouter
              element={<PaymentStatus />}
              redirectTo="/auth/login"
            />
          ),
        },
        {
          path: 'profile',
          element: (
            <PrivateRouter element={<ProfilePage />} redirectTo="/auth/login" />
          ),
        },
        {
          path: 'setting',
          element: (
            <PrivateRouter element={<SettingPage />} redirectTo="/auth/login" />
          ),
        },
      ],
    },
    { path: 'faq', element: <FAQPage /> },
    {
      path: 'auth/login',
      element: <LoginPage />,
    },
    {
      path: 'auth/register',
      element: <RegisterPage />,
    },
    {
      path: 'auth/admin/login',
      element: <AdminLogin />,
    },
    {
      path: '/admin',
      element: <DashboardLayoutAdmin />,
      children: [
        {
          path: '/admin',
          element: (
            <PrivateRouter
              element={<AdminDashboard />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'customer-manage',
          element: (
            <PrivateRouter
              element={<CustomerManage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'customer-manage/:_id',
          element: (
            <PrivateRouter
              element={<CustomerDetail />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'employee-manage',
          element: (
            <PrivateRouter
              element={<EmployeeManage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'employee-manage/:_id',
          element: (
            <PrivateRouter
              element={<EmployeeDetail />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'product-manage',
          element: (
            <PrivateRouter
              element={<ProductManage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'product-manage/create',
          element: (
            <PrivateRouter
              element={<ProductForm />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'product-manage/edit/:_id',
          element: (
            <PrivateRouter
              element={<ProductForm />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'category-manage',
          element: (
            <PrivateRouter
              element={<CategoryManage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'category-manage/:_id',
          element: (
            <PrivateRouter
              element={<CategoryDetail />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'order-manage',
          element: (
            <PrivateRouter
              element={<OrderManage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'order-manage/:_id',
          element: (
            <PrivateRouter
              element={<OrderDetail />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'payment-manage',
          element: (
            <PrivateRouter
              element={<PaymentManage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'reservation-manage',
          element: (
            <PrivateRouter
              element={<ReservationManage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'profile',
          element: (
            <PrivateRouter
              element={<ProfileAdminPage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
        {
          path: 'setting',
          element: (
            <PrivateRouter
              element={<SettingAdminPage />}
              redirectTo="/auth/admin/login"
            />
          ),
        },
      ],
    },
    {
      element: <SimpleLayout />,
      // children: [
      //   { element: <Navigate to="/dashboard/app" />, index: true },
      //   { path: '404', element: <Page404 /> },
      //   { path: '*', element: <Navigate to="/404" /> },
      // ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}
