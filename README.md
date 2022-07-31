# Project Name
jQuery Server Calculator

## Description

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).

Duration: Weekend project (Friday, July 29th through Sunday, July 31th)

The goal of this project was to create a calculator that could add, subtract, multiply, and divide. All calculation must happen on the server side. It was recommended but not required to make this look like a real calculator to make it intuitive for users. I did my best to give my calculator a retro theme and make it look 3D by adding some different styl borders to the calculator container, calculator buttons, and the answer screen.

Problems & Solutions:
The most complex part of this prject is getting the equations to parse data at the correct points. I order to eliminate as many errors as possible. I added pop ups that do not allow operators to be entered first or last. Once the equation passes that if statement it is sent to the server where I did an if statment that checks if it includes each of the operators. Once I figure out what operator is in the equation i split the function into an array and get the numbers on either side of the operator to complete my calculation. This took some trial and error but I am pleased with the functionality.

If I had more time to work on this I would update the calculator to work with negative numbers by finding how many '-' are in the equation entered and splicing the string at the correct '-'. I was able to get a for loop to count find the count of '-'. However, there are several combinations of how many negative numbers and if they are before, after the operator. The operator can also be minus.

languages and tools used for this project:
-HTML
-CSS
-JavaScript
-jQuery
-Node.js
-Express.js
-Ajax

Screen Shot
[Calculator Screenshot](images/calculatorScreenshot.png)

Prerequisites
Node.js
Express.js

List other prerequisites here
Installation
To see the fully functional site, please:
- Fork and Clone
- Open up your editor of choice and run npm install express
- Run npm start in the terminal
- type http://localhost:5000 in your browser to view page

Usage
- Click the number and operator buttons or type numbers and operators into the input field.
- Click the equal button to run the equation.
- Answers will be shown on the calculator screen above the input field.
- Previously entered equations will be show below the calculator in the equation history section.
- Click on the screen with the answer to enter that number into the input for your next calculation
- Click any of the previous equations to enter it in the input field again.
- The orange 'c' button will clear the input field only.
- The red 'ca' button will clear the answer screen, input fields, and equation history.

Acknowledgement
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.

Support
If you have suggestions or issues, please email me at nicholasj964@yahoo.com