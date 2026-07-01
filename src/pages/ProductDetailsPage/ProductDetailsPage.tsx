import { useParams } from "react-router-dom";

export function ProductDetailsPage() {
    const { productId } = useParams();

    return (
        <section>
            <h1>Product Details</h1>
            <p>Страница товара с ID: {productId}</p>
        </section>
    );
}