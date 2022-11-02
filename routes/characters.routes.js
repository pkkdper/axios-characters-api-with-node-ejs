const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/create", (req, res, next) => {
    res.render("characters/create-character");
  });

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});



router.post("/characters/create", async (req, res, next) => {
    try {
      const character = req.body;
      if (character.debt === "on") {
        character.debt = true;
      } else {
        character.debt = false;
      }
    console.log(character)
      await axios.post(
        `https://ih-crud-api.herokuapp.com/characters`,
        character
      );

      res.redirect("/characters");
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
