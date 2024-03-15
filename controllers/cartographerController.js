const Cartographer = require("../models/cartographer");
const { body, validationResult } = require("express-validator");
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
    const [cartographer] = await Promise.all([
    Cartographer.findById(req.params.id).exec(),
  ]);

  if (cartographer === null) {
    const err = new Error("Cartographer not found");
    err.status = 404;
    return next(err);
  }

  res.render("cartographer_detail", {
    title: cartographer.name,
    cartographer: cartographer,
  });
});

// Display cartographer create form on GET.
exports.cartographer_create_get = (req, res, next) => {
  res.render("cartographer_form", { title: "Create Cartographer" });
};

// Handle cartographer create on POST.
exports.cartographer_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("portrait")
    .trim()
    .isLength({ min: 1 }),
  body("nationality")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description")
    .trim()
    .isLength({ min: 15 })
    .escape(),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    let cartographer = new Cartographer({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      portrait: req.body.portrait,
      nationality: req.body.nationality,
      description: req.body.description,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      res.render("cartographer_form", {
        title: "Create Cartographer",
        cartographer: cartographer,
        errors: errors.array(),
      });
      return;
    } else {
      await cartographer.save();
      res.redirect(cartographer.url);
    }
  }),
];

// Display cartographer delete form on GET.
exports.cartographer_delete_get = asyncHandler(async (req, res, next) => {
  const [cartographer] = await Promise.all([
    Cartographer.findById(req.params.id).exec(),
  ]);

  if (cartographer === null) {
    res.redirect("/catalog/cartographers");
  }

  res.render("cartographer_delete", {
    title: "Delete cartographer",
    cartographer: cartographer,
  });
});

// Handle cartographer delete on POST.
exports.cartographer_delete_post = asyncHandler(async (req, res, next) => {
  const [cartographer] = await Promise.all([
    Cartographer.findById(req.params.id).exec(),
  ]);

  if (cartographer === null) {
    res.redirect("/catalog/cartographers");
  }

    await Cartographer.findByIdAndDelete(req.body.cartographerid);
    res.redirect("/catalog/cartographers");
});

// Display cartographer update form on GET.
exports.cartographer_update_get = asyncHandler(async (req, res, next) => {
  const [cartographer] = await Promise.all([
    Cartographer.findById(req.params.id).exec(),
  ]);

  if (cartographer === null) {
    const err = new Error("Cartographer not found");
    err.status = 404;
    return next(err);
  }

  res.render("cartographer_form", {
    title: "Update Cartographer",
    cartographer: cartographer,
  });
});

exports.cartographer_update_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified."),
  body("portrait")
    .trim()
    .isLength({ min: 1 }),
  body("nationality")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description")
    .trim()
    .isLength({ min: 15 })
    .escape(),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    let cartographer = {
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      portrait: req.body.portrait,
      nationality: req.body.nationality,
      description: req.body.description,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    };

    if (!errors.isEmpty()) {
      res.render("cartographer_form", {
        title: "Update Cartographer",
        cartographer: cartographer,
        errors: errors.array(),
      });
      return;
    }

    try {
      let updatedCartographer = await Cartographer.findByIdAndUpdate(
        req.params.id,
        cartographer,
        { new: true }
      );

      res.redirect(updatedCartographer.url);
    } catch (err) {
      console.error(err);
      // Handle the error appropriately
    }
  }),
];
