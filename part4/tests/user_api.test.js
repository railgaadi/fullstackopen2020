const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/users");

describe("when there is one user in DB", () => {
  beforeEach(async () => {
    jest.setTimeout(10000);
    await User.deleteMany({});
    const user = new User({ username: "root", password: "secret" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "capo",
      name: "karan",
      password: "hello",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with a repeated username", async () => {
    const usersAtStart = await helper.usersInDB();
    const repeatedUser = {
      username: "root",
      password: "unique",
    };

    const result = await api
      .post("/api/users")
      .send(repeatedUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});
