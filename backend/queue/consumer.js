const amqp = require('amqplib');
const mail = require('../mail/index');

const rabbitMQUrl = 'amqp://rabbitmq';
const queueName = 'email_queue';

const queueController = {

    createQueue: (users) => {

        console.log("Criado Queue...");

        amqp.connect(rabbitMQUrl, (error, connection) => {
            if (error) {
                console.error(error);
                return;
            }

            connection.createChannel((error, channel) => {
                if (error) {
                    console.error(error);
                    return;
                }

                channel.assertQueue(queueName);
                channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ users })));

                channel.close();
                connection.close();

                return;
            });
        });
    },
    consumeQueue: () => {
        amqp.connect(rabbitMQUrl, (error, connection) => {
            
            

            if (error) {
                console.error(error);
                return;
            }

            connection.createChannel((error, channel) => {
                if (error) {
                    console.error(error);
                    return;
                }

                channel.assertQueue(queueName);
                channel.consume(queueName, (users) => {

                    console.log("Message: " + users);
                    mail.sendEmail(users);

                    channel.ack(message);
                });
            });
        });
    }
}

module.exports = queueController;