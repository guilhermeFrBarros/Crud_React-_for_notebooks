const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
// ----------
const fs = require("fs");
const https = require("https");


require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./models/User");

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
  console.log(token);
  if (!token) {
    return next(new Error("Token de autenticação não fornecido."));
  }

  // Verifique e decodifique o token JWT
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return console.log(("Token de autenticação inválido."));
    }

    // Anexar informações do usuário decodificadas ao objeto de conexão do socket
    socket.user = decoded;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("Usuario conectadado", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Usuario Desconectado", socket.id);
  });

  socket.on("set_emailUser", (userEmail) => {
    socket.data.userEmail = userEmail;
  });
});

// DB Connection
const conn = require("./db/conn");

// Routes
const routes = require("./routes/router");
app.use("/api", routes);



// Registro de Usuário
app.post("/users", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Validações
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
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
    res
      .status(500)
      .json({ msg: "Erro no servidor, tente novamente mais tarde!" });
  }
});

// Login User
app.post("/session", async (req, res) => {
  const { email, password } = req.body;

  // Validações
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
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
    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    console.log(`Erro: ${error}`);
    // Status 500 -> Erro interno no servidor
    res
      .status(500)
      .json({ msg: "Erro no servidor, tente novamente mais tarde!" });
  }
});

// app.listen(3000, function () {
//   console.log(" ======== SERVIDOR ONLINE ======== ");
//   conn();
// });
