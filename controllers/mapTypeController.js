const MapType = require("../models/maptype");
const asyncHandler = require("express-async-handler");

// Display list of all maptypes.
exports.maptype_list = asyncHandler(async (req, res, next) => {
    const allMapTypes = await MapType.find().sort({ name: 1 }).exec();
    res.render("maptype_list", {
      title: "Map Type List",
      maptype_list: allMapTypes,
    });
});

// Display detail page for a specific maptype.
exports.maptype_detail = asyncHandler(async (req, res, next) => {
    const [maptype] = await Promise.all([
    MapType.findById(req.params.id).exec(),
  ]);

  if (maptype === null) {
    const err = new Error("Map type not found");
    err.status = 404;
    return next(err);
  }

  res.render("maptype_detail", {
    maptype: maptype,
  });
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
