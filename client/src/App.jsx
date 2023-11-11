import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routers/routes';
// theme
import ThemeProviders from './theme/ThemeProviders';
// components
import ScrollToTop from './Components/User/scroll-to-top';
//ToastContainer
import { ToastContainer } from 'react-toastify';
//context
import { AuthProvider } from './Contexts/AuthContext';
import { ProductsProvider } from './Contexts/ProductsContext';
import { CommonProvider } from './Contexts/CommonContext';
import { UsersProvider } from './Contexts/UsersContext';
import { EmployeesProvider } from './Contexts/EmployeesContext';
import { CategoryProvider } from './Contexts/CategoryContext';
import { CartProvider } from './Contexts/CartContext';
import { OrdersProvider } from './Contexts/OrderContext';
import { RoleProvider } from './Contexts/RoleContext';
import { PaymentsProvider } from './Contexts/PaymentContext';
import { ReservationProvider } from './Contexts/ReservationContext';
import { TableProvider } from './Contexts/TableContext';
import { ReviewProvider } from './Contexts/ReviewContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProviders>
          <ToastContainer />
          <AuthProvider>
            <ProductsProvider>
              <CommonProvider>
                <UsersProvider>
                  <EmployeesProvider>
                    <CategoryProvider>
                      <CartProvider>
                        <OrdersProvider>
                          <RoleProvider>
                            <PaymentsProvider>
                              <ReservationProvider>
                                <TableProvider>
                                  <ReviewProvider>
                                    <Router />
                                  </ReviewProvider>
                                </TableProvider>
                              </ReservationProvider>
                            </PaymentsProvider>
                          </RoleProvider>
                        </OrdersProvider>
                      </CartProvider>
                    </CategoryProvider>
                  </EmployeesProvider>
                </UsersProvider>
              </CommonProvider>
            </ProductsProvider>
          </AuthProvider>
        </ThemeProviders>
      </BrowserRouter>
    </HelmetProvider>
  );
}
