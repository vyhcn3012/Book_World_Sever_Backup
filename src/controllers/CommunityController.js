const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { Community } = require('../models/Community');
const { CommunityService } = require('../services/CommunityService');
const { Server } = require('socket.io');
const communityService = new CommunityService(new Community().getInstance());

class CommunityController extends Controller {

    constructor(service) {
        super(service);
        autoBind(this);
    }


    async getAllCommunity(req, res, next) {a
        try {
            const sortBy= {"numMember":-1};
            const response = await this.service.getAll({ limit: 1000,sortBy:sortBy });

            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
    async getAllCommunityOfUser(req, res, next) {
        try {
            const { account } = req.params;
            console.log(account);
            const response = await this.service.getAll({limit:1000,account:account});
          
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
   
}

module.exports = new CommunityController(communityService);