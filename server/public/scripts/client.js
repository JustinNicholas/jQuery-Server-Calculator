console.log('JS Working');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Wokring');
    $('.button').on('click', addChar);
    $('#equal').on('click', sendEquation);
    $('#c').on('click', clearCalc);
    $('#ca').on('click', clearAll);
    $('.historyButton').on('click', addChar);
}

function addChar() {
    let char = $(this).text();
    console.log(char);
    $('#calcIn').val($('#calcIn').val() + char);
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
            <p>${equation.calc}</p>
        `)
    }
}

function displayAnswer(answer) {
    $('.answerScreen').empty();
    $('.answerScreen').append(`
    <p class="finalAnswer">${answer.answer}</p>
    </div>
`)
}
function clearAll() {
    $('.answerScreen').empty();
    $('#calcIn').val('');
}