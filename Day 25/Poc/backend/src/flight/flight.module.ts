import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller.js';
import { FlightService } from './flight.service.js';

@Module({
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
