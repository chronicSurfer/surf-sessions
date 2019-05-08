const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = process.env.PORT || 3001;

//connect db
const connection = mysql.createConnection({
    host: 'localhost',
    port : 3306,
    user: 'root',
    password : 'root',
    database : 'surf-session-tracker'
});

connection.connect(console.log("db connected"));

//middleware 
app.use(express.static('client'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

function errorHandling(req, res){
    res.status(req.status || 500).send(req.error || 'Server Error');
}

//temporary database
const surfdb = {
    1: {date : '5/5/19', location: 'hb', size: '5', rating: '5'},
    2: {date : '5/6/19', location: 'newps', size: '6', rating: '7'},
    3: {date : '5/7/19', location: 'lowers', size: '7', rating: '8'}
};

//Endpoints

//get data from db
app.get('/data', (req, res) => {
    // const id_data = Object.keys(surfdb);
    res.send(surfdb);
});

//add data to db
app.post('/add-session', async (req, res, next) => {
    //INSERT INTO `journal` (`id`, `date`, `location`, `height`, `rating`) VALUES (NULL, '2019-05-06', 'Newport ', '6', '6');
    const {date, location, height, rating} = req.body;
    try {
        let query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (NULL, ?, ?, ?, ?)';
        let inserts = ['id', 'date', 'location', 'height', 'rating', date, location, height, rating ];
        let sql = mysql.format(query, inserts);

        const results = await connection.query(sql);

        res.send({
            success: true, 
            dataId: results.insertId
        });
    
    } catch(err){
        req.status = 500;
        req.error = 'Error adding surf session';

        return next();

    }
}, errorHandling);
    


//add delete data from db


//update data from db


//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log('Server running on PORT:', PORT);
});