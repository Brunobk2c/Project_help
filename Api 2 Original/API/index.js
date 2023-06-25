// ------------------------------------------------------------ Importações Externas ------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

// ------------------------------------------------------------ Importações Internas ------------------------------------------------------------
const passport = require("./src/middlewares/passport"); // Update the import statement

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./controllers/swagger-controller");
const router = require("./src/routes/Routes");
const db = require("./db/models");

// ------------------------------------------------------------ Instânciação ------------------------------------------------------------
const app = express();
const sessionOptions = {
  secret: "my top secret key",
  resave: false,
  saveUninitialized: true,
};

// ------------------------------------------------------------ cors/passport/bodyparser ------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));

// ------------------------------------------------------------ endpoints docs ------------------------------------------------------------

app.get("/docs/swagger.json", (req, res) => res.json(swaggerSpec));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ------------------------------------------------------------ utilização rotas ------------------------------------------------------------
app.use(router); // to use the routes

// start server
app.listen(8080, function () {
  console.log(`App running on http://localhost:8080`);
});
