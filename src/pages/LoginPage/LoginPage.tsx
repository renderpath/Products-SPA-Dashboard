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

type LoginFormErrors = {
    username?: string;
    password?: string;
};

function validateLoginForm(username: string, password: string): LoginFormErrors {
    const errors: LoginFormErrors = {};

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername) {
        errors.username = "Введите username.";
    } else if (trimmedUsername.length < 3) {
        errors.username = "Username должен содержать минимум 3 символа.";
    } else if (/\s/.test(trimmedUsername)) {
        errors.username = "Username не должен содержать пробелы.";
    }

    if (!trimmedPassword) {
        errors.password = "Введите пароль.";
    } else if (trimmedPassword.length < 6) {
        errors.password = "Пароль должен содержать минимум 6 символов.";
    } else if (/\s/.test(trimmedPassword)) {
        errors.password = "Пароль не должен содержать пробелы.";
    }

    return errors;
}

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useAppSelector((state) => state.auth.user);
    const [login, { isLoading }] = useLoginMutation();

    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [serverError, setServerError] = useState("");

    const state = location.state as LocationState | null;
    const from = state?.from?.pathname ?? "/products";

    const isFormValid =
        Object.keys(validateLoginForm(username, password)).length === 0;

    if (user) {
        return <Navigate to="/products" replace />;
    }

    function handleUsernameChange(value: string) {
        setUsername(value);
        setServerError("");

        if (errors.username) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: validateLoginForm(value, password).username,
            }));
        }
    }

    function handlePasswordChange(value: string) {
        setPassword(value);
        setServerError("");

        if (errors.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: validateLoginForm(username, value).password,
            }));
        }
    }

    function handleUsernameBlur() {
        setErrors((prevErrors) => ({
            ...prevErrors,
            username: validateLoginForm(username, password).username,
        }));
    }

    function handlePasswordBlur() {
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: validateLoginForm(username, password).password,
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors = validateLoginForm(username, password);
        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const authUser = await login({
                username: username.trim(),
                password: password.trim(),
                expiresInMins: 60,
            }).unwrap();

            dispatch(setCredentials(authUser));
            navigate(from, { replace: true });
        } catch {
            setServerError("Не удалось войти. Проверь логин и пароль.");
        }
    }

    return (
        <section className="login-page">
            <div className="login-card">
                <h1>Вход в Dashboard</h1>

                <p className="login-card__text">
                    Для теста можно использовать готовые данные DummyJSON:
                </p>

                <div className="demo-credentials">
                    <span>username: emilys</span>
                    <span>password: emilyspass</span>
                </div>

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <label className="filter-field">
                        <span>Username</span>

                        <input
                            className={errors.username ? "field-error-input" : ""}
                            type="text"
                            value={username}
                            autoComplete="username"
                            placeholder="Введите username"
                            aria-invalid={Boolean(errors.username)}
                            aria-describedby={
                                errors.username ? "username-error" : undefined
                            }
                            onChange={(event) => handleUsernameChange(event.target.value)}
                            onBlur={handleUsernameBlur}
                        />

                        {errors.username && (
                            <small className="field-error" id="username-error">
                                {errors.username}
                            </small>
                        )}
                    </label>

                    <label className="filter-field">
                        <span>Password</span>

                        <input
                            className={errors.password ? "field-error-input" : ""}
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            placeholder="Введите пароль"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                                errors.password ? "password-error" : undefined
                            }
                            onChange={(event) => handlePasswordChange(event.target.value)}
                            onBlur={handlePasswordBlur}
                        />

                        {errors.password && (
                            <small className="field-error" id="password-error">
                                {errors.password}
                            </small>
                        )}
                    </label>

                    {serverError && <p className="form-error">{serverError}</p>}

                    <button
                        className="primary-button"
                        type="submit"
                        disabled={isLoading || !isFormValid}
                    >
                        {isLoading ? "Входим..." : "Войти"}
                    </button>
                </form>
            </div>
        </section>
    );
}