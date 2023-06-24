const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");
const moment = require("moment-timezone");
const expressSanitizer = require("express-sanitizer");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./models/User");
require("dotenv").config();

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "./logs/all_logs.log"),
    { flags: "a" }
);

const httpsOptions = {
    cert: fs.readFileSync("./SSL/certificado.crt"),
    key: fs.readFileSync("./SSL/chave_privada.key"),
};
const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(3000, () => {
    console.log("======== SERVIDOR HTTPS ONLINE ========");
    conn();
});

// Sockets
const ServerHttpIo = require("socket.io").Server;
const io = new ServerHttpIo(httpsServer, {
    cors: { origin: "http://localhost:5173" },
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    //console.log(token);
    if (!token) {
        return "Token de autenticação não fornecido.";
    }

    // Verifica token JWT
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return console.log("Token de autenticação inválido.");
        }
        socket.user = decoded;
        next();
    });
});

// eventos 
io.on("connection", (socket) => {
    console.log("Usuario conectadado", socket.id);

    socket.on("disconnect", (reason) => {
        console.log("Usuario Desconectado", socket.id);
    });

    socket.on("set_emailUser", (userEmail) => {
        socket.data.userEmail = userEmail;
    });

    socket.on( "message", text => {
        
        io.emit( "receive_message", {
            text,
            authorId: socket.id,
            author: socket.data.userEmail
        })
    })

});




app.use(expressSanitizer());
app.use(
    morgan(
        (tokens, req, res) => {
            const timestamp = moment()
                .tz("America/Sao_Paulo")
                .format("YYYY-MM-DD HH:mm:ss");

            const logLine = [
                timestamp,
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens["user-agent"](req, res),
            ].join(" ");
            return logLine;
        },
        {
            stream: accessLogStream,
            skip: (req, res) => {
                return res.statusCode < 400;
            },
        }
    )
);

app.use(cors());
app.use(express.json());

// DB Connection
const conn = require("./db/conn");

// Routes
const routes = require("./routes/router");
app.use("/api", routes);

// Registro de Usuário
app.post(
    "/users",
    [
        body("email")
            .isEmail()
            .withMessage("Informe um endereço de email válido!"),
        body("password").notEmpty().withMessage("A senha não pode ser vazia!"),
        body("confirmPassword")
            .notEmpty()
            .withMessage("A confirmação de senha não pode ser vazia!"),
    ],
    async (req, res) => {
        const email = req.sanitize(req.body.email);
        const password = req.sanitize(req.body.password);
        const confirmPassword = req.sanitize(req.body.confirmPassword);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        if (password !== confirmPassword) {
            return res.status(422).json({ msg: "As senhas não conferem!" });
        }

        // Verificando se o usuário existe
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ msg: "Favor, utilize outro email!" });
        }

        // Criando senha
        // Gerando caracteres aleatórios
        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(password, salt);

        // Criando usuário
        const user = new User({
            email,
            password: hashPass,
        });

        try {
            await user.save();

            // Status 201 -> Algo foi registrado no banco de dados
            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        } catch (error) {
            console.log(`Erro: ${error}`);
            // Status 500 -> Erro interno no servidor
            res.status(500).json({
                msg: "Erro no servidor, tente novamente mais tarde!",
            });
        }
    }
);

// Login User
app.post(
    "/session",
    [
        body("email")
            .isEmail()
            .withMessage("Informe um endereço de email válido!"),
        body("password").notEmpty().withMessage("A senha não pode ser vazia!"),
    ],
    async (req, res) => {
        const email = req.sanitize(req.body.email);
        const password = req.sanitize(req.body.password);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        // Verificando se o usuário existe
        const user = await User.findOne({ email: email });

        if (!user) {
            // Status 404 -> Não encontrado
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // Verificando senha
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida!" });
        }

        try {
            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: user.id,
                },
                secret,
                {
                    //expiresIn: 300 // 5 Minutos
                }
            );
            // Satatus 200 -> Sucesso
            res.status(200).json({
                msg: "Autenticação realizada com sucesso!",
                token,
            });
        } catch (error) {
            console.log(`Erro: ${error}`);
            // Status 500 -> Erro interno no servidor
            res.status(500).json({
                msg: "Erro no servidor, tente novamente mais tarde!",
            });
        }
    }
);

app.post("/teste", (req, res, next) => {
    const sanitezedString = req.sanitize(req.body.email);

    res.send({ sanitized: sanitezedString });
});
