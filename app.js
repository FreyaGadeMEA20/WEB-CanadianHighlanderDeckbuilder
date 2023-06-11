const express = require('express');
const app = express();
const fs = require('fs');
const path = require("path");
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname+'/public')))

app.post('/updateJson', (req, res) => {
    const card = req.body.card;
    const imageLink = req.body.image_link;
    const type = req.body.type;
    const color = req.body.colors;
  
    fs.readFile('public/data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading JSON file');
        return;
      }
  
      //let jsonData = {};
  
      try {
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        res.status(500).send('Error parsing JSON file');
        return;
      }
      
        try{
        // Modify the JSON data (e.g., add or remove elements)
            if(jsonData.cards.hasOwnProperty(card)){
                jsonData.cards[card].count++;
            } else {
                jsonData.cards = jsonData.cards || {};
                jsonData.cards[card] = {image:imageLink, type_line:type, colors:color, count:1};
            }
        }catch(error){
            jsonData.cards = jsonData.cards || {};
            jsonData.cards[card] = {image:imageLink, type_line:type, colors:color, count:1};
        }
      
  
      fs.writeFile('public/data.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing JSON file');
          return;
        }
        res.json({ message: 'JSON file updated successfully'});
      });
    });
  });

app.use((req,res,next)=>{
  res.status(404).send(`<h1>Error 404: Resource not found</h1>`);
});



app.listen(8080, () =>{
    console.log('Server is running at port 8080');
});

