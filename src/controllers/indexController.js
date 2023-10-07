const db = require("../database/models");
const sequelize = db.sequelize;
const moment = require("moment");
const { validationResult } = require("express-validator");


const indexController = {
    home: function (req, res) {
        // TODO
    
        db.Movie.findAll({
          limit: 5,
          where: {
            rating: { [db.Sequelize.Op.gte]: 8 },
          },
          order: [["rating", "DESC"]],
        })
        .then((movies) => {
        return res.render("index",{ movies });
      });
      },

}

module.exports = indexController;