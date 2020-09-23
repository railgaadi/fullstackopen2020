const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/users");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

describe("users are validated before adding", () => {
  beforeEach(async () => {
    jest.setTimeout(10000);

    await User.deleteMany({});

    const userObj = helper.initialUsers.map((user) => new User(user));
    const promiseArr = userObj.map((user) => user.save());
    await Promise.all(promiseArr);
  });

  test("username should be unique", async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "karan",
      password: "worah",
      name: "karan",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");
    const usersAtEnd = await helper.usersInDB();
    expect(usersAtStart.length).toBe(usersAtEnd.length);
  });

  test("username should be at least 3 chars", async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "ka",
      password: "worah",
      name: "karan",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "is shorter than the minimum allowed length"
    );
    const usersAtEnd = await helper.usersInDB();
    expect(usersAtStart.length).toBe(usersAtEnd.length);
  });

  test("password should be at least 3 chars", async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "karan2",
      password: "tw",
      name: "karan",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Password must be at least 3 characters long"
    );
    const usersAtEnd = await helper.usersInDB();
    expect(usersAtStart.length).toBe(usersAtEnd.length);
  });
});
