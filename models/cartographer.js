const mongoose = require("mongoose")
const { DateTime } = require("luxon");

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
    fullname = `${this.first_name} ${this.family_name}`;
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

CartographerSchema.virtual("formattedDOB").get(function () {
  const luxonDate = DateTime.fromJSDate(this.date_of_birth);
  const formattedDate = luxonDate.toFormat('yyyy-MM-dd');
  return formattedDate;
});

CartographerSchema.virtual("formattedDOD").get(function () {
  const luxonDate = DateTime.fromJSDate(this.date_of_death);
  const formattedDate = luxonDate.toFormat('yyyy-MM-dd');
  return formattedDate;
});

module.exports = mongoose.model("Cartographer", CartographerSchema);