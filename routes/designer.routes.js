const express = require ('express');
const designerController = require('../controllers/designerController');
const uploadFile = require('../middleware/uploadFile');
const router = express.Router();

// ruta que abre el formulario
 //http://localhost:4000/designer/register
router.get('/register',  designerController.showRegister);
router.post('/registerPost', uploadFile("designers"), designerController.registerPost);
//http://localhost:4000/designer/loginForm   log in
router.get('/loginForm',designerController.showLogin); 
router.post('/login', designerController.login);
//http://localhost:4000/designer/profile/:id
router.get('/profile/:id', designerController.profile);
// ruta que me lleva al formulario de nuevo diseño
router.get('/FormNewDesign/:id', designerController.formNewDesign );


module.exports = router;