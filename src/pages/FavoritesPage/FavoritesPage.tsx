import { Link } from "react-router-dom";
import { removeFromFavorites } from "../../features/favorites/favoritesSlice";
import { useGetProductsQuery } from "../../shared/api/dummyJsonApi";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

export function FavoritesPage() {
    const dispatch = useAppDispatch();
    const favoriteIds = useAppSelector((state) => state.favorites.ids);

    const { data, isLoading, isError } = useGetProductsQuery();

    const favoriteProducts =
        data?.products.filter((product) => favoriteIds.includes(product.id)) ?? [];

    if (isLoading) {
        return <p className="status-message">Загрузка избранного...</p>;
    }

    if (isError) {
        return (
            <p className="status-message status-message_error">
                Не удалось загрузить избранные товары.
            </p>
        );
    }

    return (
        <section className="favorites-page">
            <div className="page-heading">
                <p className="page-label">Favorites</p>
                <h1>Избранное</h1>
                <p>
                    Здесь отображаются товары, которые были добавлены в избранное через
                    Redux Toolkit.
                </p>
            </div>

            {favoriteProducts.length === 0 ? (
                <div className="empty-state">
                    <h2>Пока нет избранных товаров</h2>
                    <p>Добавь товары из каталога, чтобы они появились здесь.</p>
                    <Link className="primary-link" to="/products">
                        Перейти к товарам
                    </Link>
                </div>
            ) : (
                <div className="products-grid">
                    {favoriteProducts.map((product) => (
                        <article className="product-card" key={product.id}>
                            <Link
                                to={`/products/${product.id}`}
                                className="product-card__image-wrapper"
                            >
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

                                <p className="product-card__description">
                                    {product.description}
                                </p>

                                <div className="product-card__footer">
                                    <span className="product-card__price">${product.price}</span>
                                    <span className="product-card__rating">
                    ⭐ {product.rating}
                  </span>
                                </div>

                                <button
                                    className="favorite-button favorite-button_active"
                                    type="button"
                                    onClick={() => dispatch(removeFromFavorites(product.id))}
                                >
                                    Убрать из избранного
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}