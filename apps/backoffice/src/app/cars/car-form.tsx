import { Car } from '@next-spike/models';
import axios from 'axios';
import { useDeferredValue, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function CarForm() {
  const [model, setModel] = useState('');
  const _model = useDeferredValue(model);

  const [color, setColor] = useState('');
  const _color = useDeferredValue(color);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios
        .get(`http://localhost:3333/api/cars/${params.id}`)
        .then((res) => res.data as Car)
        .then((car) => {
          setModel(car.model);
          setColor(car.color);
        })
        .catch(alert);
    }
  }, [params]);

  function handleSave() {
    const req = params.id
      ? axios.put(`http://localhost:3333/api/cars/${params.id}`, {
          model: _model,
          color: _color,
        })
      : axios.post('http://localhost:3333/api/cars', {
          model: _model,
          color: _color,
        });

    req.then(() => navigate('..')).catch(alert);
  }

  return (
    <div>
      <input
        placeholder="Model"
        value={_model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        placeholder="Color"
        value={_color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button disabled={!_model || !color} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default CarForm;
