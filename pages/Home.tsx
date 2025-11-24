import { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const PER_PAGE = 6;

export default function Home() {
  const { products, dispatch } = useProducts();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [min, setMin] = useState<number | ''>('');
  const [max, setMax] = useState<number | ''>('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let arr = [...products];

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      arr = arr.filter((p) => p.ten.toLowerCase().includes(q));
    }

    if (category !== 'All') arr = arr.filter((p) => p.danhMuc === category);
    if (min !== '') arr = arr.filter((p) => p.gia >= Number(min));
    if (max !== '') arr = arr.filter((p) => p.gia <= Number(max));

    return arr;
  }, [products, query, category, min, max]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  if (page > pages) setPage(pages);

  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  function handleDelete(id: number) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />

      <FilterBar
        category={category}
        setCategory={(c) => {
          setCategory(c);
          setPage(1);
        }}
        min={min}
        max={max}
        setMin={(v) => {
          setMin(v);
          setPage(1);
        }}
        setMax={(v) => {
          setMax(v);
          setPage(1);
        }}
      />

      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        {pageItems.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} />
        ))}

        {pageItems.length === 0 && <div>Không có sản phẩm phù hợp.</div>}
      </div>

      <Pagination
        total={total}
        perPage={PER_PAGE}
        current={page}
        setCurrent={setPage}
      />
    </div>
  );
}
