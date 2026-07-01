import { Link, NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav__link nav__link_active" : "nav__link";

const getAccountLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? "account-link account-link_active" : "account-link";

export function AppHeader() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    return (
        <header className="header">
            <Link className="logo" to="/products">
                <span className="logo__mark">P</span>
                <span>Products Dashboard</span>
            </Link>

            <div className="header__content">
                <nav className="nav" aria-label="Основная навигация">
                    <NavLink className={getNavLinkClassName} to="/products">
                        Товары
                    </NavLink>

                    <NavLink className={getNavLinkClassName} to="/favorites">
                        Избранное
                    </NavLink>
                </nav>

                <div className="nav__actions">
                    {user ? (
                        <>
                            <NavLink className={getAccountLinkClassName} to="/profile">
                                <img
                                    className="account-link__avatar"
                                    src={user.image}
                                    alt={user.username}
                                />

                                <span className="account-link__info">
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <small>Личный кабинет</small>
                </span>
                            </NavLink>

                            <button
                                className="nav__button"
                                type="button"
                                onClick={() => dispatch(logout())}
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        <NavLink className={getNavLinkClassName} to="/login">
                            Войти
                        </NavLink>
                    )}
                </div>
            </div>
        </header>
    );
}