import { ProductCard } from "../../entities/product/ProductCard";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import {
    resetFilters,
    setCategory,
    setSearch,
    setSort,
    type SortOption,
} from "../../features/filters/filtersSlice";
import { useGetProductsQuery } from "../../shared/api/dummyJsonApi";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

export function ProductsPage() {
    const dispatch = useAppDispatch();

    const favoriteIds = useAppSelector((state) => state.favorites.ids);
    const { search, category, sort } = useAppSelector((state) => state.filters);

    const { data, isLoading, isError } = useGetProductsQuery();

    const products = data?.products ?? [];

    const categories = Array.from(
        new Set(products.map((product) => product.category)),
    );

    const filteredProducts = products
        .filter((product) => {
            const normalizedSearch = search.trim().toLowerCase();

            const matchesSearch =
                product.title.toLowerCase().includes(normalizedSearch) ||
                product.description.toLowerCase().includes(normalizedSearch) ||
                product.category.toLowerCase().includes(normalizedSearch);

            const matchesCategory =
                category === "all" || product.category === category;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sort) {
                case "price-asc":
                    return a.price - b.price;

                case "price-desc":
                    return b.price - a.price;

                case "rating-desc":
                    return b.rating - a.rating;

                default:
                    return 0;
            }
        });

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
                    Каталог товаров из DummyJSON API. Поиск, фильтрация и сортировка
                    управляются через Redux Toolkit.
                </p>
            </div>

            <div className="filters-panel">
                <label className="filter-field">
                    <span>Поиск</span>
                    <input
                        type="search"
                        placeholder="Например: phone, laptop, beauty..."
                        value={search}
                        onChange={(event) => dispatch(setSearch(event.target.value))}
                    />
                </label>

                <label className="filter-field">
                    <span>Категория</span>
                    <select
                        value={category}
                        onChange={(event) => dispatch(setCategory(event.target.value))}
                    >
                        <option value="all">Все категории</option>

                        {categories.map((categoryName) => (
                            <option value={categoryName} key={categoryName}>
                                {categoryName}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="filter-field">
                    <span>Сортировка</span>
                    <select
                        value={sort}
                        onChange={(event) =>
                            dispatch(setSort(event.target.value as SortOption))
                        }
                    >
                        <option value="default">По умолчанию</option>
                        <option value="price-asc">Сначала дешевле</option>
                        <option value="price-desc">Сначала дороже</option>
                        <option value="rating-desc">Сначала высокий рейтинг</option>
                    </select>
                </label>

                <button
                    className="reset-button"
                    type="button"
                    onClick={() => dispatch(resetFilters())}
                >
                    Сбросить
                </button>
            </div>

            <div className="products-summary">
                Найдено товаров: <strong>{filteredProducts.length}</strong>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="empty-state">
                    <h2>Товары не найдены</h2>
                    <p>Попробуй изменить поисковый запрос или сбросить фильтры.</p>
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => dispatch(resetFilters())}
                    >
                        Сбросить фильтры
                    </button>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => {
                        const isFavorite = favoriteIds.includes(product.id);

                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isFavorite={isFavorite}
                                favoriteButtonText={
                                    isFavorite ? "В избранном" : "В избранное"
                                }
                                onFavoriteClick={(productId) =>
                                    dispatch(toggleFavorite(productId))
                                }
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}