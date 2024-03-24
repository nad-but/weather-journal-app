///Setup empty JS object to act as endpoint for all routes
let projectData = {};

/// Require Express to run server and routes
const expr = require('express');
/// body parser to allow backend to access json data
const bodyp =  require('body-parser');
///Start up an instance of app
const app = expr();

///* Middleware*/
///Here we are configuring express to use body-parser as middle-ware.
app.use(bodyp.urlencoded({ extended: false }));
app.use(bodyp.json());

/// Cors for cross origin allowance
const cor = require('cors');

/// Initialize the main project folder
app.use(expr.static('website'));

//use cors
app.use(cor());

// port number
const portnum = 3007;

//listen to server
app.listen(portnum,function(){console.log('Server is Running on This link  http://localhost:'+ portnum);});



//callback function to get all data from projectData
const sandAllData = async(requ , respo) =>{
    respo.status(200).send(projectData);
    projectData = {};
}

//to get route
app.get('/all',sandAllData);

//post callback function
const dataPosT = async(requ , respo) =>{
   projectData = await requ.body;
   respo.status(200).send(projectData); 
}

//to post route
app.post('/add',dataPosT);

