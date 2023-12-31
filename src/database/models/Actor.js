module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DECIMAL(3,1)
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'actors',
        timestamps: false
    };
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}