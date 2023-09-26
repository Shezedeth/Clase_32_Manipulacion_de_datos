const db = require('../database/models');
const sequelize = db.sequelize;
const moment = require('moment');
const {validationResult} = require('express-validator');




//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {
                    movie,
                    Movie : movie,
                    moment
                });
                
            });
            
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {
                    movies,
                    Movie : movies,
                    moment
                });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        // TODO  
        return res.render('moviesAdd');
    },
    create: function (req, res) {
        
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
        
        
            const {title,rating,release_date,awards,length} = req.body;
        db.Movie.create({
            title : title.trim(),
            rating,
            awards,
            release_date,
            length
        })
            .then(movie => {

                return res.redirect('/moviesList',{
                    movie,
                    Movie : movie,
                    moment
                })
            })
        
        }else {
        
            
            db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesAdd', {
                    errors : errors.mapped(),
                    old : req.body,
                    movie,
                    Movie : movie,
                    moment
                });
                
            });
        }
    
    
    },
    edit: function(req, res) {
       // TODO
       db.Movie.findByPk(req.params.id)
            .then(movie => {
            console.log(moment(movie.release_date).format('YYYY-MM-DD'))
                return res.render('moviesEdit', {
                    movie,
                    Movie : movie,
                    moment
                })
            })
            .catch(error => console.log(error))
      
            
    },
    update: function (req,res) {
        // TODO
        const errors = validationResult(req);
        
        if(errors.isEmpty()){
        
         const {title,rating,release_date,awards,length} = req.body;
        
        db.Movie.update(
        {
            title : title.trim(),
            rating,
            awards,
            release_date,
            length,
        },
        {
            where : {
                id : req.params.id
            }
        }).then(response => {
            console.log(response);
            db.Movie.findByPk(req.params.id)
                .then(movie => {
                    return res.render('moviesDetail',{
                        movie,
                        Movie : movie,
                        moment
                    })
                })
            
        }).catch(error => console.log(error))
        
        }else {
            db.Movie.findByPk(req.params.id)
            .then(movie => {
                return res.render('moviesEdit', {
                    movie,
                    Movie : movie,
                    moment,
                    errors: errors.mapped(), 
                    old: req.body
                })
            })
            .catch(error => console.log(error))
    }
       
    },
    delete: function (req, res) {
        // TODO
        db.Movie.findByPk(req.params.id)
        .then(movie => {
            return res.render('moviesDelete', {
                movie,
                Movie : movie
                
            })
        })
        .catch(error => console.log(error))
  
        
    },
    destroy: function (req, res) {
        // TODO
        db.Movie.destroy(
            {
               where: { id: req.params.id }
            }
        )
        .then(movie => {
            console.log(movie);
                return res.redirect('/movies')
            })
        
          }
    

}

module.exports = moviesController;