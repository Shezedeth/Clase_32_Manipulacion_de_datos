const { check } = require("express-validator");

module.exports = [
// ---------------title-------------
  check("title")
    .notEmpty()
    .withMessage("El nombre de la película es obligatorio")
    .bail()
    .isLength({
      min: 4,
      max: 20,
    })
    .withMessage("Debe tener entre 4 y 20 caracteres"),
  // ---------------rating-------------
  check("rating")
    .notEmpty(),
    // .withMessage("Es obligatorio")
    // .isInt({
    //   gt: 1,
    // })
    // .withMessage("Debe ser positivo"),
  // ---------------awards-------------
  check("awards")
    .notEmpty()
    .withMessage("Es obligatorio")
    .isInt({
      gt: 1,
    })
    .withMessage("Debe ser positivo"),
  // ---------------release_date-------------
  // check("release_date")
  //   .notEmpty()
  //   .withMessage("Es obligatorio")
    // .isDate()
    // .withMessage("Fomato de fecha invalido")
    // ,
  
  // ---------------length-------------
  check("length")
  .notEmpty()
  .withMessage("Es obligatorio")
  .isInt({
    gt: 1,
  })
  .withMessage("Debe ser positivo"),
];
