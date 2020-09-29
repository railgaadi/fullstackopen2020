const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

//TOKEN MIDDLEWARE
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

//GET ALL

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes.map((note) => note.toJSON()));
});

//GET ONE

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

//POST

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "missing or invalid token" });
    }

    const user = await User.findById(decodedToken.id);

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
      user: user._id,
    });
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.status(201).json(savedNote.toJSON());
  } catch (exception) {
    next(exception);
  }
});

//DELETE

notesRouter.delete("/:id", async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

//UPDATE

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
