import { Link } from "react-router-dom";
import { ProductCard } from "../../entities/product/ProductCard";
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
                <h1>Избранное</h1>
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
                        <ProductCard
                            key={product.id}
                            product={product}
                            isFavorite={true}
                            favoriteButtonText="Убрать из избранного"
                            onFavoriteClick={(productId) =>
                                dispatch(removeFromFavorites(productId))
                            }
                        />
                    ))}
                </div>
            )}
        </section>
    );
}