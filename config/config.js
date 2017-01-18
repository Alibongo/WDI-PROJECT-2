//db name etc
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONG 'mongodb://localhost/cycle-app',
  secret: process.env.SECRET || 'Secret hush hush'
};
