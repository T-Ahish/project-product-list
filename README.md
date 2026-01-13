## E-Commerce Product List

This project is designed for e-commerce store owners to manage their product listings effectively. Below are the components and functionalities implemented.

### Components

#### 1. Product List

- Displays a list of selected products.
- Supports multiple variants for each product.
- Allows adding discounts (flat or percentage) to products or variants.
- Provides an option to remove products, with restrictions based on the number of products in the list.

#### 2. Product Picker

- A dialog box that fetches and displays products from the store.
- Allows selection of multiple products and variants.
- Implements scroll-based pagination to load products in batches.

#### 3. Add Product Button

- A button to add a new product to the end of the list.

### Definitions

- **Product**: An item for sale, including a name, image, and variants (e.g., Sports Shoes).
- **Product Variant**: An optional variation of a product (e.g., sizes and colors).

### API Documentation

- **Get Products API**
  - **URL**: [Get Products](https://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1)
  - **HTTP Method**: GET
  - **Query Params**: Search term, page number, and limit.

### Local Development

- A local JSON data structure simulates the API for development purposes.
- Promises are used to mimic API calls for fetching product data.

### Repository

- The complete code is available in the public GitHub repository: [GitHub Repository Link](https://github.com/T-Ahish/project-product-list)
