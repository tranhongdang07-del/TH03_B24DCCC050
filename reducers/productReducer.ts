import { Product } from '../types';

export type Action =
  | { type: 'ADD'; payload: Product }
  | { type: 'UPDATE'; payload: Product }
  | { type: 'DELETE'; payload: number }
  | { type: 'SET_ALL'; payload: Product[] };

export function productReducer(state: Product[], action: Action): Product[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'UPDATE':
      return state.map(p => (p.id === action.payload.id ? action.payload : p));
    case 'DELETE':
      return state.filter(p => p.id !== action.payload);
    case 'SET_ALL':
      return action.payload;
    default:
      return state;
  }
}
