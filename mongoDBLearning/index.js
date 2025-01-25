const express = require("express");
const { JWT_SECRET, auth, jwt } = require("./middlewares/auth");
const { userModel, todoModel, connectToDatabase } = require("./db");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({ email: email });

  if (user) {
    res.status(403).send({
      message: "Email is not unique",
    });
  } else {
    userModel.create({
      name,
      email,
      password,
    });
    res.send({
      message: "You have signed up successfully",
    });
  }
});

app.post("/signin", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
    password: password,
    name: name,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );

    res.send({
      token,
    });
  } else {
    res.status(403).send({
      message: "Credentials are incorrect",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const title = req.body.title;
  const done = req.body.done;
  const userId = req.body.id;

  try {
    await todoModel.create({
      userId,
      title,
      done,
    });

    res.send({
      message: "Todos sent successfully",
    });
  } catch {
    res.send({
      message: "Server crashed",
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  try {
    const todos = await todoModel.find({});
    res.send(todos);
  } catch {
    res.send({
      message: "Server crashed",
    });
  }
});

async function startServer() {
  await connectToDatabase();
  app.listen(3000);
}

startServer();
