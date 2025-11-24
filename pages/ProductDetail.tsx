
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();
  const pid = Number(id);
  const p = products.find(x => x.id === pid);
  if (!p) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div>
      <h2>{p.ten}</h2>
      <p>Danh mục: {p.danhMuc}</p>
      <p>Giá: {p.gia.toLocaleString()} VND</p>
      <p>Số lượng: {p.soLuong}</p>
      <p>Mô tả: {p.moTa}</p>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate(`/edit/${p.id}`)}>Edit</button>
        <button onClick={() => { if (confirm('Xóa sản phẩm?')) { dispatch({type:'DELETE', payload: p.id}); navigate('/'); } }}>Delete</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
