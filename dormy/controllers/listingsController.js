const db = require('../config/database');

module.exports.list = (req, res) => {
    let type = req.query.type;
    let query = req.query.query;
    db.any(`SELECT * FROM listings WHERE type LIKE '%${type}%' OR title LIKE '%${query}%'`)
        .then(data => {
            res.render('listings', {
                listings: data
            });
        })
        .catch(err => res.send(`Error retrieving listings; ${err}`));
};
