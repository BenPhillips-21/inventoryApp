#! /usr/bin/env node

console.log(
  'This script populates the database with some maps, cartographers, and map types.'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Map = require("./models/map");
const Cartographer = require("./models/cartographer");
const MapType = require("./models/maptype");

const maptypes = [];
const cartographers = [];
const maps = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMapTypes();
  await createCartographers();
  await createMaps();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function maptypeCreate(index, name, description) {
  const maptype = new MapType({ name: name, description: description });
  await maptype.save();
  maptypes[index] = maptype;
  console.log(`Added maptype: ${name}`);
}

async function cartographerCreate(index, first_name, family_name, portrait, nationality, description, date_of_birth, date_of_death) {
  let DOB = new Date(date_of_birth)
  let DOD = new Date(date_of_death)

  const cartographerdetail = 
  { first_name: first_name, 
    family_name: family_name,
    portrait: portrait,
    nationality: nationality,
    description: description,
    date_of_birth: DOB,
    date_of_death: DOD
  };

  const cartographer = new Cartographer(cartographerdetail);

  await cartographer.save();
  cartographers[index] = cartographer;
  console.log(`Added cartographer: ${first_name} ${family_name}`);
}

async function mapCreate(index, title, image, year_published, description, cartographer, maptype) {
  const mapdetail = {
    title: title,
    image: image,
    year_published: year_published,
    description: description,
    cartographer: cartographer,
    maptype: maptype
  };

  const map = new Map(mapdetail);
  await map.save();
  maps[index] = map;
  console.log(`Added map: ${title}`);
}

async function createMapTypes() {
  console.log("Adding map types");
  await Promise.all([
    maptypeCreate(0, "General Reference", "General reference maps provide a variety of information and are used for general reference purposes."),
    maptypeCreate(1, "Topographic Maps", "Topographic maps represent the physical features of an area, including elevation contours, rivers, forests, etc."),
    maptypeCreate(2, "Thematic", "Thematic maps focus on a specific theme or subject, such as population density, climate, or land use."),
    maptypeCreate(3, "Navigation Charts", "Navigation charts are specialized maps used for marine or aerial navigation, providing information on water depths, hazards, and navigational aids."),
    maptypeCreate(4, "Cadastral Maps and Plans", "Cadastral maps and plans show the boundaries of land parcels, ownership, and land use, often used in property assessments and land management.")
  ]);
}

async function createCartographers() {
  console.log("Adding cartographers");
  await Promise.all([
    cartographerCreate(0, "Matthew", "Flinders", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Toussaint_Antoine_DE_CHAZAL_DE_Chamerel_-_Portrait_of_Captain_Matthew_Flinders%2C_RN%2C_1774-1814_-_Google_Art_Project.jpg/800px-Toussaint_Antoine_DE_CHAZAL_DE_Chamerel_-_Portrait_of_Captain_Matthew_Flinders%2C_RN%2C_1774-1814_-_Google_Art_Project.jpg", "English", "Distinguished navigator, cartographer, and explorer who played a significant role in the exploration and mapping of Australia in the early 19th century.", "1774-03-16", "1814-07-19"),
    cartographerCreate(1, "Louis de", "Freycinet", "https://upload.wikimedia.org/wikipedia/commons/e/ec/Louis_Claude_de_Saulces_de_Freycinet.jpg", "French", "Explorer, navigator, and cartographer known for his significant contributions to scientific exploration and mapping in the early 19th century. Freycinet served as a naval officer and participated in several expeditions, most notably the Baudin expedition to Australia from 1800 to 1804 aboard the ships Naturaliste and Géographe.", "1779-08-07", "1841-08-18"),
    cartographerCreate(2, "Jacques-Nicolas", "Bellin", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Guillaume_Deslile_AGE_1802.jpg/640px-Guillaume_Deslile_AGE_1802.jpg", "French", "Prominent hydrographer, geographer, and cartographer known for his significant contributions to maritime cartography during the 18th century. Bellin served as the official hydrographer to the French king, Louis XV, and as an engineer of the French Navy.",  "1703-01-01", "1972-03-21"),
  ]);
}

async function createMaps() {
  console.log("Adding Maps");
  await Promise.all([
    mapCreate(0,
      "General chart of Terra Australis",
      "https://www.sl.nsw.gov.au/sites/default/files/a082001h.jpg",
      1814,
      "Chart of Australia completed after Flinders' circumnavigation of the island from 1802-1803.",
      cartographers[0],
      [maptypes[0]]
    ),
    mapCreate(1,
      "The Freycinet Map",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/1811_Freycinet_Map.jpg/1280px-1811_Freycinet_Map.jpg",
      1811,
      "The Freycinet Map of 1811 is the first map of Australia to be published which shows the full outline of Australia.[1] It was drawn by Louis de Freycinet and was an outcome of the Baudin expedition to Australia. It preceded the publication of Matthew Flinders' map of Australia, Terra Australis or Australia, by three years.",
      cartographers[1],
      [maptypes[0]]
    ),
    mapCreate(2,
      "Carte Reduite des Terres Australes (Reduced Map of the Southern Lands)",
      "https://www.classicalimages.com/cdn/shop/products/82079-1.jpg?v=1689919360",
      1753,
      "One of the very few pre-Cook maps showing only Australia. Drawn in the French cartographic tradition known as theoretical geography... the east coast of Australia is shown as an imaginary line running from Terre de Diemen to Nouvelle Guinee and including Espiritu Santo",
      cartographers[2],
      [maptypes[3]]
    ),
  ]);
}