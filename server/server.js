const express = require('express');
const app = express();
const PORT =5000;

app.use(express.static('server/public'));

app.use(express.urlencoded({extended : true}));

let equationHistory = [];
let answer = '';

app.listen(PORT, () => {
    console.log('listening on PORT:', PORT);
});

app.post('/calc', (req, res) => {
    runCalculation();
    console.log(req.body);
    equationHistory.push(req.body);
    res.sendStatus(200);
})

app.get('/calc', (req, res) => {
    console.log(equationHistory);
    res.send(equationHistory);
})

function runCalculation(){
 console.log('in runCalc');
}