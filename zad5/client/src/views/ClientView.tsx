import React, { useEffect, useState } from "react";
import Product from "../components/Product";

type CartResponse = {
    products: number[];
};

const ClientView: React.FC = () => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartDataFromServer = async () => {
            setLoading(true);
            setError(null);

            try {
                const [cartRes, productsRes] = await Promise.all([
                    fetch("http://localhost:8080/cart"),
                    fetch("http://localhost:8080/products")
                ]);

                if (!cartRes.ok) {
                    throw new Error(`Błąd HTTP podczas pobierania koszyka: ${cartRes.status}`);
                }
                if (!productsRes.ok) {
                    throw new Error(`Błąd HTTP podczas pobierania produktów: ${productsRes.status}`);
                }

                const cartData: CartResponse = await cartRes.json();
                const allProducts: Product[] = await productsRes.json();

                // Stwórz listę produktów w koszyku na podstawie ID
                const detailedCartProducts: Product[] = cartData.products.map(productId => {
                    return allProducts.find(product => product.id === productId);
                }).filter(product => product !== undefined) as Product[];

                setCartProducts(detailedCartProducts);
                setLoading(false);

            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCartDataFromServer();
    }, []);

    if (loading) {
        return <p>Ładowanie koszyka...</p>;
    }

    if (error) {
        return <p>Wystąpił błąd podczas ładowania koszyka: {error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Twój koszyk</h2>
            {cartProducts.length === 0 ? (
                <p>Koszyk jest pusty.</p>
            ) : (
                <ul className="space-y-2">
                    {cartProducts.map((item) => (
                        <li key={item.id} className="border p-2 rounded">
                            <strong>{item.name}</strong> – {item.price.toFixed(2)} zł
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClientView;
