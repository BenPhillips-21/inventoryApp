const Map = require("../models/map");
const MapType = require ("../models/maptype");
const Cartographer = require("../models/cartographer");

const { body, validationResult } = require("express-validator");
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
  const [map] = await Promise.all([
    Map.findById(req.params.id).populate("cartographer").populate("maptype").exec(),
  ]);

  if (map === null) {
    const err = new Error("Map not found");
    err.status = 404;
    return next(err);
  }

  res.render("map_detail", {
    title: map.title,
    map: map,
  });
});

// Display map create form on GET.
exports.map_create_get = asyncHandler(async (req, res, next) => {
    const [allCartographers, allMapTypes] = await Promise.all([
    Cartographer.find().sort({ family_name: 1 }).exec(),
    MapType.find().sort({ name: 1 }).exec(),
  ]);

  res.render("map_form", {
    title: "Create Map",
    cartographers: allCartographers,
    maptypes: allMapTypes,
  });
});

// Handle map create on POST.
exports.map_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.maptype)) {
      console.log(req.body.maptype)
      req.body.maptype =
        typeof req.body.maptype === "undefined" ? [] : [req.body.maptype];
    }
    console.log(req.body.maptype)
    next();
  },

  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("cartographer", "cartographer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("image", "image must not be empty.")
    .trim()
    .isLength({ min: 1 }),
  body("year_published", "Year published must not be empty.")
    .toFloat()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "description must not be empty").trim().isLength({ min: 1 }).escape(),
  body("maptype.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const map = new Map({
      title: req.body.title,
      cartographer: req.body.cartographer,
      image: req.body.image,
      year_published: req.body.year_published,
      description: req.body.description,
      maptype: req.body.maptype,
    });

    if (!errors.isEmpty()) {
      const [allCartographers, allMaptypes] = await Promise.all([
        Cartographer.find().sort({ family_name: 1 }).exec(),
        MapType.find().sort({ name: 1 }).exec(),
      ]);

      for (const maptype of allMaptypes) {
        if (map.maptype.includes(maptype._id)) {
          maptype.checked = "true";
        }
      }
      res.render("map_form", {
        title: "Create map",
        cartographers: allCartographers,
        maptypes: allMaptypes,
        map: map,
        errors: errors.array(),
      });
    } else {
      await map.save();
      res.redirect(map.url);
    }
  }),
];

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
