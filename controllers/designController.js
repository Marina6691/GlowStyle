const connection = require('../config/db')
class DesignController{
 createDesign = (req,res) => {
  const {designer_id} = req.params;
  const {design_name, genre, fabric, color, prenda, descripcion} = req.body;
  let sql = 'INSERT INTO design (designer_id, design_name, genre, fabric, color, clothing_type, design_description) VALUES (?,?,?,?,?,?,?)'
  let values = [designer_id, design_name, genre, fabric, color, prenda, descripcion];
  if (req.file){
    sql = 'INSERT INTO design (designer_id, design_name, genre, fabric, color, clothing_type, design_description, design_img) VALUES (?,?,?,?,?,?,?,?)'
    values = [designer_id, design_name, genre, fabric, color, prenda, descripcion, req.file.filename];
  }
  connection.query(sql, values, (err, result) => {
    if(err){
      throw err
    }else{
      res.redirect(`/designer/profile/${designer_id}`)
    }
  })
  
 }
 designProfile = (req,res)=>{
  const {id} = req.params;
  let sql = 'SELECT * FROM design WHERE design_id = ? and design_is_deleted = 0';
  connection.query(sql,[id], (err, result)=>{
    if(err){
      throw err;
    }else{
      res.render("designProfile", {result: result[0]})
    }
     
  })
  
 }
  editProfile = (req, res) =>{
    const {id} = req.params;
    let sql = 'select * from design where design_id = ? and design_is_deleted = 0';
    connection.query(sql, [id], (err,result)=>{
      if (err){
        throw err
      }else{
        res.render("editDesignProfile",{result:result[0]})
        
      }
    })

  }
  editProfilePost = (req,res)=>{
    
    const {id, des_id} = req.params;
    const {design_name, genre, fabric, color, clothing_type, design_description} = req.body;
    let sql = ' UPDATE design SET design_name = ?, genre = ?, fabric = ?, color = ?, clothing_type = ?, design_description = ? where design_id = ?';
    let values =[design_name, genre, fabric, color, clothing_type, design_description, id];
    
    console.log("bodyyyyyyyyyyyyyyy",req.body);
    console.log("paramssssssssssss", req.params);
    connection.query(sql,values,(err, result)=>{
      
      if(err){
        throw err
      }else{
        res.redirect(`/designer/profile/${des_id}`)
      }
    })
    
  }
  elimLogic = (req,res)=>{
    const{id, des_id} = req.params;
    let sql = 'update design set design_is_deleted = 1 where design_id =?'
    connection.query(sql, [id], (err,result)=>{
      if(err){
        throw err
      }else{
        res.redirect(`/designer/profile/${des_id}`)
      }
       
    })
  }
  elimTotal = (req,res)=>{
    const{id, des_id} = req.params;
    let sql = 'DELETE FROM design where design_id = ?'
    connection.query(sql, [id], (err,result)=>{
      if(err){
        throw err
      }else{
        res.redirect(`/designer/profile/${des_id}`)
      }
       
    })
  }

  doSearch = (req, res) => {
    const { query } = req.query;

    const sql =`
      SELECT *
      FROM design
      WHERE
          design_name LIKE ?
          OR genre LIKE ?
          OR fabric LIKE ?
          OR color LIKE ?
          OR clothing_type LIKE ?`
    ;

    connection.query(
      sql,
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.render('search', { result: results, query });
      }
    );
  };

}

module.exports = new DesignController();