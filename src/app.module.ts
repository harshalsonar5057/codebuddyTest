import { Module } from '@nestjs/common';
import { CalcModule } from './calc/calc.module';

@Module({
  imports: [CalcModule],
})
export class AppModule {}
