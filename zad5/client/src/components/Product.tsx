import React, { useEffect, useState } from "react";

type Product = {
    name: string;
    price: number;
};

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Błąd ładowania produktów:", error));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Produkty</h2>
            <ul className="space-y-2">
                {products.map((product) => (
                    <li className="border p-2 rounded">
                        <strong>{product.name}</strong> – {product.price.toFixed(2)} zł
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
