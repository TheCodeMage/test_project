import React, { useEffect, useState } from 'react';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>FakeStore Products</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map((product) => (
                    <li key={product.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <h2>{product.title}</h2>
                        <img src={product.image} alt={product.title} style={{ height: '100px' }} />
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
