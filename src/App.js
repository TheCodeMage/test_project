import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';

function App() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products
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

        // Fetch categories
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch(() => {
                // Ignore category fetch errors
            });
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        selectedCategory === 'all' ? true : product.category === selectedCategory
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Router>
            <div style={{ padding: '20px' }}>
                <h1>FakeStore Products</h1>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div style={{ marginBottom: '20px' }}>
                                    <label>
                                        Filter by category:{' '}
                                        <select value={selectedCategory} onChange={handleCategoryChange}>
                                            <option value="all">All</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label style={{ marginLeft: '20px' }}>
                                        Sort by price:{' '}
                                        <select value={sortOrder} onChange={handleSortOrderChange}>
                                            <option value="asc">Low to High</option>
                                            <option value="desc">High to Low</option>
                                        </select>
                                    </label>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {sortedProducts.map((product) => (
                                        <li
                                            key={product.id}
                                            style={{
                                                marginBottom: '20px',
                                                borderBottom: '1px solid #ccc',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            <h2>
                                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                                            </h2>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                style={{ height: '100px' }}
                                            />
                                            <p>{product.description}</p>
                                            <p>
                                                <strong>Price:</strong> ${product.price}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        }
                    />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
