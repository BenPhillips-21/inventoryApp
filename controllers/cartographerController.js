const Cartographer = require("../models/cartographer");
const asyncHandler = require("express-async-handler");

// Display list of all cartographers.
exports.cartographer_list = asyncHandler(async (req, res, next) => {
  const allCartographers = await Cartographer.find().sort({ family_name: 1 }).exec();
    res.render("cartographer_list", {
      title: "Cartographer List",
      cartographer_list: allCartographers,
    });
});

// Display detail page for a specific cartographer.
exports.cartographer_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: cartographer detail: ${req.params.id}`);
});

// Display cartographer create form on GET.
exports.cartographer_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cartographer create GET");
});

// Handle cartographer create on POST.
exports.cartographer_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cartographer create POST");
});

// Display cartographer delete form on GET.
exports.cartographer_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cartographer delete GET");
});

// Handle cartographer delete on POST.
exports.cartographer_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cartographer delete POST");
});

// Display cartographer update form on GET.
exports.cartographer_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cartographer update GET");
});

// Handle cartographer update on POST.
exports.cartographer_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cartographer update POST");
});
