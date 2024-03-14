const Map = require("../models/map");
const asyncHandler = require("express-async-handler");

// Display list of all maps.
exports.index = asyncHandler(async (req, res, next) => {
  res.send("Index not implemented")
})

exports.map_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: map list");
});

// Display detail page for a specific map.
exports.map_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: map detail: ${req.params.id}`);
});

// Display map create form on GET.
exports.map_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: map create GET");
});

// Handle map create on POST.
exports.map_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: map create POST");
});

// Display map delete form on GET.
exports.map_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: map delete GET");
});

// Handle map delete on POST.
exports.map_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: map delete POST");
});

// Display map update form on GET.
exports.map_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: map update GET");
});

// Handle map update on POST.
exports.map_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: map update POST");
});
