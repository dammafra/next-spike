import { Module } from '@nestjs/common';
import { CarsModule } from './cars';

@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
