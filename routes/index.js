const router = require("express").Router();
const User = require("../models/User.model");

router.get("/users", (req, res, next) => {
  // console.log(`loss users `);

  User.find()
    .sort({ score: -1 })
    .limit(4)
    .then((response) => {
      res.json(response);
    });
});

router.get("/all-users", (req, res, next) => {
  // console.log(`loss users `);

  User.find().then((response) => {
    res.json(response);
  });
});

router.post("/scores", (req, res, next) => {
  const { userName, score } = req.body;

  // console.log(`*****la puntuacion********`, score);

  User.findOne({ username: userName }).then((response) => {
    // console.log(`**la RESPUESTA DEL FINDONE`, response);

    //  console.log(`el user score`, response.username, `la puntuacion score`, response.score);
    response.score < score
      ? User.findOneAndUpdate({ username: userName }, { score: Number(score) }).then((response) => {
          /*  console.log(`soy la response*****`, response); */

          /* console.log(`he llegado a encontrarlo`, score, `la puntuacion total`, response.score); */
          res.json(response);
        })
      : console.log(`pepito`);
  });
});

router.post("/user-playing", (req, res, next) => {
  const { userName, score } = req.body;

  //console.log(`la puntuacion`, score);

  User.findOne({ username: userName }).then((response) => {
    console.log(`**la RESPUESTA DEL FINDONE normal`, response);

    console.log(
      `el user playing normal`,
      response.username,
      `la puntuacion playing normal`,
      response.score
    );
    response.score < score
      ? User.findOneAndUpdate({ username: userName }, { score: Number(score) }).then((response) => {
          //  console.log(`soy la response*****`, response);
          if (response !== null) {
            // console.log(`he llegado a encontrarlo`, score, `la puntuacion total`, response.score);
            res.json(response);
          }
        })
      : res.json(response);
  });

  console.log(`he llegado al back`);
});

router.post("/user-home", (req, res, next) => {
  const { userName } = req.body;

  console.log(`user playing home`, userName);

  User.findOne({ username: userName }).then((response) => {
    //  console.log(`soy la response*****`, response);
    if (response !== null) {
      // console.log(`he llegado a encontrarlo`, score, `la puntuacion total`, response.score);
      res.json(response);
    } else {
      User.create({ username: userName, score: 0 }).then((response) => {
        console.log(`lo he creado desde el playing`);
        res.json(response);
      });
    }
  });

  console.log(`he llegado al back`);
});

module.exports = router;
