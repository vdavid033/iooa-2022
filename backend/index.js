var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const dbConfig = require("./db.config.js");
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// connection configurations
var dbConn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
// connect to database
dbConn.connect();
// Retrieve all plant_species 
app.get('/plant_species', function (request, response) {
    dbConn.query('SELECT * FROM plant_species', function (error, results, fields) {
        if (error) throw error;
        return response.send({
            error: false, data: results, message: 'plant_species_list.'
        });
    });
<<<<<<< HEAD
    module.exports = app;
    

    // Dohvat svih biljnih porodica #19
app.get("/botanical_family", function (request, response) {
    dbConn.query("SELECT * FROM botanical_family", function (error, results, fields) {
      if (error) throw error;
      return response.send({
        error: false,
        data: results,
        message: "botanical_family list.",
      });
    });
  });
=======
});
// Retrieve plant_species with id 
app.get('/plant_species/:id', function (request, response) {
    let plant_species_id = request.params.id;
    if (!plant_species_id) {
        return response.status(400).send({
            error: true, message: 'Please provide plant_species_id'
        });
    }
    dbConn.query('SELECT * FROM plant_species where id=?', plant_species_id, function
        (error, results, fields) {
        if (error) throw error;
        return response.send({
            error: false, data: results[0], message:
                'plant_species list.'
        });
    });
});

//dohvat svih biljnih vrsta za jednu botanicku porodicu #23
app.get('/plant_species_by_bf/:id', function (request, response) {
    let botanical_family_id = request.params.id;
    if (!botanical_family_id) {
        return response.status(400).send({ error: true, message: 'Please provide botanical_family_id' });
    }
    dbConn.query('SELECT ps.id, ps.croatian_name, ps.latin_name FROM plant_species ps left OUTER join genus g ON ps.genus_id=g.id left OUTER join botanical_family bf on g.botanical_family_id=bf.id where bf.id=?', botanical_family_id, function
        (error, results, fields) {
        if (error) throw error;
        return response.send({
            error: false, data: results, message:
                'plant_species list.'
        });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;


// Retrieve botanical_family with id
app.get("/botanical_family/:id", function (request, response) {
    let botanical_family_id = request.params.id;
    if (!botanical_family_id) {
        return response
            .status(400)
            .send({ error: true, message: "Please provide botanical_family_id" });
    }
    dbConn.query(
        "SELECT * FROM botanical_family where id=?",
        botanical_family_id,
        function (error, results, fields) {
            if (error) throw error;
            return response.send({
                error: false,
                data: results[0],
                message: "botanical_family list.",
            });
        }
    );
});
>>>>>>> 5ab0bc417e01947b370f3af8a2756eeae4aaa34b
