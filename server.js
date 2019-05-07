const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//middleware 
app.use(express.static('client'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

function errorHandling(req, res){
    res.status(req.status || 500).send(req.error || 'Server Error');
}

//Endpoints

// add routes to express app
// routes(app);

// app.get('*', (req, res) => {
//     res.sendFile(resolve(__dirname, 'client', 'dist', 'index.html'));
// });

//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log('Server running on PORT:', PORT);
});