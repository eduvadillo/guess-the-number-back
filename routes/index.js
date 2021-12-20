const router = require("express").Router();
const User = require("../models/User.model");

router.get("/users", (req, res, next) => {
  console.log(`loss users `);

  User.find()
    .sort({ score: -1 })
    .limit(4)
    .then((response) => {
      res.json(response);
    });
});

router.post("/scores", (req, res, next) => {
  const { userName, score } = req.body;

  console.log(`la puntuacion`, score);

  User.findOneAndUpdate({ username: userName }, { score: Number(score) }).then((response) => {
    console.log(`soy la response*****`, response);
    if (response !== null) {
      console.log(`he llegado a encontrarlo`, score, `la puntuacion total`, response.score);
      res.json(response);
    } else {
      User.create({ username: userName, score: Number(score) }).then((response) => {
        console.log(`lo he creado`);
        res.json(response);
      });
    }
  });

  console.log(`he llegado al back`);
});

router.post("/user-playing", (req, res, next) => {
  const { userName, score } = req.body;

  console.log(`la puntuacion`, score);

  User.findOneAndUpdate({ username: userName }, { score: Number(score) }).then((response) => {
    console.log(`soy la response*****`, response);
    if (response !== null) {
      console.log(`he llegado a encontrarlo`, score, `la puntuacion total`, response.score);
      res.json(response);
    } else {
      User.create({ username: userName, score: Number(score) }).then((response) => {
        console.log(`lo he creado`);
        res.json(response);
      });
    }
  });

  console.log(`he llegado al back`);
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
