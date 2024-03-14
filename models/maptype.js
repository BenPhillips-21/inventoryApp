const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MapTypeSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  description: { type: String, required: true, minLength: 5 },
});

MapTypeSchema.virtual("url").get(function () {
  return `/catalog/maptype/${this._id}`;
});

module.exports = mongoose.model("MapType", MapTypeSchema);