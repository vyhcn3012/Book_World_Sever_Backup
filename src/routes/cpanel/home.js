const CPanelController = require('../../controllers/CPanelController')
const express = require( 'express' ), router = express.Router();


router.get('/', CPanelController.index )
router.post( '/', CPanelController.auth );
router.get( '/auth_callback', CPanelController.callback );

module.exports = router;
