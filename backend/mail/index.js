const nodemailer = require('nodemailer');
const amqp = require('amqplib');

const rabbitMQUrl = 'amqp://rabbitmq';
const queueName = 'email_queue';

const emailService = {

    sendEmail: async (users) => {

        const emails = separeEmail(users);
        const account = await nodemailer.createTestAccount();

        const transport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        await transport.sendMail({
            from: 'noreplay@partytime.com.br',
            to: [...emails],
            subject: 'Party Time',
            html: '<p>Olá, você possui uma nova festa para ir!</p>',
            text: 'Olá, você possui uma nova festa para ir!'
        });

    }
};

function separeEmail(users) {

    let emails = [];

    users.forEach((user) => {
        emails.push(user.email);
    });
    console.log("Emails to send: " + emails);
    return emails;
}

module.exports = emailService;