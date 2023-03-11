const fs = require("fs/promises");
const express = require("express");
const axios = require("axios");
const _ = require("lodash");

const app = express();

app.use(express.json());

app.get("/api/users", (request, resp) => {
  const requestParams = request.query;
  const userSince = requestParams.since;
  const url = `https://api.github.com/users?since= ${userSince}`;
  const githubToken = "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";

  axios({
    method: "GET",
    url: url,
    headers: { Authorization: `Bearer ${githubToken}` },
  })
    .then((response) => {
      const data = response.data;
      resp.json(data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
});

app.get("/api/users/:username/details", (request, resp) => {
  const username = request.params.username;
  const url = `https://api.github.com/users/${username}`;
  const githubToken = "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";

  axios({
    method: "GET",
    url: url,
    headers: { Authorization: `Bearer ${githubToken}` },
  })
    .then((response) => {
      const data = response.data;
      resp.json(data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
});


app.get("/api/users/:username/repos", async (request, resp) => {
  const username = request.params.username;
  const url = `https://api.github.com/users/${username}/repos`;
  const githubToken = "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";

  axios({
    method: "GET",
    url: url,
    headers: { Authorization: `Bearer ${githubToken}` },
  })
    .then((response) => {
      const data = response.data;
      resp.json(data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
});


app.listen(8080, () => console.log("API Server is running..."));
