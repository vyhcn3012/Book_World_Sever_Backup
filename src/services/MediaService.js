'use strict';
const autoBind = require('auto-bind');
const { HttpResponse } = require('../../system/helpers/HttpResponse');
const mongoose = require('mongoose');
const { Service } = require('../../system/services/Service');
var path = require("path");
const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "cao-ng-fpt-polytechnic",
  api_key: "811123551641114",
  api_secret: "6DMIjAlUUCS8tRoJrDNSd_yqqCg",
});
const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);

class MediaService extends Service{
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async createImage(file) {
        try {
          console.log(file);
          if (!file) {
            throw new Error("Image is not presented!");
          }
         
          const file64 = formatBufferTo64(file);
          const uploadResult = await cloudinaryUpload(file64.content);
          const response = {
            cloudinaryId: uploadResult.public_id,
            url: uploadResult.secure_url,
          };
          return new HttpResponse(response);
          
        } catch (e) {
          return res.status(422).send({ message: e.message });
        }
      }
    



}
module.exports = { MediaService };