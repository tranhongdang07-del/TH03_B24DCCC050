import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types';
import { productReducer, Action } from '../reducers/productReducer';
import { initialProducts } from '../data/initialProducts';

type ProductContextType = {
  products: Product[];
  dispatch: React.Dispatch<Action>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, dispatch] = useReducer(productReducer, initialProducts);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
