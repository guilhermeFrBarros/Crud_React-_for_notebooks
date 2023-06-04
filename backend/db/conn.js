const mongoose = require("mongoose");
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

async function main() {
    try {
        // maxPoolSize -> Pool de conexões 
        // socketTimeoutMS -> Fecha a conexão após 45 segundos de inatividade
        await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPass}@cluster0.wpemlmw.mongodb.net/test`, { maxPoolSize: 5, socketTimeoutMS: 45000 }
        )

        console.log(" ======== CONECTADO AO BD ======== ");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;
