import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extensions } from './extensions.entity';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Extensions])],
  exports: [TypeOrmModule],
  providers: [ExtensionsService],
  controllers: [ExtensionsController],
})
export class ExtensionsModule {}