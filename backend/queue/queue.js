const amqp = require("amqplib/callback_api");

function connect() {
    return amqp.connect(`amqp://127.0.0.1`, (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }
        });
    });
}

function createQueue(channel, queue) {
    return new Promise((resolve, reject) => {
        try {
            channel.assertQueue(queue, { durable: true });
            resolve(channel);
        } catch (error) {
            reject(error);
        }
    });
}

function sendToQueue(queue, message) {
    connect()
        .then((channel) => createQueue(channel, queue))
        .then((channel) =>
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
        )
        .catch((error) => console.log(error));
}

function consume(queue, callback) {
    connect()
        .then((channel) => createQueue(channel, queue))
        .then((channel) =>
            channel.consume(queue, (callback) => {
                console.log("Recived: " + callback.content.toString());
                channel.ack(message);
            })
        )
        .catch((error) => console.log(error));
}

module.exports = {
    sendToQueue,
    consume,
};
