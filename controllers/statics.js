//one function. uploads to index.html
//get request to the home url
//module.export

module.exports = {
  home: staticsHome
};

const path = require('path');

function staticsHome (req, res){
  return res.sendFile(path.join(__dirname,'../index.html'));
}
