

export default function SearchBar({ query, setQuery }: { query: string; setQuery: (s: string) => void }) {
  return (
    <input
      placeholder="Tìm theo tên..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ padding: 8, width: 300 }}
    />
  );
}
