//db name etc
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost/cycle-app',
  secret: process.env.SECRET || 'Secret hush hush'
};
