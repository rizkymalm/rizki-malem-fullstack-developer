import { Injectable } from '@nestjs/common';
import { VisitorDto } from './dto/visitor.dto';
import { IResult } from 'ua-parser-js';
import { InjectModel } from '@nestjs/mongoose';
import { Visitor } from './schemas/visitor.schema';
import { Model } from 'mongoose';
import { GeoLocationService } from '../common/utils/geolocation.service';

@Injectable()
export class VisitorService {
  constructor(
    private readonly geoLocation: GeoLocationService,
    @InjectModel(Visitor.name) private visitorModel: Model<Visitor>,
  ) {}

  public async saveVisitor(data: VisitorDto, userAgent: IResult, ip: string) {
    const location = await this.geoLocation.getLocation(ip);

    const visitor = new this.visitorModel({
      ...data,
      browser: userAgent.browser.name,
      os: userAgent.os.name,
      ipAddress: ip,
      userAgent: userAgent.ua,
      country: location.country,
      city: location.city,
      ll: location.ll,
      timezone: location.timezone,
    });

    return await visitor.save();
  }
}
