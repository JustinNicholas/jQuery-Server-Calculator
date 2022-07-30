console.log('JS Working');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Wokring');
    $('.button').on('click', addChar);
    $('.answerScreen').on('click', addChar);
    $('#equal').on('click', sendEquation);
    $('#c').on('click', clearCalc);
    $('#ca').on('click', clearAll);
    $('.history').on('click', '.historyButton', addChar);
    getEquations();
}

function addChar() {;
    let char = $(this).text();
    let noSpaceChar = char.split(" ").join("");
    $('#calcIn').val($('#calcIn').val() + noSpaceChar);
    $('.answerScreen').empty();
}

function clearCalc() {
    $('#calcIn').val('');
}

function sendEquation() {
    console.log('sending calc to server');
    let currentCalc = ($('#calcIn').val());
    let currentCalcString = currentCalc.toString();
    console.log(currentCalcString);
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: {
            calc: currentCalcString,
        }
    }).then(function(response){
        console.log(response);
        getEquations();
    })
    $('#calcIn').val('');
}

function getEquations(){
    console.log('in get answer');
    $.ajax({
        method: 'GET',
        url: '/calc'
    }).then(function(response){
        console.log(response);
        displayEquations(response);
        displayAnswer(response);
    })
}

function displayEquations(equations){
    $('.history').empty();
        for( let equation of equations.equationHistory ){
            $('.history').append(`
                    <p class="historyButton">${equation.calc}</p>
            `)
        }
}

function displayAnswer(answer) {
    $('.answerScreen').empty();
    $('.answerScreen').append(`
        <p class="finalAnswer">${answer.answer}</p>
    `)
}
function clearAll() {
    $('.answerScreen').empty();
    $('#calcIn').val('');
    $('.history').empty();
    clearHistory();
}

function clearHistory() {
    $.ajax({
        method: 'POST',
        url: '/clear',
    }).then(function(response){
        console.log(response);
    })
    getEquations();
} //won't show history after clearing.