var express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');

require('dotenv').config();

var fs= require('fs');
var app = express();
var bodyParser = require('body-parser');
const parser= bodyParser.urlencoded({ extended: false })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload({
    createParentPath: true
}));


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',parser,(req,res)=>{
  try{
    res.json(
      {
      name:req.files.upfile.name,
      type:req.files.upfile.mimetype,
      size:req.files.upfile.size
      });
  }
  catch{
    res.json({
      error:"upload failed!"
    })
  }
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
