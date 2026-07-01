import {
    BrowserRouter,
    Link,
    NavLink,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { logout } from "../features/auth/authSlice";
import { FavoritesPage } from "../pages/FavoritesPage/FavoritesPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage/ProductDetailsPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";
import { useAppSelector } from "../shared/hooks/useAppSelector";

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav__link nav__link_active" : "nav__link";

export function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    return (
        <BrowserRouter>
            <div className="app">
                <header className="header">
                    <Link className="logo" to="/products">
                        <span className="logo__mark">P</span>
                        <span>Products Dashboard</span>
                    </Link>

                    <nav className="nav">
                        <NavLink className={getNavLinkClassName} to="/products">
                            Товары
                        </NavLink>

                        <NavLink className={getNavLinkClassName} to="/favorites">
                            Избранное
                        </NavLink>

                        {user && (
                            <NavLink className={getNavLinkClassName} to="/profile">
                                Профиль
                            </NavLink>
                        )}

                        {user ? (
                            <button
                                className="nav__button"
                                type="button"
                                onClick={() => dispatch(logout())}
                            >
                                Выйти
                            </button>
                        ) : (
                            <NavLink className={getNavLinkClassName} to="/login">
                                Войти
                            </NavLink>
                        )}
                    </nav>
                </header>

                {user && (
                    <div className="user-bar">
                        <Link className="user-bar__profile" to="/profile">
                            <img src={user.image} alt={user.username} />
                            <span>
                {user.firstName} {user.lastName}
              </span>
                        </Link>
                    </div>
                )}

                <main className="main">
                    <Routes>
                        <Route path="/" element={<Navigate to="/products" replace />} />
                        <Route path="/login" element={<LoginPage />} />

                        <Route
                            path="/products"
                            element={
                                <ProtectedRoute>
                                    <ProductsPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/products/:productId"
                            element={
                                <ProtectedRoute>
                                    <ProductDetailsPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/favorites"
                            element={
                                <ProtectedRoute>
                                    <FavoritesPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}