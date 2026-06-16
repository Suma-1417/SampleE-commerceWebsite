import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="products-container">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-container">
        <p className="error">{error}</p>
      </div>
    );
  }

  // read query params for search and category
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").toLowerCase();
  const category = searchParams.get("category") || "all";

  const filtered = products.filter((p) => {
    const matchesQuery = q ? p.title.toLowerCase().includes(q) : true;
    const matchesCategory =
      category && category !== "all" ? p.category === category : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      {(q || (category && category !== "all")) && (
        <p>
          Showing results {q ? `for "${q}"` : ""}{" "}
          {category && category !== "all" ? `in ${category}` : ""}
        </p>
      )}
      <div className="products-grid">
        {filtered.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
