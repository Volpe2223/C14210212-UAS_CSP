import styles from '../styles/Dashboard.module.css';

export default function ProductTable({
  products,
  isAdmin,
  onEdit,
  onDelete,
}) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nama Produk</th>
          <th>Harga Satuan</th>
          <th>Quantity</th>
          {isAdmin && <th>Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.nama_produk}</td>
            <td>{prod.harga_satuan}</td>
            <td>{prod.quantity}</td>
            {isAdmin && (
              <td>
                <button onClick={() => onEdit(prod)}>Edit</button>{' '}
                <button onClick={() => onDelete(prod.id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
