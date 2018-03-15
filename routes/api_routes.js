module.exports = function(app) {
// Route to post our form submission to mongoDB via mongoose
    app.post("/scrape", function(req, res) {
        // Create a new user using req.body
        console.log(req.body);
    
        Headline.create(headline)
        .then(function(dbHeadline) {
            // If saved successfully, send the the new Headline document to the client
            res.json(dbHeadline);
        })
        .catch(function(err) {
            // If an error occurs, send the error to the client
            res.json(err);
        });
    });
};