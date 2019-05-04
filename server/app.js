const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');


app.use(bodyParser.json({type: 'application/*+json'}))

///////////////
/// Routes ////
///////////////


const images = require('./routes/images');



///////////////

app.use('/images', images);



///////////////


app.get('/', (req, res) => res.send('Hello World!'));
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));