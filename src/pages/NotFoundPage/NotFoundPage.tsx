import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <section className="not-found-page">
            <p className="page-label">404</p>
            <h1>Страница не найдена</h1>
            <p>
                Возможно, ссылка устарела или такой страницы больше нет в приложении.
            </p>

            <Link className="primary-link" to="/products">
                Вернуться к товарам
            </Link>
        </section>
    );
}