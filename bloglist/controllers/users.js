const usersRouter = require("express").Router();
const User = require("../models/users");
const bcrpyt = require("bcrypt");

//GET ALL

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });
    response.json(users.map((user) => user.toJSON()));
  } catch (error) {
    next(error);
  }
});

//POST

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const saltRounds = 10;

    if (body.password.length < 4) {
      response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" })
        .end();
    }

    const passwordHash = await bcrpyt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = usersRouter;
