console.log('JS Working');
// this function waits until document is loaded before calling the onReady function
$(document).ready(onReady);

// onReady holds all of the functions that we call on page load or listen to parts on the DOM for clicks.
function onReady() {
    console.log('JQ Wokring');
    // if any button on the calculator is clicked, we add call the addChar function.
    $('.button').on('click', addChar);
    // if the answer screen on the calculator is clicked, we add call the addChar function.
    $('.answerScreen').on('click', addChar);
    // if the equal button is clicked on the the calculator, we call the sendEquation function
    $('#equal').on('click', sendEquation);
    // if the c button is clicked we call the clearCalc function
    $('#c').on('click', clearCalc);
    // if the ca button is clicked we call the clearAll function   
    $('#ca').on('click', clearAll);
    // this is a dynamic click listener that listens to the history section until there is a historyButton class that if clicked runs the addChar fucntion.
    $('.history').on('click', '.historyButton', addChar);
    // this runs the getEquations function on page load so the history is display if the page is refreshed
    getEquations();
}

//this function will add the character of the button or text that is clicked. this function works for numbers, operators, the answer screen, and any of the previous entries in the equation history
function addChar() {;
    // we set char equal to the 'this'.text which is the text of what we are clicking on. These will be parsed and convered to number on the server.
    let char = $(this).text();
    // noSpaceChar was needed because when clicking on the answer, we were getting a lot of spaces on either side of the number. this removes all spaces from the clicked answerScreen entries to the input
    let noSpaceChar = char.split(" ").join("");
    // we then set the value of the input to the current input plus the noSpaceChar that we are entering in the input.
    $('#calcIn').val($('#calcIn').val() + noSpaceChar);
    // this clears the answer screen when a input is added with a click. It is a bit confusing when typing a new equations and seeing an answer that doesn't make sense before hitting equal so I added this.
    $('.answerScreen').empty();
}

// clearCalc is called when the 'c' button is clicked. this only clears the input field where characters are typed in 
function clearCalc() {
    $('#calcIn').val('');
}
// this function sends the equation that is typed into the input field to the server when the equal button is clicked.
function sendEquation() {
    // console.log('sending calc to server');
    // we set currentCalc equal to the value of the input and set it to a string in currentClacString.
    let currentCalc = ($('#calcIn').val());
    let currentCalcString = currentCalc.toString();
    // console.log(currentCalcString);
    // ajax goes makes a post request to /calc and passes the data of the current calc string to the server.
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: {
            calc: currentCalcString,
        }
        //when ajax is done and recieves the ok from the server, we run the getEquations function.
    }).then(function(response){
        // console.log(response);
        getEquations();
    })
    // we set the input field to empty again.
    $('#calcIn').val('');
}

// this function is called on page load, when the our post request to /calc is complete, and when our post request to /clear is complete
function getEquations(){
    // console.log('in get answer');
    // ajax makes a get request to /calc and when it returns with the data in the response we run displayEquations and displayAnswer using the response as an argument.
    $.ajax({
        method: 'GET',
        url: '/calc'
    }).then(function(response){
        // console.log(response);
        displayEquations(response);
        displayAnswer(response);
    })
}
// display equations takes in the object of equationHistory and answer. 
function displayEquations(equations){
    // we empty the history section of all appended data.
    $('.history').empty();
    // we run a for of loop that targets every object in the array at the equationHistory.
    for( let equation of equations.equationHistory ){
        //we append a p tag to the history div with a class of historyButton (this is so it can be clicked and added to the input later) that has the equation.calc and targets the calc of the object.
        $('.history').append(`
                <p class="historyButton">${equation.calc}</p>
        `)
    }
}
// this function takes in an argument that is an object that has equationHistory and answer from the response of our get request at /calc. we just target the answer and append it to the answer screen section
function displayAnswer(answer) {
    $('.answerScreen').empty();
    $('.answerScreen').append(`
        <p class="finalAnswer">${answer.answer}</p>
    `)
}
// this function is called when the 'ca' button is clicked. we are able to remove all appended history, answer, and input. we also call clearHistory
function clearAll() {
    $('.answerScreen').empty();
    $('#calcIn').val('');
    $('.history').empty();
    clearHistory();
}

// when this function is called we have ajax make a post request to /clear and call the get equations function to display the empty equation hisotry.
function clearHistory() {
    $.ajax({
        method: 'POST',
        url: '/clear',
    }).then(function(response){
        // console.log(response);
    })
    getEquations();
}