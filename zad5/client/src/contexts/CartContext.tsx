import React, {useEffect, useState, createContext, useContext} from "react";
import { Product } from "../components/Product"

type ProductData = {
    id: number;
};

type CartContextType = {
    cartItems: number[];
    addToCart: (productId: number) => void;
    products: Product[];
    status: "idle" | "loading" | "success" | "error";
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cartItems, setCartItems] = useState<number[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:8080/products");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: Product[] = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Błąd ładowania produktów:", error);
                setStatus("error");
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId: number) => {
        setStatus("loading");
        const productData: ProductData = {
            id: productId,
        };

        try {
            const res = await fetch("http://localhost:8080/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!res.ok) {
                throw new Error("Błąd serwera podczas dodawania do koszyka");
            }

            setCartItems((prevItems) => [...prevItems, productId]);
            setStatus("success");
            setTimeout(() => setStatus("idle"), 3000);
        } catch (err) {
            console.error("Błąd dodawania do koszyka:", err);
            setStatus("error");
        }
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart, products, status}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart musi być użyty wewnątrz CartProvider");
    }
    return context;
};

const Cart: React.FC = () => {
    const {products, addToCart, status} = useCart();
    const [productIdToAdd, setProductIdToAdd] = useState<number | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (productIdToAdd !== undefined) {
            addToCart(productIdToAdd);
            setProductIdToAdd(undefined); // Reset input po dodaniu
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
                        value={productIdToAdd === undefined ? "" : productIdToAdd}
                        onChange={(e) => setProductIdToAdd(Number(e.target.value))}
                        className="border p-1 ml-2"
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded" disabled={status === "loading"}>
                    {status === "loading" ? "Dodawanie..." : "Dodaj do koszyka"}
                </button>
                {status === "success" && <p className="text-green-600">Dodano do koszyka!</p>}
                {status === "error" && <p className="text-red-600">Wystąpił błąd.</p>}
            </form>
        </div>
    );
};

export default Cart;