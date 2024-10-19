import React from 'react';

interface Reservation {
    id: number;
    name: string;
    date: string;
}

interface ReservationListProps {
    reservations: Reservation[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
    return (
        <div>
            <h2>Reservation List</h2>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        {reservation.name} - {reservation.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;