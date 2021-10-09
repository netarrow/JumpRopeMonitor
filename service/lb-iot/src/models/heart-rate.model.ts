import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class HeartRate extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  Rate: number;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  timestamp: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<HeartRate>) {
    super(data);
  }
}

export interface HeartRateRelations {
  // describe navigational properties here
}

export type HeartRateWithRelations = HeartRate & HeartRateRelations;
