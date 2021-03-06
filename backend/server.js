const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const apiPort = 3005;

process.env.NODE_ENV = "development";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

let currentRoles = { jester: 1, something: 2 };
const playerCount = 10;
let inGameCount = 0;

const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const generateGame = () => {
  let data = [];

  Object.entries(currentRoles).map(([k, v]) => {
    console.log(k, v);
    for (var i = 0; i < v; i++) {
      data.push(k);
    }
  });
  // if (data.length > playerCount) {
  //   console.log(
  //     "ERROR more special roles than there are players! please check currentRoles "
  //   );
  // }
  // console.log(data, data.length);
  while (playerCount > data.length) {
    data.push("crew");
  }

  return data;
};
const gameSpots = shuffle(generateGame());
// console.log(gameSpots.length, gameSpots);

app.get("/gimmiRole", (req, res) => {
  const player = req.query.name;
  console.log(req);
  if (inGameCount >= gameSpots.length) {
    res.send("fullGame");
  } else {
    const theRole = gameSpots[inGameCount];
    console.log(theRole);
    res.send(theRole);
  }
  inGameCount += 1;
  console.log(inGameCount);
});

app.get("/getRules", (req, res) => {
  res.send(currentRoles);
});

app.post("/setRules", (req, res) => {
  console.log("setRules q", req.query.rules);
  currentRoles = rules;
  res.send(currentRoles);
});

// app.get("/assets/agents/", function (req, res) {
//   if (req.query.agent !== undefined) {
//     let agentPath = "/agents/" + req.query.agent + ".png";
//     res.sendFile(path.join(__dirname, agentPath.toLowerCase()));
//   } else {
//     let errorImage = "/agents/" + "undefined" + ".png";
//     res.sendFile(path.join(__dirname, errorImage.toLowerCase()));
//   }
// });

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
