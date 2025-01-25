const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

async function connectToDatabase() {
  await mongoose.connect(
    "mongodb+srv://aatishmongodb:Sourav1stCiena@cluster0.kcfiu.mongodb.net/mongoDbTest?retryWrites=true&w=majority&appName=Cluster0"
  );
}

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const todoSchema = new Schema({
  userId: ObjectId,
  title: String,
  done: Boolean,
});

const userModel = mongoose.model("user", userSchema);
const todoModel = mongoose.model("todos", todoSchema);

module.exports = {
  userModel,
  todoModel,
  connectToDatabase,
};
