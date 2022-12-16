import { Car } from '@next-spike/models';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();

  useEffect(init, []);

  function init() {
    axios
      .get('http://localhost:3333/api/cars')
      .then((res) => res.data)
      .then(setCars)
      .catch(alert);
  }

  function handleDelete(carId: number) {
    axios
      .delete(`http://localhost:3333/api/cars/${carId}`)
      .then(init)
      .catch(alert);
  }

  return (
    <>
      <h1>Cars List</h1>
      <button onClick={() => navigate('./add')}>Add New Car</button>
      <ul>
        {cars.map((c) => (
          <li key={c.id}>
            {c.id}: {c.color} {c.model}
            <button onClick={() => handleDelete(c.id)}>Delete</button>
            <button onClick={() => navigate(`./${c.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CarsList;
