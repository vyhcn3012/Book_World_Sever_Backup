const CPanelController = require('../../controllers/CPanelController')
const express = require( 'express' ), router = express.Router();


router.get('/', CPanelController.index )
router.post( '/auth', CPanelController.auth );
router.get( '/auth_callback', CPanelController.auth_callback );

module.exports = router;
