 //global variables
const generateButton = document.getElementById("generate");
const zipcodeZ = document.querySelector("#zip");
const temperatureT = document.getElementById('temp');
const feeTextarea = document.getElementById("feelings");
const todayDate = document.getElementById('date');
const Conten = document.getElementById('content');
const nameOfCity = document.getElementById('city-name');
const discrip = document.getElementById("disc");

// Create a new date instance dynamically with JS
let da = new Date();
let newdate = da.getMonth()+1+'/'+ da.getDate()+'/'+ da.getFullYear();

// add basic URL to fetch it later
const urlBase = "https://api.openweathermap.org/data/2.5/weather?zip=";
// code of my api key
const myApiKey = "&appid=94248d65bd12cdb9454dd326ad3b91d2&units=imperial";
// Event listener when click to generate button will display the information of the weather...
generateButton.addEventListener("click",()=>{
   weathGetData(urlBase,zipcodeZ.value,myApiKey)
      .then((info)=>{
         console.log(info);
         /// object to post the data that I need
         const dataNeeded = {
            cityName:info.name,
            todaydate:newdate, 
            temper:info.main.temp, 
            descr:info.weather[0].description,
            feel:feeTextarea.value};
         //add data to Post request
         infoPOST('/add', dataNeeded)
         uPDateUI();
      })
});
//GET Function Data from API web
const weathGetData = async (urlBase, zipcodeZ, myApiKey )=>{
   const respo = await fetch(urlBase+zipcodeZ+myApiKey);
   try{
      const gData = await respo.json();
      if(gData.cod != 200){
         // display error message if  label the of zip code empty or the code is wrong
         const errores = gData.message;
         alert(errores);
         return gData;
      }
      return gData;
   } catch(erro){
      console.log("Error!!!", erro);}
};

// POST Function Data
const infoPOST = async (uRL = '', inform ={})=>{
   console.log(inform);
   const respo = await fetch(uRL, {
      method : "POST",
      credentials :"same-origin",
      headers: {'Content-Type' : 'application/json',},
      body: JSON.stringify(inform)
   });
   try{
      const newInfo =await respo.json();
      //console.log(newInfo);
      return newInfo;

   } catch(erro){console.log("Error!!!", erro);}
};

//Function to GET request to take the data from the server throw '/all' route
const uPDateUI = async ()=>{
   const requ = await fetch("/all");
   try{
      const allinform  = await requ.json();
      temperatureT.innerHTML = `${Math.round(allinform.temper)}&#176F`;
      discrip.innerHTML = `${allinform.descr}`;
      nameOfCity.innerHTML = `${allinform.cityName}`;
      Conten.innerHTML= `Today, I'm feeling ${allinform.feel}`;
      todayDate.innerHTML = `${allinform.todaydate} `;
   }catch(erro){console.log("Error!!!", erro);}
};