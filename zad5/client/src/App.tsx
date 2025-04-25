import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ProductList from "./components/Product";
import Cart from "./components/Cart";
import ClientView from "./views/ClientView";
import Payment from "./components/Payment";
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <nav className="mb-6 flex gap-4">
                <Link to="/" className="text-blue-600 hover:underline">Płatność</Link>
                <Link to="/cart" className="text-blue-600 hover:underline">Koszyk</Link>
                <Link to="/client" className="text-blue-600 hover:underline">Widok klienta</Link>
            </nav>
            <div className="min-h-screen bg-gray-100 p-4">
                <Routes>
                    <Route path="/" element={<Payment/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/client" element={<ClientView/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;