import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export type Product = {
    id: number;
    name: string;
    price: number;
};

type ProductContextType = {
    products: Product[];
    loading: boolean;
    error: string | null;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get<Product[]>("https://zad5-backend-app.azurewebsites.net/products");
                setProducts(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Wystąpił błąd");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts musi być użyty wewnątrz ProductProvider");
    }
    return context;
};
