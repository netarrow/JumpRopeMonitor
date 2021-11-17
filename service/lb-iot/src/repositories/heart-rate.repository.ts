import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { LocaldbDataSource } from '../datasources';
import { HeartRate, HeartRateRelations } from '../models';

const { Message, Client } = require("azure-iot-device");
var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;

require('dotenv').config()

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

  traceIoTHub(connectionString: string, hrt: number) {
    var client = clientFromConnectionString(connectionString);
    var targetDevice = "HRTDevice";
    var payload = JSON.stringify({
        deviceId: targetDevice,
        location: 'galaxy',
        sensorType: 'rate',
        sensorValue: hrt
    });
    
    // Create the message based on the payload JSON
    var message = new Message(payload);
    
    // For debugging purposes, write out the message payload to the console
    console.log('Sending message: ' + message.getData());
    
    // Send the message to Azure IoT Hub
    client.sendEvent(message, () => console.log('sent: ' + hrt));
  }

  create(hrt: Omit<HeartRate, 'timestamp'>): Promise<HeartRate> {
    var connectionString = process.env.IOTHUB_CONNECTION_STRING;
    if (!connectionString) {
      console.log('Please set the IOTHUB_CONNECTION_STRING environment variable.');
      process.exit(-1);
    } 
    console.log(hrt.Rate)
    this.traceIoTHub(connectionString, hrt.Rate)
    return super.create(hrt);
  }

}
