# Products SPA Dashboard

Products SPA Dashboard — это учебное многостраничное SPA-приложение на React, созданное для практики работы с современным frontend-стеком: React Router, Redux Toolkit, RTK Query, TypeScript и Webpack.

Проект использует DummyJSON API для авторизации и получения списка товаров.

## Функциональность

* Авторизация пользователя через DummyJSON Auth.
* Защищённые маршруты.
* Список товаров.
* Детальная страница товара.
* Добавление и удаление товаров из избранного.
* Страница избранных товаров.
* Страница профиля пользователя.
* Поиск товаров.
* Фильтрация товаров по категории.
* Сортировка товаров по цене и рейтингу.
* Обработка состояний загрузки, ошибки и пустого результата.
* Адаптивная вёрстка для мобильных и desktop-экранов.

## Страницы приложения

* `/login` — страница авторизации.
* `/products` — каталог товаров.
* `/products/:productId` — детальная страница товара.
* `/favorites` — избранные товары.
* `/profile` — профиль пользователя.
* `*` — страница 404.

## Тестовые данные для входа

Для входа можно использовать тестовые данные DummyJSON:

```txt
username: emilys
password: emilyspass
```

## Стек технологий

* React
* TypeScript
* React Router DOM
* Redux Toolkit
* RTK Query
* React Redux
* Webpack
* Native CSS
* DummyJSON API

## Основные зависимости

```json
{
  "@reduxjs/toolkit": "^2.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-redux": "^9.0.0",
  "react-router-dom": "^7.0.0"
}
```

## Dev-зависимости

```json
{
  "typescript": "^6.0.0",
  "webpack": "^5.0.0",
  "webpack-cli": "^6.0.0",
  "webpack-dev-server": "^5.0.0",
  "ts-loader": "^9.0.0",
  "html-webpack-plugin": "^5.0.0",
  "css-loader": "^7.0.0",
  "style-loader": "^4.0.0"
}
```

Версии могут отличаться в зависимости от актуальных пакетов, установленных через npm.

## Установка и запуск проекта

Склонировать репозиторий:

```bash
git clone https://github.com/renderpath/Products-SPA-Dashboard.git
```

Перейти в папку проекта:

```bash
cd Products-SPA-Dashboard
```

Установить зависимости:

```bash
npm install
```

Запустить проект в режиме разработки:

```bash
npm start
```

После запуска приложение будет доступно по адресу:

```txt
http://localhost:3000
```

## Сборка проекта

Для production-сборки:

```bash
npm run build
```

Готовая сборка появится в папке:

```txt
dist
```

## Структура проекта

```txt
src/
  app/
    providers/
      StoreProvider.tsx
    router/
      ProtectedRoute.tsx
    App.tsx
    store.ts

  entities/
    product/
      ProductCard.tsx
      productTypes.ts

  features/
    auth/
      authSlice.ts
      authTypes.ts
    favorites/
      favoritesSlice.ts
    filters/
      filtersSlice.ts

  pages/
    FavoritesPage/
      FavoritesPage.tsx
    LoginPage/
      LoginPage.tsx
    NotFoundPage/
      NotFoundPage.tsx
    ProductDetailsPage/
      ProductDetailsPage.tsx
    ProductsPage/
      ProductsPage.tsx
    ProfilePage/
      ProfilePage.tsx

  shared/
    api/
      dummyJsonApi.ts
    hooks/
      useAppDispatch.ts
      useAppSelector.ts

  styles/
    global.css

  global.d.ts
  main.tsx
```

## Работа с API

В проекте используется DummyJSON API.

Основные endpoints:

* `POST /auth/login` — авторизация пользователя.
* `GET /products` — получение списка товаров.
* `GET /products/:id` — получение детальной информации о товаре.

Получение и кэширование данных реализовано через RTK Query.

## Управление состоянием

В проекте используется Redux Toolkit.

Состояние разделено на несколько slices:

* `authSlice` — данные авторизованного пользователя.
* `favoritesSlice` — список избранных товаров.
* `filtersSlice` — поиск, фильтрация и сортировка товаров.
* `dummyJsonApi` — API slice для запросов через RTK Query.

## Особенности реализации

* Проект собран вручную через Webpack без Create React App.
* Все страницы реализованы через React Router.
* Защищённые страницы доступны только после авторизации.
* Интерфейс реализован на нативном CSS без UI-библиотек.
* Вёрстка адаптирована под мобильные и desktop-экраны.
* Код разделён на модули: `app`, `pages`, `features`, `entities`, `shared`.

## Деплой

Ссылка на деплой:

```txt
Добавить ссылку после публикации проекта
```

## Скрипты

Запуск проекта:

```bash
npm start
```

Сборка проекта:

```bash
npm run build
```

## Статус проекта

Проект находится в разработке в рамках учебного задания для практики создания SPA-приложения на React.
