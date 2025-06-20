import styles from '../styles/Dashboard.module.css';

export default function ProductForm({
  newProduct,
  setNewProduct,
  isEditing,
  error,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.productForm}>
      <input
        type="text"
        placeholder="Nama Produk"
        value={newProduct.nama_produk}
        onChange={(e) =>
          setNewProduct({ ...newProduct, nama_produk: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Harga Satuan"
        value={newProduct.harga_satuan}
        onChange={(e) =>
          setNewProduct({ ...newProduct, harga_satuan: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) =>
          setNewProduct({ ...newProduct, quantity: e.target.value })
        }
      />
      <button type="submit">
        {isEditing ? 'Update Produk' : 'Tambah Produk'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
