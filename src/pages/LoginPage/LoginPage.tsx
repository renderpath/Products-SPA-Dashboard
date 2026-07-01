import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../shared/api/dummyJsonApi";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

type LocationState = {
    from?: {
        pathname?: string;
    };
};

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useAppSelector((state) => state.auth.user);
    const [login, { isLoading }] = useLoginMutation();

    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const [error, setError] = useState("");

    const state = location.state as LocationState | null;
    const from = state?.from?.pathname ?? "/products";

    if (user) {
        return <Navigate to="/products" replace />;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            const authUser = await login({
                username,
                password,
                expiresInMins: 60,
            }).unwrap();

            dispatch(setCredentials(authUser));
            navigate(from, { replace: true });
        } catch {
            setError("Не удалось войти. Проверь логин и пароль.");
        }
    }

    return (
        <section className="login-page">
            <div className="login-card">
                <p className="page-label">Auth</p>
                <h1>Вход в Dashboard</h1>
                <p className="login-card__text">
                    Для теста можно использовать готовые данные DummyJSON:
                </p>

                <div className="demo-credentials">
                    <span>username: emilys</span>
                    <span>password: emilyspass</span>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="filter-field">
                        <span>Username</span>
                        <input
                            type="text"
                            value={username}
                            autoComplete="username"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </label>

                    <label className="filter-field">
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>

                    {error && <p className="form-error">{error}</p>}

                    <button className="primary-button" type="submit" disabled={isLoading}>
                        {isLoading ? "Входим..." : "Войти"}
                    </button>
                </form>
            </div>
        </section>
    );
}