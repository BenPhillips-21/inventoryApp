const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CartographerSchema = new Schema ({
    first_name: { type: String, required: true, maxLength: 30 },
    family_name: { type: String, required: true, maxLength: 30 },
    portrait: { type: String, required: true },
    nationality: { type: String, required: true},
    description: { type: String, required: true},
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
})


CartographerSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

CartographerSchema.virtual("url").get(function () {
  return `/catalog/cartographer/${this._id}`;
});

CartographerSchema.virtual("DOB").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
})

CartographerSchema.virtual("DOD").get(function () {
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Cartographer", CartographerSchema);