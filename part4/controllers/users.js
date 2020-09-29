const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("notes", {
      content: 1,
      date: 1,
    });
    response.json(users.map((user) => user.toJSON()));
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();

    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
