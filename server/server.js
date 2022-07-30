const express = require('express');
const app = express();
const PORT =5000;

app.use(express.static('server/public'));

app.use(express.urlencoded({extended : true}));

app.listen(PORT, () => {
    console.log('listening on PORT:', PORT);
});

