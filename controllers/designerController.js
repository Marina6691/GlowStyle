const connection = require('../config/db');
const bcrypt = require('bcrypt');

class DesignerController {
  showRegister = (req, res) => {
    res.render('register', { message: '' });
  };

  registerPost = (req, res) => {
    console.log('bodyyyyyyyyyy', req.body);
    const { name, lastname, email, designer_description, password,  repPassword } = req.body;

    if (!name || !lastname || !email || !password || !repPassword) {
      res.render('register', { message: 'algún campo está incompleto' });
    } else {
      if (password !== repPassword) {
        res.render('register', { message: 'las constraseñas no coinciden' });
      } else {
        // encriptar -- hashear
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            throw err;
          } else {
            console.log('haaaaaaaaaaaaaaaaaaash', hash);
            let sql =
              'INSERT INTO designer (designer_name, designer_lastname, designer_description, email, password) VALUES (?,?,?,?,?)';
            let values = [name, lastname, designer_description, email, hash];
            if (req.file){
              sql =  'INSERT INTO designer (designer_name, designer_lastname, designer_description, email, password, designer_img) VALUES (?,?,?,?,?,?)';
              values = [name, lastname, designer_description, email, hash, req.file.filename];
            } 
              
            connection.query(sql, values, (errSql, result) => {
              if (errSql) {
                if (errSql.errno === 1062) {
                  res.render('register', {
                    message: 'Email en uso, introduce otro ',
                  });
                } else {
                  throw errSql;
                }
              } else {
                res.redirect('/designer/loginForm');
              }
            });
          }
        });
      }
    }
  };
  showLogin = (req, res) => {
    res.render('login', { message: '' }); // mensaje vacío para poder poner el mensaje de login
  };

  login = (req, res) => {
    const { email, password } = req.body;
    //verificar los datos
    if (!email || !password) {
      res.render('login', { message: 'Debes rellenar todos los campos' });
    } else {
      // preguntar a la base de datos si el email existe
      let sql =
        'SELECT * FROM designer WHERE email =? AND designer_is_deleted = 0';
      connection.query(sql, [email], (err, result) => {
        if (err) {
          throw err;
        } else {
          
          if(result.length == 0){
            res.render("login", {message: "El email no existe"})
          }else{
            //comrpuebo que la contraseña coincide // el resultado anterior en posicion 0.password
            let hash = result[0].password;
            bcrypt.compare(password, hash,(errHash, resultCompare) => {
              if(errHash){
                throw errHash
              }else{
                if(!resultCompare){
                  res.render("login", {message:"contraseña incorrecta"})
                }else{
                  res.redirect(`/designer/profile/${result[0].designer_id}`);

                }
              }
        
              
            })

          }
        }
      });
     
    }
  };

  profile = (req,res) => {
    const{id} = req.params;
    let sqlDesigner = 'SELECT * FROM designer where designer_id = ? and designer_is_deleted = 0'

    connection.query(sqlDesigner, [id], (err,result) => {      // pedir los diseños
      if (err){
        throw err
      }else{
        let sqlDesign = ' SELECT * FROM design where designer_id =? and design_is_deleted = 0'
        connection.query(sqlDesign, [id], (err2, designs)=>{
          if (err2){
            throw err2
          }else{
            console.log(designs);
           res.render("profile", {result: result[0], designs});

          }
        })
        

      }
    })
    
  }
  // abre el formulatio para insertar diseño y paso los datos del diseñador
  formNewDesign = (req,res) => {
    const{id} = req.params;
    let sql = 'SELECT * FROM designer where designer_id = ? and designer_is_deleted = 0'
    connection.query(sql, [id], (err,result)=>{
      if (err){
        throw err
      }else{
        
        res.render("formNewDesign", {result: result[0]});

      }
    })
    
    

  }

  
}

module.exports = new DesignerController();
