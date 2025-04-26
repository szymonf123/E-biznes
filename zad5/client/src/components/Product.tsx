import React from "react";
import { useProducts, Product } from "../contexts/ProductContext";

const ProductList: React.FC = () => {
    const { products, loading, error } = useProducts();

    if (loading) {
        return <p>Ładowanie produktów...</p>;
    }

    if (error) {
        return <p>Wystąpił błąd podczas ładowania produktów: {error}</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Produkty</h2>
            <ol className="space-y-2">
                {products.map((product) => (
                    <li key={product.id} className="border p-2 rounded">
                        <strong>{product.name}</strong> – {product.price.toFixed(2)} zł
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Product;
