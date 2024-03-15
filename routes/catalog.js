const express = require("express");
const router = express.Router();

// Require controller modules.
const map_controller = require("../controllers/mapController");
const cartographer_controller = require("../controllers/cartographerController");
const maptype_controller = require("../controllers/mapTypeController");

/// map ROUTES ///

// GET catalog home page.
router.get("/", map_controller.index);

// GET request for creating a map. NOTE This must come before routes that display map (uses id).
router.get("/map/create", map_controller.map_create_get);

// POST request for creating map.
router.post("/map/create", map_controller.map_create_post);

// GET request to delete map.
router.get("/map/:id/delete",  map_controller.map_delete_get);

// POST request to delete map.
router.post("/map/:id/delete", map_controller.map_delete_post);

// GET request to update map.
router.get("/map/:id/update", map_controller.map_update_get);

// POST request to update map.
router.post("/map/:id/update", map_controller.map_update_post);

// GET request for one map.
router.get("/map/:id", map_controller.map_detail);

// GET request for list of all map items.
router.get("/maps", map_controller.map_list);

/// cartographer ROUTES ///

// GET request for creating cartographer. NOTE This must come before route for id (i.e. display cartographer).
router.get("/cartographer/create", cartographer_controller.cartographer_create_get);

// POST request for creating cartographer.
router.post("/cartographer/create", cartographer_controller.cartographer_create_post);

// GET request to delete cartographer.
router.get("/cartographer/:id/delete", cartographer_controller.cartographer_delete_get);

// POST request to delete cartographer.
router.post("/cartographer/:id/delete", cartographer_controller.cartographer_delete_post);

// GET request to update cartographer.
router.get("/cartographer/:id/update", cartographer_controller.cartographer_update_get);

// POST request to update cartographer.
router.post("/cartographer/:id/update", cartographer_controller.cartographer_update_post);

// GET request for one cartographer.
router.get("/cartographer/:id", cartographer_controller.cartographer_detail);

// GET request for list of all cartographers.
router.get("/cartographers", cartographer_controller.cartographer_list);

/// maptype ROUTES ///

// GET request for creating a maptype. NOTE This must come before route that displays maptype (uses id).
router.get("/maptype/create", maptype_controller.maptype_create_get);

//POST request for creating maptype.
router.post("/maptype/create", maptype_controller.maptype_create_post);

// GET request to delete maptype.
router.get("/maptype/:id/delete", maptype_controller.maptype_delete_get);

// POST request to delete maptype.
router.post("/maptype/:id/delete", maptype_controller.maptype_delete_post);

// GET request to update maptype.
router.get("/maptype/:id/update", maptype_controller.maptype_update_get);

// POST request to update maptype.
router.post("/maptype/:id/update", maptype_controller.maptype_update_post);

// GET request for one maptype.
router.get("/maptype/:id", maptype_controller.maptype_detail);

// GET request for list of all maptype.
router.get("/maptypes", maptype_controller.maptype_list);

module.exports = router;
