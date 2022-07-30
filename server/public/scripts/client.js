console.log('JS Working');

$(document).ready(onReady);

function onReady() {
    console.log('JQ Wokring');
    $('.button').on('click', addChar);
}

function addChar() {
    let char = $(this).text();
    console.log(char);
    $('#calcIn').val($('#calcIn').val() + char);
}