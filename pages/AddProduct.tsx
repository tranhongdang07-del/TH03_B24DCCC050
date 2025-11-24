
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

export default function AddProduct() {
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();

  function handleAdd(data: Omit<Product,'id'>) {
    const newId = products.length ? Math.max(...products.map(p=>p.id)) + 1 : 1;
    const newProd: Product = { id: newId, ...data };
    dispatch({ type: 'ADD', payload: newProd });
    navigate('/');
  }

  return (
    <div>
      <h2>Thêm sản phẩm</h2>
      <ProductForm onSubmit={handleAdd} submitLabel="Thêm" />
    </div>
  );
}
