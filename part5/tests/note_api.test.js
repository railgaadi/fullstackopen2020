const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Note = require("../models/note");

//REFRESH DB

beforeEach(async () => {
  jest.setTimeout(10000); //SETTING TIME OUT FOR JEST AS SERVER IS FAR

  await Note.deleteMany({});

  const noteObjects = helper.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray);
});

//IS JSON

describe("when there are some notes saved initially", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // ALL NOTES RETURNED

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    expect(response.body.length).toBe(helper.initialNotes.length);
  });

  //SPECIFIC NOTE IS CONTAINED

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);

    expect(contents).toContain("Browser can execute only Javascript");
  });
});

//VALID NOTE POSTED
describe("addition of a new note", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: "true",
    };
    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDB();
    expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1);
    const contents = await notesAtEnd.map((n) => n.content);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  //NOTE WITHOUT CONTENT NOT POSTED

  test("a note without content is not added", async () => {
    const newNote = {
      important: true,
    };
    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDB();
    expect(notesAtEnd.length).toBe(helper.initialNotes.length);
  });
});

//SPECIFIC NOTE CAN BE VIEWED

describe("viewing a specific note", () => {
  test("a specific note can be viewed with correct id", async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToView = notesAtStart[0];
    console.log(noteToView);

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultNote.body).toEqual(noteToView);
  });

  test("fails with status code 400 when id is wrong", async () => {
    const validNonExistingId = await helper.nonExistingId();
    await api.get(`/api/notes/${validNonExistingId}`).expect(404);
  });

  test("fails wtih status code 404 when id is invalid", async () => {
    const nonValidId = "123456";
    await api.get(`/api/notes/${nonValidId}`).expect(400);
  });
});

//ONE NOTE CAN BE DELETED

describe("deleting one note", () => {
  test("a note can be deleted", async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDB();
    expect(notesAtEnd.length).toBe(notesAtStart.length - 1);
    const contents = notesAtEnd.map((note) => note.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
});

//CLOSE CONNECTION

afterAll(() => {
  mongoose.connection.close();
});
