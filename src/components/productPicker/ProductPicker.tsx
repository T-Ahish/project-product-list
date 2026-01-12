import type { Product, Variant } from "../../utils/products.interface";
import type { FetchProducts } from "../../utils/fetchProducts.interface";
import "./ProductPickerStyles.css";

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
    <section className="picker">
      <div className="pickerList" onScroll={handleScroll}>
        {products.map((p) => (
          <div key={p.id} className="product">
            <div className="productHeader">
              <input
                type="checkbox"
                checked={selectedProducts.includes(p.id)}
                onChange={(e) => handleAddProducts(e, p)}
              />

              <img src={p.image.src} />

              <span className="productTitle">{p.title}</span>
            </div>

            {p.variants.map((v) => (
              <div key={v.id} className="variant">
                <input
                  type="checkbox"
                  checked={selectedVariants.includes(v.id)}
                  onChange={(e) => handleAddVariants(e, v, p)}
                />

                <span className="variantTitle">{v.title}</span>

                <span className="variantPrice">${v.price}</span>
              </div>
            ))}
          </div>
        ))}

        {loading && <p className="status">Loading...</p>}
        {!hasMore && <p className="status">No more products</p>}
      </div>
    </section>
  );
};

export default ProductPicker;
