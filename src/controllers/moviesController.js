const db = require("../database/models");
const sequelize = db.sequelize;
const moment = require("moment");
const { validationResult } = require("express-validator");

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
  list: (req, res) => {
    db.Movie.findAll().then((movies) => {
      res.render("moviesList.ejs", { movies });
    });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesDetail.ejs", {
        movie,
        Movie: movie,
        moment,
      });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("newestMovies", {
        movies,
        Movie: movies,
        moment,
      });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      limit: 5,
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    }).then((movies) => {
      res.render("recommendedMovies.ejs", { movies });
    });
  }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
  add: function (req, res) {
    // TODO

    db.Movie.findAll({
      limit: 5,
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    })
    .then((movies) => {
    return res.render("moviesAdd",{ movies });
  });
  },
  create: function (req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { title, rating, release_date, awards, length } = req.body;
      db.Movie.create({
        title: title.trim(),
        rating,
        awards,
        release_date,
        length,
      }).then((movie) => {
        console.log(movie);
        return res.redirect("/movies");
      });
    } else {
      return res.render("moviesAdd", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  edit: function (req, res) {
    // TODO
    db.Movie.findByPk(req.params.id)
      .then((movie) => {
        console.log(moment(movie.release_date).format("YYYY-MM-DD"));
        return res.render("moviesEdit", {
          movie,
          Movie: movie,
          moment,
        });
      })
      .catch((error) => console.log(error));
  },
  update: function (req, res) {
    // TODO
    const errors = validationResult(req);

    if(errors.isEmpty()){

    const { title, rating, release_date, awards, length } = req.body;

    db.Movie.update(
      {
        title: title.trim(),
        rating,
        awards,
        release_date,
        length,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

      .then((response) => {
        console.log(response);
        return res.redirect("/movies/detail/" + req.params.id);
      })
      .catch((error) => console.log(error));

    }else {
      // return res.send(errors)
      db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesEdit", {
        errors: errors.mapped(),
        old: req.body,
        movie,
        Movie: movie,
        moment,
      });
    });
    }
  },
  delete: function (req, res) {
    // TODO
    db.Movie.findByPk(req.params.id)
      .then((movie) => {
        return res.render("moviesDelete", {
          Movie: movie,
        });
      })
      .catch((error) => console.log(error));
  },
  destroy: function (req, res) {
    // TODO
    const { id } = req.params;

    db.ActorMovie.destroy({
      where: {
        movie_id: id,
      },
    })
      .then((response) => {
        console.log(response);

        db.Actor.update(
          {
            favorite_movie_id: null,
          },
          {
            where: {
              favorite_movie_id: id,
            },
          }
        ).then((response) => {
          console.log(response);
          db.Movie.destroy({
            where: { id },
          }).then((response) => {
            console.log(response);
            return res.redirect("/movies");
          });
        });
      })
      .catch((error) => console.log(error));
  },
};

module.exports = moviesController;
