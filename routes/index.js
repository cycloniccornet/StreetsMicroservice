var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("TEst")
  await fetch('https://api.dataforsyningen.dk/adgangsadresser?q=Søndre Fasanvej' )
    .then((response) => {
      console.log("Entered code");
      console.log(response.json);
      response.json()}
      )
    .then((data) => {
      console.log(data);
      return;
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

module.exports = router;
