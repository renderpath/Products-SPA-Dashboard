import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../../entities/product/ProductCard";
import { removeFromFavorites } from "../../features/favorites/favoritesSlice";
import { useGetProductsQuery } from "../../shared/api/dummyJsonApi";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

type FavoriteSortOption =
    | "default"
    | "price-asc"
    | "price-desc"
    | "rating-desc";

const FAVORITES_PAGE_SIZE = 6;

export function FavoritesPage() {
    const dispatch = useAppDispatch();
    const favoriteIds = useAppSelector((state) => state.favorites.ids);

    const { data, isLoading, isError } = useGetProductsQuery();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState<FavoriteSortOption>("default");
    const [page, setPage] = useState(1);

    const favoriteProducts =
        data?.products.filter((product) => favoriteIds.includes(product.id)) ?? [];

    const categories = Array.from(
        new Set(favoriteProducts.map((product) => product.category)),
    ).sort();

    const filteredFavoriteProducts = favoriteProducts
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

    const totalPages = Math.max(
        1,
        Math.ceil(filteredFavoriteProducts.length / FAVORITES_PAGE_SIZE),
    );

    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * FAVORITES_PAGE_SIZE;
    const endIndex = startIndex + FAVORITES_PAGE_SIZE;

    const paginatedFavoriteProducts = filteredFavoriteProducts.slice(
        startIndex,
        endIndex,
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    function resetFavoriteFilters() {
        setSearch("");
        setCategory("all");
        setSort("default");
        setPage(1);
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        setPage(1);
    }

    function handleCategoryChange(value: string) {
        setCategory(value);
        setPage(1);
    }

    function handleSortChange(value: FavoriteSortOption) {
        setSort(value);
        setPage(1);
    }

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
                <>
                    <div className="filters-panel">
                        <label className="filter-field filter-field_search">
                            <span>Поиск</span>
                            <input
                                type="search"
                                placeholder="Найти среди избранного..."
                                value={search}
                                onChange={(event) => handleSearchChange(event.target.value)}
                            />
                        </label>

                        <label className="filter-field">
                            <span>Категория</span>
                            <select
                                value={category}
                                onChange={(event) => handleCategoryChange(event.target.value)}
                            >
                                <option value="all">Все категории</option>

                                {categories.map((categoryName) => (
                                    <option value={categoryName} key={categoryName}>
                                        {categoryName.replace(/-/g, " ")}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="filter-field">
                            <span>Сортировка</span>
                            <select
                                value={sort}
                                onChange={(event) =>
                                    handleSortChange(event.target.value as FavoriteSortOption)
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
                            onClick={resetFavoriteFilters}
                        >
                            Сбросить
                        </button>
                    </div>

                    <div className="products-summary">
                        {filteredFavoriteProducts.length > 0 ? (
                            <span>
                Показано{" "}
                                <strong>
                  {startIndex + 1}–
                                    {Math.min(endIndex, filteredFavoriteProducts.length)}
                </strong>{" "}
                                из <strong>{filteredFavoriteProducts.length}</strong> избранных
                товаров
              </span>
                        ) : (
                            <span>
                Найдено избранных товаров: <strong>0</strong>
              </span>
                        )}
                    </div>

                    {filteredFavoriteProducts.length === 0 ? (
                        <div className="empty-state">
                            <h2>Ничего не найдено</h2>
                            <p>
                                В избранном есть товары, но они не подходят под текущие фильтры.
                            </p>

                            <button
                                className="primary-button"
                                type="button"
                                onClick={resetFavoriteFilters}
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {paginatedFavoriteProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        isFavorite={true}
                                        favoriteButtonText="Убрать"
                                        onFavoriteClick={(productId) =>
                                            dispatch(removeFromFavorites(productId))
                                        }
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <nav
                                    className="pagination"
                                    aria-label="Пагинация избранных товаров"
                                >
                                    <button
                                        className="pagination__button"
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() => setPage(currentPage - 1)}
                                    >
                                        Назад
                                    </button>

                                    <div className="pagination__pages">
                                        {pageNumbers.map((pageNumber) => (
                                            <button
                                                className={
                                                    pageNumber === currentPage
                                                        ? "pagination__button pagination__button_active"
                                                        : "pagination__button"
                                                }
                                                type="button"
                                                key={pageNumber}
                                                aria-current={
                                                    pageNumber === currentPage ? "page" : undefined
                                                }
                                                onClick={() => setPage(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className="pagination__button"
                                        type="button"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setPage(currentPage + 1)}
                                    >
                                        Вперёд
                                    </button>
                                </nav>
                            )}
                        </>
                    )}
                </>
            )}
        </section>
    );
}