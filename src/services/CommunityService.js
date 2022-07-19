'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const config = require('../../config/config').getConfig();

const request = require('request');

class CommunityService extends Service{
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }
    async cpanel_GetAll(query) {
        let { skip, limit, sortBy } = query;

        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { 'createdAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;

        // must call redis first

        try {
            const community = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit)
               
            // console.log(deps)
            return community;
        } catch (errors) {
            throw errors;
        }

    }

 
}

module.exports = { CommunityService };