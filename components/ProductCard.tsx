import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: number) => void;
}) {
  const navigate = useNavigate();

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <h3>{product.ten}</h3>
      <p>
        {product.danhMuc} • {product.gia.toLocaleString()} VND • Qty:{' '}
        {product.soLuong}
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => navigate(`/products/${product.id}`)}>
          Details
        </button>

        <button onClick={() => navigate(`/edit/${product.id}`)}>Edit</button>

        <button
          onClick={() => {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này?'))
              onDelete(product.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
