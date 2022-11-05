"use strict";
const autoBind = require("auto-bind");
const { HttpResponse } = require("../../system/helpers/HttpResponse");
const mongoose = require("mongoose");
const { Service } = require("../../system/services/Service");
class CartService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
    autoBind(this);
  }


  async createCart(body) {
    try {
        const item = await this.model.create(body);
          if (item) {
              return new HttpResponse(item);
          }
          throw new Error('Có lỗi, bạn có thể thử lại sau');
      
    } catch (error) {
        throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
    }
  }


}
module.exports = { CartService };
