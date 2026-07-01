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

                <p className="product-card__description">{product.description}</p>

                <div className="product-card__footer">
                    <span className="product-card__price">${product.price}</span>
                    <span className="product-card__rating">⭐ {product.rating}</span>
                </div>

                <button
                    className={
                        isFavorite
                            ? "favorite-button favorite-button_active"
                            : "favorite-button"
                    }
                    type="button"
                    onClick={() => onFavoriteClick(product.id)}
                >
                    {favoriteButtonText}
                </button>
            </div>
        </article>
    );
}