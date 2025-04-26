import React, {useEffect, useState} from "react";
import {Product} from "./Product";

type ProductData = {
    id: number
};

const Cart: React.FC = () => {
    const [id, setId] = useState(0);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Błąd ładowania produktów:", error));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const productData: ProductData = {
            id
        };

        try {
            const res = await fetch("http://localhost:8080/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!res.ok) throw new Error("Błąd serwera");

            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <div className="p-4">
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
            <form onSubmit={handleSubmit} className="space-y-2">
                <label>
                    Podaj ID produktu do dodania:
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(Number(e.target.value))}
                        className="border p-1 ml-2"
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
                    Dodaj do koszyka
                </button>
                {status === "success" && <p className="text-green-600">Dodano do koszyka!</p>}
                {status === "error" && <p className="text-red-600">Wystąpił błąd.</p>}
            </form>
        </div>
    );
};

export default Cart;