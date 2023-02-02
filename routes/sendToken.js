// const express = require("express");
// const router = express.Router();
// const mysql = require("../mysqlNewApi").pool;
// //Visualiza nomes
// router.get("/", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query("SELECT * FROM comments;", (error, resultado, field) => {
//       if (error) {
//         return res.status(500).send({ error: error });
//       }
     
//       return res.status(200).send({ message: resultado });
//     });
//   });
// });

// module.exports = router;
