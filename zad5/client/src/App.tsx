import React from 'react';
import Payment from './components/Payment';
import ProductList from "./components/Product";

const App: React.FC = () => {
  return (
      <>
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <Payment />
          </div>

          <div className="p-4">
              <h1 className="text-2xl font-bold">Sklep</h1>
              <ProductList />
          </div>
      </>
  );
};

export default App;