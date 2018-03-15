module.exports = function(app) {
  app.get('/', function(req, res) {
    console.log('/ get request received')
    res.render("home");
  });
  
  app.get('/articles', function (req, res) {
    console.log('/articles get request received')
    var category_id= req.params.id;
    db.Thread.findAll({
      include : [db.User, db.Reply],
      where: {
        CategoryId: category_id
      }
    }).then(function (dbThread) {
      res.render('forum', {threads: dbThread})
      // res.render? for the profile page?
    })
  })
};