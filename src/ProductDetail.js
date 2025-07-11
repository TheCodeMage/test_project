import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ height: '200px' }} />
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <Link to="/">Back to products</Link>
    </div>
  );
}

export default ProductDetail;
