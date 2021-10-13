import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {HeartRate} from '../models';
import {HeartRateRepository} from '../repositories';

export class HeartRateController {
  constructor(
    @repository(HeartRateRepository)
    public heartRateRepository : HeartRateRepository,
  ) {}

  @post('/hrt')
  @response(200, {
    description: 'HeartRate model instance',
    content: {'application/json': {schema: getModelSchemaRef(HeartRate)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HeartRate, {
            title: 'NewHeartRate',
            exclude: ['timestamp'],
          }),
        },
      },
    })
    heartRate: Omit<HeartRate, 'timestamp'>,
  ): Promise<HeartRate> {
    heartRate.timestamp = + new Date() // + is a trick to convert date to timestamp
    console.log('get hrt')
    return this.heartRateRepository.create(heartRate);
  }

  @get('/hrt/count')
  @response(200, {
    description: 'HeartRate model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HeartRate) where?: Where<HeartRate>,
  ): Promise<Count> {
    return this.heartRateRepository.count(where);
  }

  @get('/hrt')
  @response(200, {
    description: 'Array of HeartRate model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HeartRate, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HeartRate) filter?: Filter<HeartRate>,
  ): Promise<HeartRate[]> {
    return this.heartRateRepository.find(filter);
  }

  @patch('/hrt')
  @response(200, {
    description: 'HeartRate PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HeartRate, {partial: true}),
        },
      },
    })
    heartRate: HeartRate,
    @param.where(HeartRate) where?: Where<HeartRate>,
  ): Promise<Count> {
    return this.heartRateRepository.updateAll(heartRate, where);
  }

  @get('/hrt/{id}')
  @response(200, {
    description: 'HeartRate model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HeartRate, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HeartRate, {exclude: 'where'}) filter?: FilterExcludingWhere<HeartRate>
  ): Promise<HeartRate> {
    return this.heartRateRepository.findById(id, filter);
  }

  @patch('/hrt/{id}')
  @response(204, {
    description: 'HeartRate PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HeartRate, {partial: true}),
        },
      },
    })
    heartRate: HeartRate,
  ): Promise<void> {
    await this.heartRateRepository.updateById(id, heartRate);
  }

  @put('/hrt/{id}')
  @response(204, {
    description: 'HeartRate PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() heartRate: HeartRate,
  ): Promise<void> {
    await this.heartRateRepository.replaceById(id, heartRate);
  }

  @del('/hrt/{id}')
  @response(204, {
    description: 'HeartRate DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.heartRateRepository.deleteById(id);
  }
}
