const data = require('../heroes.json');

module.exports = (req, res) => {
  res.status(200).json(data);
}