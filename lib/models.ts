import mongoose from "mongoose";

// User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Task schema with a reference to the user
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // reference to User
});

// Models (check if they exist to prevent overwriting)
const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export { User, Task };
