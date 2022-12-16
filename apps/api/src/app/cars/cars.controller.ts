import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Car } from './car.model';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getData() {
    return this.carsService.getData();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) carId: number) {
    return this.carsService.getOne(carId);
  }

  @Post()
  addData(@Body() car: Omit<Car, 'id'>) {
    return this.carsService.addData(car);
  }

  @Put(':id')
  updateData(@Param('id', new ParseIntPipe()) carId: number, @Body() car: Car) {
    return this.carsService.updateData(carId, car);
  }

  @Delete(':id')
  deleteData(@Param('id', new ParseIntPipe()) carId: number) {
    return this.carsService.deleteData(carId);
  }
}
