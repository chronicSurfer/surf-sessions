const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const PORT = process.env.PORT || 3001 || 3002;

//connect db
const connection = mysql.createConnection({
    host: 'localhost',
    port : 3306,
    user: 'root',
    password : 'root',
    database : 'surf-session-tracker'
    // debug: true
});

connection.connect((err)=>{
    if(!err) {
        console.log('DB connected');
    } else {
        console.log('DB not connected');
    }
});

//middleware 
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function errorHandling(req, res){
    res.status(req.status || 500).send(req.error || 'Server Error');
}

//Endpoints

//get data from db
app.get('/surf-data', (req, res) => {
        connection.query('SELECT * FROM journal',(err, rows)=>{
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
});

//add data to db
app.post('/add-session', (req, res, next) => {
    const {date, location, height, rating} = req.body;
    try {
        let query = 'INSERT INTO `journal` (`id`, `date`, `location`, `height`, `rating`) VALUES (NULL, ?, ?, ?, ?)';
        let inserts = [date, location, Number(height), Number(rating)];
        let sql = mysql.format(query, inserts);

        const results = connection.query(sql);

        res.send({
            success: true
        });
    
    } catch(err){
        req.status = 500;
        req.error = 'Error adding surf session';

        return next();

    }
}, errorHandling);
    


//delete data from db
app.delete('/delete-session', async (req, res, next) => {
    const {id} = req.body;
    try {
        let query = 'DELETE FROM `journal` WHERE `journal`.`id` = ?';
        let inserts = [Number(id)];
        let sql = mysql.format(query, inserts);

        const results = await connection.query(sql);

        res.send({
            success: true, 
        });
    
    } catch(err){
        req.status = 500;
        req.error = 'Error deleting surf session';

        return next();

    }
}, errorHandling);

//update data from db
// UPDATE `journal` SET `height` = '9' WHERE `journal`.`id` = 8
app.post('/update-session', (req, res, next) => {
    const {date, location, height, rating, id} = req.body;
    try {
        let query = 'UPDATE `journal` SET `date`= ?, `location`=?, `height` = ?, `rating`=?  WHERE `journal`.`id`=?';
        let inserts = [date, location, Number(height), Number(rating), Number(id)];
        let sql = mysql.format(query, inserts);
        console.log(sql);

        const results = connection.query(sql);

        res.send({
            success: true
        });
    
    } catch(err){
        req.status = 500;
        req.error = 'Error adding surf session';

        return next();

    }
}, errorHandling);

//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log('Server running on PORT:', PORT);
});