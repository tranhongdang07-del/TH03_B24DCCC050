

export default function Pagination({
  total,
  perPage,
  current,
  setCurrent,
}: {
  total: number;
  perPage: number;
  current: number;
  setCurrent: (n: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
      <button disabled={current <= 1} onClick={() => setCurrent(current - 1)}>Previous</button>
      {nums.map(n => (
        <button key={n} onClick={() => setCurrent(n)} style={{ fontWeight: n === current ? 'bold' : 'normal' }}>{n}</button>
      ))}
      <button disabled={current >= pages} onClick={() => setCurrent(current + 1)}>Next</button>
      <div style={{ marginLeft: 12 }}>Tổng: {total} sản phẩm — Trang {current}/{pages}</div>
    </div>
  );
}
