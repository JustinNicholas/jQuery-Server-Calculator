console.log('JS Working');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Wokring');
    $('.button').on('click', addChar);
    $('#equal').on('click', sendCalc)
    $('#c').on('click', clearCalc)
}

function addChar() {
    let char = $(this).text();
    console.log(char);
    $('#calcIn').val($('#calcIn').val() + char);
}

function clearCalc() {
    $('#calcIn').val('');
}

function sendCalc() {
    console.log('sending calc to server');

    $.ajax({
        method: 'POST',
        url: '/calc',
        data: {
            calc: $('calcIn').text(),
        }
    }).then(function(response){
        console.log(response);
        getAnswer();
    })
}

function getAnswer(){

}
