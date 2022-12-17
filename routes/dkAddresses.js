var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:postalCode', function (req, res, next) {
  
  // fetch('https://api.dataforsyningen.dk/adresser?q=' + req.params.streetName )
  //console.log('https://api.dataforsyningen.dk/adresser?postnr=' + req.params.postalCode);
  fetch('https://api.dataforsyningen.dk/adresser?postnr=' + req.params.postalCode)
  // fetch('https://api.dataforsyningen.dk/adresser?postnr=2900&husnr=134')
    .then((response) => response.json())
    .then((data) => {
      
      let formattetJsonData = []; 
      
      for (let i = 0; i < data.length; i++) {
        formattetJsonData.push({
            "id": data[i].id,
            "floor": data[i].etage,
            "door": data[i].dør,
            "houseNr": data[i].adgangsadresse.husnr,//TODO: Check
            "countryName": "Danmark", //TODO: implement multiple countries
            "countryCode": "DK", //TODO: implement multiple countries
            "streetDesignation": data[i].adressebetegnelse,
            "streetName": data[i].adgangsadresse.vejstykke.navn,
            "streetNumber": data[i].adgangsadresse.husnr, //Mangler
            "roadCode": data[i].adgangsadresse.vejstykke.kode,
            "postalCode": data[i].adgangsadresse.postnummer.nr,
            "cityName": data[i].adgangsadresse.postnummer.navn,
            "commune": data[i].adgangsadresse.kommune.navn,
            "region": data[i].adgangsadresse.region.navn,
        }) 
      }
      console.log("Sending: ", formattetJsonData);
      return res.send(formattetJsonData);
    })
  .catch((error) => {
    console.log(error);
    res.send('Error:', error);
  });
});

/* router.get('/:postalCode', function (req, res, next) {
  
  fetch('https://api.dataforsyningen.dk/adgangsadresser?postnr=' + req.params.postalCode )
    .then((response) => response.json())
    .then((data) => {
      
      let formattetJsonData = []; 
      
      for (let i = 0; i < data.length; i++) {
        formattetJsonData.push({
            "floor": data[i].etage,
            "door": data[i].dør,
            "houseNr": data[i].husnr,// Mangler
            "countryName": "Danmark", //TODO: implement multiple countries
            "countryCode": "DK", //TODO: implement multiple countries
            "streetDesignation": data[i].adressebetegnelse,
            "streetName": data[i].adgangsadresse.vejstykke.navn,
            "streetNumber": data[i].adgangsadresse.vejstykke.husnr,
            "roadCode": data[i].adgangsadresse.vejstykke.kode,
            "postalCode": data[i].adgangsadresse.postnummer.nr,
            "cityName": data[i].adgangsadresse.postnummer.navn,
            "commune": data[i].adgangsadresse.kommune.navn,
            "region": data[i].adgangsadresse.region.navn,
        }) 
      }
      return res.send(formattetJsonData);
    })
  .catch((error) => {
    console.log(error);
    res.send('Error:', error);
  });
}); */

/*
router.get('/testasda', function (req, res, next) {
  console.log("Called test");
  res.send('<h1>hi</h1>')
   fetch('https://api.dataforsyningen.dk/adgangsadresser?husnrtil=1&postnr=2900' )
    .then((response) => {

      console.log("Entered code");
      response.json()}
      )
    .then((data) => {
      console.log("Entered code");
      let formattetJsonData = []; 
      
      for (let i = 0; i < data.length; i++) {
        formattetJsonData.push({
            "floor": data[i].etage,
            "door": data[i].dør,
            "houseNr": data[i].husnr,// Mangler
            "countryName": "Danmark", //TODO: implement multiple countries
            "countryCode": "DK", //TODO: implement multiple countries
            "streetDesignation": data[i].adressebetegnelse,
            "streetName": data[i].adgangsadresse.vejstykke.navn,
            "streetNumber": data[i].adgangsadresse.vejstykke.husnr,
            "roadCode": data[i].adgangsadresse.vejstykke.kode,
            "postalCode": data[i].adgangsadresse.postnummer.nr,
            "cityName": data[i].adgangsadresse.postnummer.navn,
            "commune": data[i].adgangsadresse.kommune.navn,
            "region": data[i].adgangsadresse.region.navn,
        }) 
      }
      console.log(formattedJsonData[0]);
      return res.send(formattetJsonData);
    })
  .catch((error) => {
    console.log(error);
    res.send('Error:', error);
  }); 
}); 
*/



module.exports = router;
