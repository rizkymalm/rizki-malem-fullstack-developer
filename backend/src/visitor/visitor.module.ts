import { Module } from '@nestjs/common';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Visitor, VisitorSchema } from './schemas/visitor.schema';
import { GeoLocationService } from '../common/utils/geolocation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Visitor.name,
        schema: VisitorSchema,
      },
    ]),
  ],
  controllers: [VisitorController],
  providers: [VisitorService, GeoLocationService],
})
export class VisitorModule {}
