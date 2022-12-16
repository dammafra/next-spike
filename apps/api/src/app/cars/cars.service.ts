import { Injectable } from '@nestjs/common';
import { Car } from '@next-spike/models';

@Injectable()
export class CarsService {
  private data: Car[] = [
    { id: 1, model: 'tesla', color: 'white' },
    { id: 2, model: 'ferrari', color: 'red' },
  ];

  getData() {
    return this.data;
  }

  getOne(carId: number) {
    return this.data.find((c) => c.id === carId);
  }

  addData(car: Omit<Car, 'id'>) {
    const newCar: Car = {
      ...car,
      id: Math.max(...this.data.map((c) => c.id)) + 1,
    };
    this.data.push(newCar);
    return newCar;
  }

  updateData(carId: number, car: Omit<Car, 'id'>) {
    this.data = this.data.map((c) =>
      c.id === carId ? { id: carId, ...car } : c
    );
    return car;
  }

  deleteData(carId: number) {
    this.data = this.data.filter((c) => c.id !== carId);
  }
}
