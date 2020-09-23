const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/bloglist");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

//REFRESH DB
beforeEach(async () => {
  jest.setTimeout(10000);

  await Blog.deleteMany({});

  const blogObj = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArr = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArr);
});

//Blogs returned in JSON

test("all blogs are returned and in json", async () => {
  const returnedBlogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(returnedBlogs.body.length).toBe(helper.initialBlogs.length);
});

//Is ID property of blogs called 'id' and not '_id'

test("property is called id", async () => {
  const returnedBlogs = await api.get("/api/blogs");

  expect(returnedBlogs.body[0].id).toBeDefined();
});

//Check if blog is posted successfully

test("new blog is posted successfully", async () => {
  const newBlog = {
    author: "Bubba",
    likes: 2,
    url: "google.com",
    title: "Hellow",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
  const authors = await blogsAtEnd.map((blog) => blog.author);
  expect(authors).toContain("Bubba");
});

//Check if likes defualt to 0

test("if request body does not have likes, it defaults to 0", async () => {
  const newBlog = { author: "Bubba", url: "google.com", title: "Hellow" };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

//Status 400 if title or URL is missing in POST

test("status 400 if title or URL field is missing", async () => {
  const newBlog = { likes: 2 };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

//Delete one blog
test("one blog entry is deleted with valid id", async () => {
  const blogsAtStart = await helper.blogsInDB();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const notesAtEnd = await helper.blogsInDB();
  expect(notesAtEnd.length).toBe(blogsAtStart.length - 1);
});

//Update like count of blog
test("like count is updated with a valid id", async () => {
  const blogsAtStart = await helper.blogsInDB();
  const blogToUpdate = blogsAtStart[0];

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ ...blogToUpdate, likes: 400 })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(400);
});

//Close mongoose

afterAll(() => {
  mongoose.connection.close();
});
