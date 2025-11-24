
import { Category } from '../types';

const categories: (Category | 'All')[] = ['All', 'Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

export default function FilterBar({
  category,
  setCategory,
  min,
  max,
  setMin,
  setMax,
}: {
  category: string;
  setCategory: (s: string) => void;
  min: number | '';
  max: number | '';
  setMin: (v: number | '') => void;
  setMax: (v: number | '') => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input type="number" placeholder="min" value={min as any} onChange={(e) => setMin(e.target.value ? Number(e.target.value) : '')} style={{ width: 100 }} />
      <input type="number" placeholder="max" value={max as any} onChange={(e) => setMax(e.target.value ? Number(e.target.value) : '')} style={{ width: 100 }} />
      <button onClick={() => { setCategory('All'); setMin('' as any); setMax('' as any); }}>Clear</button>
    </div>
  );
}
