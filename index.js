require("dotenv").config();
// require("dotenv").config({ path: ".env" });
const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const tomeRoutes = require("./routes/tome");

const app = express();
app.use(formidableMiddleware());
app.use(morgan("dev"));
app.use(userRoutes);
app.use(bookRoutes);
app.use(tomeRoutes);
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get("/", (req,res) => {res.status(200).json("Bienvenue sur l'api de l'extraordinaire plus grand petit theatre d'ombres du monde");});

app.all("*", (req,res) => {res.status(404).json("Page not found");});

app.listen(process.env.PORT, () => {console.log("Server started");});