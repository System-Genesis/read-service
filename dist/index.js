"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const menashmq_1 = require("menashmq");
const server_1 = require("./express/server");
const config_1 = require("./config");
const { mongo, rabbit, service } = config_1.default;
const initializeMongo = async () => {
    console.log('Connecting to Mongo...');
    await mongoose.connect(mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
    console.log('Mongo connection established');
};
const initializeRabbit = async () => {
    console.log('Connecting to Rabbit...');
    await menashmq_1.default.connect(rabbit.uri, rabbit.retryOptions);
    console.log('Rabbit connected');
    const featureConsumeFunction = (msg) => {
        console.log('Received message: ', msg.getContent());
    };
    await menashmq_1.default.declareTopology({
        queues: [{ name: 'feature-queue', options: { durable: true } }],
        exchanges: [{ name: 'feature-exchange', type: 'fanout', options: { durable: true } }],
        bindings: [{ source: 'feature-exchange', destination: 'feature-queue' }],
        consumers: [{ queueName: 'feature-queue', onMessage: featureConsumeFunction }],
    });
    console.log('Rabbit initialized');
};
const main = async () => {
    await initializeMongo();
    await initializeRabbit();
    const server = new server_1.default(service.port);
    await server.start();
    console.log(`Server started on port: ${service.port}`);
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map