'use strict';
const autoBind = require('auto-bind');
const { HttpResponse } = require('../../system/helpers/HttpResponse');
const mongoose = require('mongoose');
const { Service } = require('../../system/services/Service');


class MediaService extends Service{
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }
    



}
module.exports = { MediaService };