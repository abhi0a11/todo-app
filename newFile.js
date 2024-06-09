import { app, User } from "./app";

app.get("/users/all", async (req, res) => {
  const users = User.find();
  res.json({
    success: true,
    users,
  });
});
