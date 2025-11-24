
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams();
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();
  const pid = Number(id);
  const prod = products.find(p => p.id === pid);
  if (!prod) return <div>Không tìm thấy sản phẩm.</div>;

  function handleUpdate(data: any) {
    dispatch({ type: 'UPDATE', payload: data });
    navigate(`/products/${pid}`);
  }

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <ProductForm initial={prod} onSubmit={handleUpdate} submitLabel="Cập nhật" />
    </div>
  );
}
