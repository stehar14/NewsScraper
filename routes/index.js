module.exports = function(app) {
    require("./html_routes.js")(app);
    require("./api_routes.js")(app);
};