import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Visitor {
  @Prop({
    required: true,
  })
  domain: string;

  @Prop({
    required: true,
  })
  path: string;

  @Prop({ required: true })
  browser: string;

  @Prop({ required: true })
  os: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: false })
  city: string;

  @Prop({ type: [Number] })
  ll: [number];

  @Prop({ required: false })
  timezone: string;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
