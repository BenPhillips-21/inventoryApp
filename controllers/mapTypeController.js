const MapType = require("../models/maptype");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  res.render("maptype_form", { title: "Create Map Type" })
});

// Handle maptype create on POST.
exports.maptype_create_post = [
  body("name", "Map type name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Map description must contain at least 10 characters")
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const maptype = new MapType({ name: req.body.name, description: req.body.description });

    if (!errors.isEmpty()) {
      res.render("maptype_form", {
        title: "Create Map Type",
        maptype: maptype,
        errors: errors.array(),
      });
      return;
    } else {
      const maptypeExists = await MapType.findOne({ name: req.body.name }).exec();
      if (maptypeExists) {
        res.redirect(maptypeExists.url);
      } else {
        await maptype.save();
        res.redirect(maptype.url);
      }
    }
  }),
];

// Display maptype delete form on GET.
exports.maptype_delete_get = asyncHandler(async (req, res, next) => {
  const [maptype] = await Promise.all([
    MapType.findById(req.params.id).exec(),
  ]);

  if (maptype === null) {
    res.redirect("/catalog/maptypes");
  }

  res.render("maptype_delete", {
    title: "Delete maptype",
    maptype: maptype,
  });
});

// Handle maptype delete on POST.
exports.maptype_delete_post = asyncHandler(async (req, res, next) => {
  const [maptype] = await Promise.all([
    MapType.findById(req.params.id).exec(),
  ]);

  if (maptype === null) {
    res.redirect("/catalog/maptypes");
  }

    await MapType.findByIdAndDelete(req.body.maptypeid);
    res.redirect("/catalog/maptypes");
});

// Display maptype update form on GET.
exports.maptype_update_get = asyncHandler(async (req, res, next) => {
  const [maptype] = await Promise.all([
    MapType.findById(req.params.id).exec(),
  ]);

  if (maptype === null) {
    const err = new Error("maptype not found");
    err.status = 404;
    return next(err);
  }

  res.render("maptype_form", {
    title: "Update Map Type",
    maptype: maptype,
  });
});

// Handle maptype update on POST.
exports.maptype_update_post = [
  body("name", "Map type name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Map description must be specified")
    .trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    let maptype = {
      name: req.body.name,
      description: req.body.description
    }

    if (!errors.isEmpty()) {
      res.render("maptype_form", {
        title: "Update Map Type",
        maptype: maptype,
        errors: errors.array(),
      });
      return;
    }
      const updatedMaptype = await MapType.findByIdAndUpdate(
        req.params.id, maptype, {}
      );

      // Redirect to the updated map type's URL
      res.redirect(updatedMaptype.url);
  })
];

