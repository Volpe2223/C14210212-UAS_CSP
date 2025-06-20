'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '../../lib/auth';
import ProductForm from '../../components/ProductForm';
import ProductTable from '../../components/ProductTable';
import styles from '../../styles/Dashboard.module.css';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nama_produk: '', harga_satuan: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/signin');
    } else {
      setUser(currentUser);
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3001/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    setError('');
    const { nama_produk, harga_satuan, quantity } = newProduct;
    if (!nama_produk || !harga_satuan || !quantity) {
      setError('Semua field produk harus diisi');
      return;
    }
    const payload = { ...newProduct, harga_satuan: Number(harga_satuan), quantity: Number(quantity) };
    if (isEditing) {
      await fetch(`http://localhost:3001/products/${editingProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setIsEditing(false);
      setEditingProductId(null);
    } else {
      await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    setNewProduct({ nama_produk: '', harga_satuan: '', quantity: '' });
    fetchProducts();
  };

  const handleEdit = (prod) => {
    setIsEditing(true);
    setEditingProductId(prod.id);
    setNewProduct({ nama_produk: prod.nama_produk, harga_satuan: prod.harga_satuan, quantity: prod.quantity });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleLogout = () => {
    logout();
    router.push('/signin');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>Welcome, {user.username}</h1>
      <button onClick={handleLogout}>Logout</button>
      {user.role === 'admin' && (
        <ProductForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          isEditing={isEditing}
          onSubmit={handleAddOrUpdateProduct}
          error={error}
        />
      )}
      <ProductTable
        products={products}
        isAdmin={user.role === 'admin'}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
