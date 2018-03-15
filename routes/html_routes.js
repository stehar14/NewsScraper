module.exports = function(app) {
  app.get('/', function(req, res) {
    console.log('/ get request received')
    res.render("home");
  });
  
  app.get('/headlines', function (req, res) {
    console.log('/headlines get request received')
    // var category_id= req.params.id;
    // db.Thread.findAll({
    //   include : [db.User, db.Reply],
    //   where: {
    //     CategoryId: category_id
    //   }
    // }).then(function (dbThread) {
    //   res.render('forum', {threads: dbThread})
    //   // res.render? for the profile page?
    // })
    res.render("headlines");
  })
};