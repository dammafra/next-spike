import { Navigate, Route, Routes } from 'react-router-dom';
import { CarForm, CarsList } from './cars';

export function App() {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to="cars" />} />
      <Route path="cars">
        <Route index element={<CarsList />} />
        <Route path="add" element={<CarForm />} />
        <Route path=":id" element={<CarForm />} />
      </Route>
    </Routes>
  );
}

export default App;
