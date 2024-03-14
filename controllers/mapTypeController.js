const MapType = require("../models/maptype");
const asyncHandler = require("express-async-handler");

// Display list of all maptypes.
exports.maptype_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: maptype list");
});

// Display detail page for a specific maptype.
exports.maptype_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: maptype detail: ${req.params.id}`);
});

// Display maptype create form on GET.
exports.maptype_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: maptype create GET");
});

// Handle maptype create on POST.
exports.maptype_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: maptype create POST");
});

// Display maptype delete form on GET.
exports.maptype_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: maptype delete GET");
});

// Handle maptype delete on POST.
exports.maptype_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: maptype delete POST");
});

// Display maptype update form on GET.
exports.maptype_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: maptype update GET");
});

// Handle maptype update on POST.
exports.maptype_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: maptype update POST");
});
