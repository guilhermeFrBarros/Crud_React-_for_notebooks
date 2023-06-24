const { Party } = require("../models/Party");
const { User } = require("../models/User");
const consumer = require("../queue/consumer");
const amqp = require("amqplib");


const queueName = "email_queue";

const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
            };
            const response = await Party.create(party);

            console.log("Consultou o banco! POST");
            res.status(201).json({
                response,
                msg: "Festa criada com sucesso.",
            });
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    getAll: async (req, res) => {
        try {
            const parties = await Party.find();

            console.log("Consultou o banco! GETALL");
            res.json(parties);
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    get: async (req, res) => {
        try {
            // ToDo -> Paginação
            // mudar para POST e passar no body: title: {string}, limit: {number}, skip: {number},

            const title = req.params.title;
            // i = ignore caseSensitive
            const partie = await Party.find({
                title: { $regex: title, $options: "i" },
            })
                .limit(30)
                .skip(0);

            if (!partie) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            console.log("Consultou o banco! GET BY ID");
            res.json(partie);
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const party = await Party.findById(id);

            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            const deletedParty = await Party.findByIdAndDelete(id);

            console.log("Consultou o banco! DELETE");
            res.status(200).json({
                deletedParty,
                msg: "Festa deletada com sucesso.",
            });
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
            };

            const response = await Party.findByIdAndUpdate(id, party, {
                new: true,
            });

            if (!response) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            console.log("Consultou o banco! UPDATE");
            res.status(200).json({
                response,
                msg: "Festa atualizada com sucesso.",
            });
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    },
};

module.exports = partyController;
