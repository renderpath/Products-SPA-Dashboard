import { Link, useParams } from "react-router-dom";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { useGetProductByIdQuery } from "../../shared/api/dummyJsonApi";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

export function ProductDetailsPage() {
    const { productId } = useParams();

    const dispatch = useAppDispatch();
    const favoriteIds = useAppSelector((state) => state.favorites.ids);

    const id = Number(productId);

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductByIdQuery(id, {
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

    const isFavorite = favoriteIds.includes(product.id);

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
                    <p className="product-details__description">
                        {product.description}
                    </p>

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

                    <button
                        className={
                            isFavorite
                                ? "favorite-button favorite-button_active product-details__favorite"
                                : "favorite-button product-details__favorite"
                        }
                        type="button"
                        onClick={() => dispatch(toggleFavorite(product.id))}
                    >
                        {isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                    </button>
                </div>
            </div>
        </section>
    );
}