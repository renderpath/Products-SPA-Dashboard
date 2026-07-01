import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../shared/api/dummyJsonApi";

export function ProductDetailsPage() {
    const { productId } = useParams();

    const id = Number(productId);

    const { data: product, isLoading, isError } = useGetProductByIdQuery(id, {
        skip: Number.isNaN(id),
    });

    if (Number.isNaN(id)) {
        return (
            <section>
                <h1>Некорректный ID товара</h1>
                <Link to="/products">Вернуться к товарам</Link>
            </section>
        );
    }

    if (isLoading) {
        return <p className="status-message">Загрузка товара...</p>;
    }

    if (isError || !product) {
        return (
            <section>
                <h1>Товар не найден</h1>
                <Link to="/products">Вернуться к товарам</Link>
            </section>
        );
    }

    return (
        <section className="product-details">
            <Link className="back-link" to="/products">
                ← Назад к товарам
            </Link>

            <div className="product-details__layout">
                <div className="product-details__image-wrapper">
                    <img
                        className="product-details__image"
                        src={product.thumbnail}
                        alt={product.title}
                    />
                </div>

                <div className="product-details__content">
                    <p className="page-label">{product.category}</p>
                    <h1>{product.title}</h1>
                    <p className="product-details__description">{product.description}</p>

                    <div className="product-details__stats">
                        <div>
                            <span>Цена</span>
                            <strong>${product.price}</strong>
                        </div>

                        <div>
                            <span>Рейтинг</span>
                            <strong>⭐ {product.rating}</strong>
                        </div>

                        <div>
                            <span>На складе</span>
                            <strong>{product.stock}</strong>
                        </div>

                        <div>
                            <span>Скидка</span>
                            <strong>{product.discountPercentage}%</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}