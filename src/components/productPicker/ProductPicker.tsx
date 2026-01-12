import type { Product, Variant } from "../../utils/products.interface";
import type { FetchProducts } from "../../utils/fetchProducts.interface";

const ProductPicker = ({
  selectedProducts,
  setSelectedProducts,
  selectedVariants,
  setSelectedVariants,
  products,
  loading,
  hasMore,
  loadNextPage,
}: FetchProducts) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 20 && hasMore && !loading) {
      loadNextPage();
    }
  };

  const handleAddProducts = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: Product
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedProducts((prev) => [...prev, product.id]);
      setSelectedVariants((prev) => [
        ...prev,
        ...product.variants.map((v) => v.id),
      ]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== product.id));
      setSelectedVariants((prev) =>
        prev.filter((id) => !product.variants.some((v) => v.id === id))
      );
    }
  };

  const handleAddVariants = (
    e: React.ChangeEvent<HTMLInputElement>,
    variant: Variant,
    product: Product
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedVariants((prev) => [...prev, variant.id]);
      if (!selectedProducts.includes(product.id)) {
        setSelectedProducts((prev) => [...prev, product.id]);
      }
    } else {
      setSelectedVariants((prev) => prev.filter((id) => id !== variant.id));
      const remaining = product.variants.some(
        (v) => selectedVariants.includes(v.id) && v.id !== variant.id
      );
      if (!remaining) {
        setSelectedProducts((prev) => prev.filter((id) => id !== product.id));
      }
    }
  };

  return (
    <section
      style={{ maxHeight: "400px", overflowY: "auto" }}
      onScroll={handleScroll}
    >
      {products.map((p) => (
        <div
          key={p.id + 10}
          style={{
            display: "flex",
            gap: "10px",
            padding: "8px",
            borderBottom: "1px solid #eee",
          }}
        >
          <input
            type="checkbox"
            checked={selectedProducts.includes(p.id)}
            onChange={(e) => handleAddProducts(e, p)}
          />
          <img src={p.image.src} width="50" />
          <div>
            <h3>{p.title}</h3>
            {p.variants.map((v) => (
              <div key={v.id + 100}>
                <input
                  type="checkbox"
                  checked={selectedVariants.includes(v.id)}
                  onChange={(e) => handleAddVariants(e, v, p)}
                />
                <h4>{v.title}</h4>
                <h4>${v.price}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more products</p>}
    </section>
  );
};

export default ProductPicker;
