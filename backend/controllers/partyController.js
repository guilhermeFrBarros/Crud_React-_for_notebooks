const { Party } = require("../models/Party");

const partyController = {
    create: async (req, res) => {
        const title = req.sanitize(req.body.title);
        const author = req.sanitize(req.body.author);
        const description = req.sanitize(req.body.description);
        const budget = req.sanitize(req.body.budget);

        try {
            const party = {
                title: title,
                author: author,
                description: description,
                budget: budget,
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

            const title = req.sanitize(req.params.title);
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
            const id = req.sanitize(req.params.id);
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
            res.status(400).json({
                msg: "ID inválido.",
            });
            console.log(`Erro: ${error}`);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.sanitize(req.params.id);
            const title = req.sanitize(req.body.title);
            const author = req.sanitize(req.body.author);
            const description = req.sanitize(req.body.description);
            const budget = req.sanitize(req.body.budget);

            const party = {
                title: title,
                author: author,
                description: description,
                budget: budget,
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
