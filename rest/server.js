const express = require("express");
const faker = require("faker");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let data = [
  {
    id: 1,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  },
  {
    id: 2,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  },
];

app.get("/", (req, res) => {
  res.json({ hello: "hello world" });
});

app.get("/users", (req, res) => {
  res.json({ data });
});

app.get("/users/:id", (req, res) => {
  const user = data.find((user) => user.id === parseInt(req.params.id));

  if (!user) {
    return res.status(401).json({ error: "Not Found" });
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  data.push(req.body);
  res.json(req.body);
});

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Servidor corriendo en el puerto 3000");
});

// SWAGGER
// POSTMAN
