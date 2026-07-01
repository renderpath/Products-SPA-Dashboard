import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../shared/api/dummyJsonApi";

export function ProductsPage() {
    const { data, isLoading, isError } = useGetProductsQuery();

    if (isLoading) {
        return <p className="status-message">Загрузка товаров...</p>;
    }

    if (isError) {
        return (
            <p className="status-message status-message_error">
                Не удалось загрузить товары. Попробуйте позже.
            </p>
        );
    }

    return (
        <section className="products-page">
            <div className="page-heading">
                <p className="page-label">Dashboard</p>
                <h1>Products</h1>
                <p>
                    Каталог товаров из DummyJSON API. Данные загружаются и кэшируются
                    через RTK Query.
                </p>
            </div>

            <div className="products-grid">
                {data?.products.map((product) => (
                    <article className="product-card" key={product.id}>
                        <Link to={`/products/${product.id}`} className="product-card__image-wrapper">
                            <img
                                className="product-card__image"
                                src={product.thumbnail}
                                alt={product.title}
                            />
                        </Link>

                        <div className="product-card__content">
                            <p className="product-card__category">{product.category}</p>

                            <h2 className="product-card__title">
                                <Link to={`/products/${product.id}`}>{product.title}</Link>
                            </h2>

                            <p className="product-card__description">{product.description}</p>

                            <div className="product-card__footer">
                                <span className="product-card__price">${product.price}</span>
                                <span className="product-card__rating">⭐ {product.rating}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}