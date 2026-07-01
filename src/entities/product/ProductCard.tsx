import { Link } from "react-router-dom";
import type { Product } from "./productTypes";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    favoriteButtonText: string;
    onFavoriteClick: (productId: number) => void;
};

export function ProductCard({
                                product,
                                isFavorite,
                                favoriteButtonText,
                                onFavoriteClick,
                            }: ProductCardProps) {
    return (
        <article className="product-card">
            <Link
                to={`/products/${product.id}`}
                className="product-card__image-wrapper"
                aria-label={`Открыть товар ${product.title}`}
            >
                <img
                    className="product-card__image"
                    src={product.thumbnail}
                    alt={product.title}
                />

                <span className="product-card__image-overlay">Подробнее</span>
            </Link>

            <div className="product-card__content">
                <div className="product-card__top">
                    <span className="product-card__category">{product.category}</span>
                    <span className="product-card__rating">⭐ {product.rating}</span>
                </div>

                <h2 className="product-card__title">
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                </h2>

                <p className="product-card__description">{product.description}</p>

                <div className="product-card__meta">
                    <div>
                        <span>Цена</span>
                        <strong>${product.price}</strong>
                    </div>

                    <div>
                        <span>В наличии</span>
                        <strong>{product.stock}</strong>
                    </div>
                </div>

                <div className="product-card__actions">
                    <Link className="secondary-link" to={`/products/${product.id}`}>
                        Подробнее
                    </Link>

                    <button
                        className={
                            isFavorite
                                ? "favorite-button favorite-button_active"
                                : "favorite-button"
                        }
                        type="button"
                        aria-pressed={isFavorite}
                        onClick={() => onFavoriteClick(product.id)}
                    >
                        {favoriteButtonText}
                    </button>
                </div>
            </div>
        </article>
    );
}