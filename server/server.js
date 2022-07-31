// this block requires express, gives express a const called 'app' and sets our port to 5000.
const express = require('express');
const app = express();
const PORT = 5000;
// this is our file path for the home page to display on page load.
app.use(express.static('server/public'));
// this allows us to get the data we want from req.body
app.use(express.urlencoded({extended : true}));
// equationHistory will store all of our poast equations and be able to send them to client.js
let equationHistory = [];
// answer will hold our answer from the runCalculation function and be able to send to client.js
let answer = '';
// this tells our computer to listen on port 5000 and console log the port.
app.listen(PORT, () => {
    console.log('listening on PORT:', PORT);
});
// this block will take in a post request that pushes the input into our equation history array
// and calls the runCalculation fucntion that will give us our answer.
// we send status of 'OK' once complete.
app.post('/calc', (req, res) => {
    // console.log(req.body);
    equationHistory.push(req.body);
    runCalculation();
    res.sendStatus(200);
})

// this block will run when a get request when called from client.js and send back to client.js
// an object with the equation history and answer from the runCalculation function.
app.get('/calc', (req, res) => {
    // console.log(equationHistory);
    res.send({
        equationHistory: equationHistory,
        answer: answer
    });
})
// this post request is a work around to a delete request. This takes a post request from client.js
// and runs clear history function where we set everything back to empty. We send 'OK' once complete
app.post('/clear', (req, res) => {
    clearHistory();
    res.sendStatus(200);
})

//this function is called by the post array at /calc and returns an answer that will be sent back to client.js
function runCalculation(){
    // this line gets the current equation by getting the most recent entry in the array
    let currentEquation = equationHistory[equationHistory.length-1].calc
    // this is an empty array that will hold our parsed out numbers
    let stringArray = [];
    // firstNum and secondNum will be set to numbers that we parsed out from the string array.
    let firstNum = 0;
    let secondNum = 0;

//  console.log('in runCalc');
// we check if the current array contains a '+'. If it does, we set the stringArray equal to the currentEquation split at the '+'. for example 1+2 for a current equation
// that is split at the '+' would make stringArray [1, 2]. We then set the firstNum variable to the Number of stringArray at 0. We also set the secondNum variable to the Number of stringArray at 1.
// we finish by setting the global variable of answer to firstNum + secondNum. This process is repeated with all of the possible operators.
// One unique thing about this calculator is that it can handle negative numbers since the '-' is the last if else and is parsed at all other operators first. However this only works
// if the first number is positive and the second number is negative. If the first number was allowed to be negative this function would parse at the first '-'.
// Also, if a user clicks equal before entering an operator, it will return the number entered as the answer due to the else statement.
 if (currentEquation.includes('+')){
    stringArray = currentEquation.split('+');
    firstNum = Number(stringArray[0]);
    secondNum = Number(stringArray[1]);
    answer = firstNum + secondNum;
 } else if (currentEquation.includes('*')){
    stringArray = currentEquation.split('*');
    console.log(stringArray);
    firstNum = Number(stringArray[0]);
    secondNum = Number(stringArray[1]);
    answer = firstNum * secondNum;
 } else if (currentEquation.includes('/')){
    stringArray = currentEquation.split('/');
    firstNum = Number(stringArray[0]);
    secondNum = Number(stringArray[1]);
    answer = firstNum / secondNum;
 }  else if (currentEquation.includes('-')){
    stringArray = currentEquation.split('-');
    console.log(stringArray);
    firstNum = Number(stringArray[0]);
    secondNum = Number(stringArray[1]);
    answer = firstNum - secondNum;
 } else {
    answer = currentEquation;
 }
}

// this function is called in the post request at /clear. this is the work around for the DELETE request and sets equation history and answer back to blank.
function clearHistory() {
    equationHistory = [];
    answer = '';
}