import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productAPI";
import type { Product } from "../../services/productAPI";

const ProductPicker = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadProducts = async (pageNo: number): Promise<void> => {
    if (loading) return;

    setLoading(true);
    const res = await fetchProducts({ page: pageNo, limit: 10 });
    setProducts((prev) => [...prev, ...res.data]);
    setHasMore(res.hasMore);
    setLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 20 && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(nextPage);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    loadProducts(1);
  }, []);

  return (
    <div
      style={{ maxHeight: "400px", overflowY: "auto" }}
      onScroll={handleScroll}
    >
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            gap: "10px",
            padding: "8px",
            borderBottom: "1px solid #eee",
          }}
        >
          <img src={p.image.src} width="50" />
          <div>
            <strong>{p.title}</strong>
            <div>{p.variants.length} variants</div>
          </div>
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more products</p>}
    </div>
  );
};

export default ProductPicker;
