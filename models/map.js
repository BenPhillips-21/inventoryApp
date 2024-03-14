const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MapSchema = new Schema ({
    title: { type: String, required: true },
    image: { type: String, required: true },
    year_published: { type: Number, required: true },
    cartographer: { type: Schema.Types.ObjectId, ref: "Cartographer", required: true},
    description: { type: String, required: true },
    maptype: [{ type: Schema.Types.ObjectId, ref: "MapType" }],
})

// Virtual for book's URL
MapSchema.virtual("url").get(function () {
  return `/catalog/map/${this._id}`;
});

// Export model
module.exports = mongoose.model("Map", MapSchema);