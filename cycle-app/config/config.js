//db name etc
module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/cycle-app',
  secret: process.env.SECRET || 'Secret hush hush'
};
