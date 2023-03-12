const express = require('express');
const axios = require("axios");

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

const TOKEN = "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";

function errorHandling(error, resp) {

  console.log("ERROR MESSAGE", error)

  if (error.response) {
    const errorData = {
      status: error.response.status,
      message: error.response.data.message,
    };
    resp.status(errorData.status).send(errorData);
  } else {
    const errorData = {
      status: 500,
      message: "Internal Server Error",
    };
    resp.status(errorData.status).send(errorData);
  }
}

async function requestWithAxios(url, TOKEN) {
  return await axios({
    method: "GET",
    url: url,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

router.get("/api/users", async (request, resp) => {
  try {
    const requestParams = request.query;
    const userSince = requestParams.since;
    const url = `https://api.github.com/users?since=${userSince}`;

    const response = await requestWithAxios(url, TOKEN)
    const data = response.data;

    resp.send({ message: { ...data } });
  } catch (error) {
    errorHandling(error, resp);
  }
});


router.get("/api/users/:username/details", async (request, resp) => {
  try {
    const username = request.params.username;
    const url = `https://api.github.com/users/${username}`;

    const response = await requestWithAxios(url, TOKEN)
    const data = response.data;

    resp.send({ message: { ...data } });
  } catch (error) {
    errorHandling(error, resp);
  }
});

router.get("/api/users/:username/repos", async (request, resp) => {
  try {
    const username = request.params.username;
    const url = `https://api.github.com/users/${username}/repos`;

    const response = await requestWithAxios(url, TOKEN)
    const data = response.data;

    resp.send({ message: { ...data } });
  } catch (error) {
    errorHandling(error, resp);
  }
});

module.exports = router;
