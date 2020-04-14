const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );
  if (repositorieIndex < 0) {
    return response
      .status(400)
      .json({ error: "Repositorie not found. Try again!" });
  }
  const like = repositories[repositorieIndex].likes;
  const repositorie = { id, title, url, techs, likes: like };
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );
  if (repositorieIndex < 0) {
    return res.status(400).json({ error: "Repositorie Not Found" });
  }

  repositories.splice(repositorieIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );
  if (repositorieIndex < 0) {
    return response
      .status(400)
      .json({ error: "Project not found. Try again!" });
  }
  const title = repositories[repositorieIndex].title;
  const techs = repositories[repositorieIndex].techs;
  const url = repositories[repositorieIndex].url;
  const like = repositories[repositorieIndex].likes;
  const nLike = Number(like) + 1;
  const repositorie = { id, title, url, techs, likes: nLike };
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

module.exports = app;
