import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocaldbDataSource} from '../datasources';
import {HeartRate, HeartRateRelations} from '../models';

export class HeartRateRepository extends DefaultCrudRepository<
  HeartRate,
  typeof HeartRate.prototype.timestamp,
  HeartRateRelations
> {
  constructor(
    @inject('datasources.localdb') dataSource: LocaldbDataSource,
  ) {
    super(HeartRate, dataSource);
  }
}
