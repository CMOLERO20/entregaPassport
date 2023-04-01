const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const viewsRoutes = require("./routes/views.routes");
const productRoutes = require("./routes/product.routes");
const sessionRoutes = require("./routes/session.routes");
const mongoStore = require("connect-mongo");
const authMdw = require("./middleware/auth.middleware");
const passport = require("passport");
const { initialize } = require("passport");
const initializePassport = require("./config/passport.config");


const app = express();

const PORT = 8080;
const DB_HOST = "moleroclara";
const DB_PASS = "sACX84ls8aNWvIPA";
const DB_NAME = "ecommerce";

const MONGO_URL = `mongodb+srv://${DB_HOST}:${DB_PASS}@cluster0.e2pbfnu.mongodb.net/${DB_NAME}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 3600,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const connection = mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:18 ~ CONECTADO!:");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:20 ~ err:", err);
  });

app.use("/", viewsRoutes);
app.use("/api/session/", sessionRoutes);
app.use("/api/products/", productRoutes)

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});