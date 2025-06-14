const express = require('express');
const designController = require('../controllers/designController');
const uploadFile = require('../middleware/uploadFile');
const router = express.Router();

router.post('/createDesign/:designer_id', uploadFile("design"),designController.createDesign);

router.get('/designProfile/:id', designController.designProfile);// abrir un diseño 
router.get('/editDesignProfile/:id', designController.editProfile); // me abre el formulario de edición
router.post('/editDesignProfilePost/:id/:des_id', designController.editProfilePost) // lo envía en la ruta post
router.get('/elimLogic/:id/:des_id', designController.elimLogic); // eliminado lógico
router.get('/elimTotal/:id/:des_id', designController.elimTotal); // eliminado total
router.get('/search', designController.doSearch); // buscador
module.exports = router;
