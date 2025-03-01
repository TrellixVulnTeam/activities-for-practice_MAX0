var essentials = {
  drink: "water",
  eat: "snickers",
  fun: "phone",
  friend: "facebook"
};

var nicetohaves = {
  tools: ["can opener", "flashlight", "matches"],
  safety: ["first aid kit", "gloves"]
};

var nonessentials = {
  cookware: "wafflemaker"
};

// module.exports is essentially an object that we can add data or variables to
// We can access them from other files using the 'require' keyword.

module.exports = {
	essentials: essentials,
	nicetohaves: nicetohaves
}
