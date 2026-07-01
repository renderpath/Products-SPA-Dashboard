import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { FavoritesPage } from "../pages/FavoritesPage/FavoritesPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage/ProductDetailsPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";

export function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header className="header">
                    <Link className="logo" to="/products">
                        Products Dashboard
                    </Link>

                    <nav className="nav">
                        <Link to="/products">Товары</Link>
                        <Link to="/favorites">Избранное</Link>
                        <Link to="/login">Войти</Link>
                    </nav>
                </header>

                <main className="main">
                    <Routes>
                        <Route path="/" element={<Navigate to="/products" replace />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:productId" element={<ProductDetailsPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}