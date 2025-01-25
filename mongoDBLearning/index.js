const express = require("express");
const bcrypt = require("bcrypt");
const { JWT_SECRET, auth, jwt } = require("./middlewares/auth");
const { userModel, todoModel, connectToDatabase } = require("./db");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      res.status(403).send({
        message: "Email is not unique",
      });
    } else {
      const hashpassword = await bcrypt.hash(password, 5);
      userModel.create({
        name,
        email,
        password: hashpassword,
      });
      res.send({
        message: "You have signed up successfully",
      });
    }
  } catch (e) {
    res.send({
      message: "No response",
    });
  }
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await userModel.findOne({
      email: email,
    });

    const correctCredentials = bcrypt.compare(password, user.password);

    if (correctCredentials) {
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
  } catch (e) {
    res.send({
      message: "No response",
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
      message: "No response",
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  try {
    const todos = await todoModel.find({});
    res.send(todos);
  } catch {
    res.send({
      message: "No response",
    });
  }
});

async function startServer() {
  await connectToDatabase();
  app.listen(3000);
}

startServer();
