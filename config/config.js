require('dotenv').config();

module.exports = {
  db: {
    development: process.env.DB_URL || 'ongodb+srv://Krean_Rathana123@rathanaclouddb.fj7r8.mongodb.net/ChatApp?retryWrites=true&w=majority',
    product: 'ongodb+srv://Krean_Rathana:123@rathanaclouddb.fj7r8.mongodb.net/ChatApp?retryWrites=true&w=majority',
    test: 'ongodb+srv://Krean_Rathana:123@rathanaclouddb.fj7r8.mongodb.net/ChatApp?retryWrites=true&w=majority',
  }
};