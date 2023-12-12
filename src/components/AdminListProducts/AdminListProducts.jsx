import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './AdminListProducts.module.css';
import baseUrl from '../../utils/baseUrl.json';

const AdminListProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true); // Activa el indicador de carga
        fetch(`${baseUrl.url}/products`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false); // Desactiva el indicador de carga
            })
            .catch((err) => {
                console.error('Error al cargar productos', err);
                setLoading(false); // Desactiva el indicador de carga incluso en caso de error
            });
    }, []);

    const handleEdit = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    const handleDelete = (productId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                const jwt = JSON.parse(localStorage.getItem('jwt'));
                fetch(`${baseUrl.url}/products/delete/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    }
                })
                    .then(() => {
                        setProducts(products.filter((product) => product.id !== productId));
                        Swal.fire(
                            'Eliminado!',
                            'El producto ha sido eliminado.',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.error('Error al eliminar producto', err);
                        Swal.fire(
                            'Error!',
                            'Hubo un problema al eliminar el producto.',
                            'error'
                        )
                    });
            }
        });
    };

    if (loading) {
        return <p className={styles.cargandoProductos}>Cargando productos...</p>;
    }

    return (
        <div className={styles.container}>
            <h2>Productos: </h2>
            <div className={styles.productListContainer}>
            <table className={styles.productListTable}>
                <thead>
                <tr>
                    <th>ID</th>

                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.address}</td>
                    <td>{product.name}</td>

                    <td>
                        <button
                        className={styles.editButton}
                        onClick={() => handleEdit(product.id)}
                        >
                        Editar
                        </button>
                        <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(product.id)}
                        >
                        Eliminar
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
      </div>
        </div>
    );
};

export default AdminListProducts;