// Routing
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Styles
import "./App.css";

// Components
import Navbar from "./components/NavBar/NavBar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BackofficeContainer from "./components/Containers/BackofficeContainer";
import LoginForm from "./components/forms/LoginForm";

// Contexts/providers
import ProductsProvider from "./api/context/ProductsProvider";
import OrdersProvider from "./api/context/OrdersProvider";
import CartProvider from "./api/context/CartProvider";
import AuthProvider from "./api/context/AuthProvider";

// Protected Route
import PrivateRoutes from "./components/routes/PrivateRoutes";

// Toaster
import { Toaster } from "sonner";

// R-suite styles
import "rsuite/dist/rsuite-no-reset.min.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrdersProvider>
          <ProductsProvider>
            <CartProvider>
              <Toaster
                position="top-right"
                toastOptions={{ style: { top: "70px" } }}
              />
              <Routes>
                <Route
                  path="/*"
                  element={
                    <>
                      <Header />
                      <Navbar />
                      <Main />
                      <Footer />
                    </>
                  }
                />
                {/* Protected route */}
                <Route element={<PrivateRoutes />}>
                  <Route path="/backoffice" element={<BackofficeContainer />} />
                </Route>
                {/* Login Route */}
                <Route path="/login" element={<LoginForm />} />
              </Routes>
            </CartProvider>
          </ProductsProvider>
        </OrdersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
