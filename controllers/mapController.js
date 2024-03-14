const Map = require("../models/map");
const MapType = require ("../models/maptype");
const Cartographer = require("../models/cartographer");
const asyncHandler = require("express-async-handler");

// Display list of all maps.
exports.index = asyncHandler(async (req, res, next) => {
    const [
    numMaps,
    numCartographers,
    numMapTypes,
  ] = await Promise.all([
    Map.countDocuments({}).exec(),
    Cartographer.countDocuments({}).exec(),
    MapType.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Map World",
    map_count: numMaps,
    cartographer_count: numCartographers,
    maptype_count: numMapTypes,
  });
})

exports.map_list = asyncHandler(async (req, res, next) => {
  const allMaps = await Map.find({}, "title image cartographer")
    .sort({ title: 1 })
    .populate("cartographer")
    .exec();

    res.render("map_list", { title: "Map List", map_list: allMaps})
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
