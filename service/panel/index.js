const {
  delay,
  ServiceBusClient,
  ServiceBusMessage,
} = require("@azure/service-bus");

require("dotenv").config();

// connection string to your Service Bus namespace
const connectionString = process.env.ServiceBus;

async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // createReceiver() can also be used to create a receiver for a subscription.
  const receiver = sbClient.createReceiver("hrttopic", "HrtSubs");

  const myMessageHandler = async (messageReceived) => {
    console.log(`Received message: ${JSON.stringify(messageReceived.body)}`);
  };

  // function to handle any errors
  const myErrorHandler = async (error) => {
    console.log(error);
  };

  // subscribe and specify the message and error handlers
  receiver.subscribe({
    processMessage: myMessageHandler,
    processError: myErrorHandler,
  });

  process.on("SIGINT", async function () {
    console.log("Caught interrupt signal");

    await receiver.close();
    await sbClient.close();

    process.exit();
  });
}

main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
