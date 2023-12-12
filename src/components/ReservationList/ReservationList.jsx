import React, { useEffect, useState } from 'react';
import styles from './ReservationList.module.css'; // Asegúrate de ajustar la ruta del import
import baseUrl from '../../utils/baseUrl.json';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };


    const handleDelete = (reservationId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarla!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseUrl.url}/reservations/delete/${reservationId}`, {
                    method: 'DELETE',
                    // Agrega aquí los headers necesarios, como tokens de autenticación
                })
                .then(() => {
                    setReservations(reservations.filter(reservation => reservation.id !== reservationId));
                    Swal.fire(
                        'Eliminada!',
                        'La reserva ha sido eliminada.',
                        'success'
                    );
                })
                .catch((error) => {
                    console.error('Error al eliminar la reserva:', error);
                    Swal.fire(
                        'Error!',
                        'Hubo un problema al eliminar la reserva.',
                        'error'
                    );
                });
            }
        });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            fetch(`${baseUrl.url}/reservations/user/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setReservations(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error al cargar reservas:', error);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return <p className={styles.loading}>Cargando reservas...</p>;
    }

    return (
        <div className={styles.reservationListContainer}>
            <h2>Mis Reservas</h2>
            <table className={styles.reservationTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Precio</th>

                        <th>Check-in</th>
                        <th>Check-out</th>
                        
                        <th>Comentarios</th>
                        <th>Herramientas</th>

                        {/* Agrega más encabezados según necesites */}
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>

                            <td onClick={() => handleProductClick(reservation.product.id)} style={{ cursor: 'pointer' , color: '#46354e'}}>
                                {reservation.product.address}
                            </td>
                            <td>{reservation.product.name}</td>

                            <td>{new Date(...reservation.check_in_date).toLocaleDateString()}</td>
                            <td>{new Date(...reservation.checkout_date).toLocaleDateString()}</td>
                            <td>{reservation.comments}</td>

                            <td>
                            <button
                                onClick={() => handleProductClick(reservation.product.id)}
                                className={styles.viewButton}
                            >
                                Ver Producto
                            </button>
                            <button
                                onClick={() => handleDelete(reservation.id)}
                                className={styles.deleteButton}
                            >
                                Eliminar
                            </button>
                            </td>
                            {/* Agrega más celdas según necesites */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationList;
