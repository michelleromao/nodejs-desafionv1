const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repository = [];

app.get("/repository", (request, response) => {
  return response.json(repository);
});

app.post("/repository", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repository.push(repositorie);
  return response.json(repositorie);
});

app.put("/repository/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositorieIndex = repository.findIndex(
    (repositorie) => repositorie.id === id
  );
  if (repositorieIndex < 0) {
    return response
      .status(400)
      .json({ error: "Repositorie not found. Try again!" });
  }
  const like = repository[repositorieIndex].likes;
  const repositorie = { id, title, url, techs, likes: like };
  repository[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repository/:id", (req, res) => {
  const { id } = req.params;
  const repositorieIndex = repository.findIndex(
    (repositorie) => repositorie.id === id
  );
  if (repositorieIndex < 0) {
    return res.status(400).json({ error: "Repositorie Not Found" });
  }

  repository.splice(repositorieIndex, 1);

  return res.status(204).send();
});

app.post("/repository/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repository.findIndex(
    (repositorie) => repositorie.id === id
  );
  if (repositorieIndex < 0) {
    return response
      .status(400)
      .json({ error: "Project not found. Try again!" });
  }
  const title = repository[repositorieIndex].title;
  const techs = repository[repositorieIndex].techs;
  const url = repository[repositorieIndex].url;
  const like = repository[repositorieIndex].likes;
  const nLike = Number(like) + 1;
  const repositorie = { id, title, url, techs, likes: nLike };
  repository[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

module.exports = app;
