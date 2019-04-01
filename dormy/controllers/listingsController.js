const db = require('../config/database');

module.exports.list = (req, res) => {
    db.any('SELECT * FROM listings')
        .then(data => {
            res.render('listings', {
                listings: data
            });
        })
        .catch(err => {
            res.send(`Error fetching all listings; ${err}`)
        });
};
