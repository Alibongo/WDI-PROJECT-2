const Accident = require('../models/accident');

function accidentsIndex(req, res) {
  Accident.find((err, accidents)=>{
    if (err) return res.status(500).send();
    return res.status(200).json(accidents);
  });
}

module.exports ={
  index: accidentsIndex
};
