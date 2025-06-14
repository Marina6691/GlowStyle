// requerimientos
const connection = require('../config/db')

class IndexController {
  showHome = (req, res) => {
    let sql = 'SELECT * FROM designer where designer_is_deleted = 0';
    connection.query(sql,(err,result) => {
      if(err){
        throw err
      }else{
        console.log("***************",result)
        res.render("index", {result})
      }
    })
  }
    
  };

  


module.exports = new IndexController();
