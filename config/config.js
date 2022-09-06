
const Sequelize = require('sequelize')
// import Sequelize from 'sequelize';
const mysql2 = require('mysql2')

// module.exports = Object.freeze({
//   MY_CONSTANT: 'some value',
//   ANOTHER_CONSTANT: 'another value'
// });

// const tableNamesCons =  {
//   record: 'record',
//   products: 'products'
// };

 
const conn = new Sequelize('foodsenso', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
conn
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

// export default db;
module.exports=conn 