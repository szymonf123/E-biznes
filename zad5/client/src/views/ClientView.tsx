import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../components/Product";

const ClientView: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartAndProducts = async () => {
            try {
                const [cartRes, productsRes] = await Promise.all([
                    fetch("http://localhost:8080/cart"),
                    fetch("http://localhost:8080/products")
                ]);

                const cartIdsRaw = await cartRes.json();
                const cartIds: number[] = cartIdsRaw.products;
                const allProducts: Product[] = await productsRes.json();
                const filteredProducts = allProducts.filter(p => cartIds.includes(p.id));
                setCart(filteredProducts);
            } catch (err) {
                console.error("Błąd ładowania:", err);
            }
        };

        fetchCartAndProducts();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Twój koszyk</h2>
            {cart.length === 0 ? (
                <p>Koszyk jest pusty.</p>
            ) : (
                <ul className="space-y-2">
                    {cart.map((item) => (
                        <li key={item.id} className="border p-2 rounded">
                            <strong>{item.name}</strong> – {item.price.toFixed(2)} zł
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/" className="text-blue-500 mt-4 inline-block">← Powrót do sklepu</Link>
        </div>
    );
};

export default ClientView;

