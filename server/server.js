const e = require('express');
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
    console.log(req.body);
    equationHistory.push(req.body);
    runCalculation();
    res.sendStatus(200);
})

app.get('/calc', (req, res) => {
    console.log(equationHistory);
    res.send({
        equationHistory: equationHistory,
        answer: answer
    });
})

function runCalculation(){
    let currentEquation = equationHistory[equationHistory.length-1].calc
    let stringArray = [];
    let firstNum = 0;
    let secondNum = 0;
 console.log('in runCalc');
 if (currentEquation.includes('+')){
    stringArray = currentEquation.split('+');
    // console.log(stringArray);
    firstNum = Number(stringArray[0]);
    secondNum = Number(stringArray[1]);
    answer = firstNum + secondNum;
    // console.log(answer);
 } else if (currentEquation.includes('-')){
    stringArray = currentEquation.split('-');
 } else if (currentEquation.includes('*')){
    stringArray = currentEquation.split('*');
 } else if (currentEquation.includes('/')){
    stringArray = currentEquation.split('/');
 }
}