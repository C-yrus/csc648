
const db = require('../config/database');


module.exports.dashboard = (req, res) => {
    db.task('get-all', t => {
        return t.batch([
            t.any(`SELECT * FROM listings WHERE NOT approved`),
            t.any(`SELECT * FROM listings WHERE approved`),
            t.any(`SELECT * FROM users`)
        ])
    })
        .then(data => {
            res.render('admin/dashboard', {
                user: req.user,
                pending: data[0],
                listings: data[1],
                users: data[2]
            });
        })
        .catch(err => res.send(`Error retrieving listing detail; ${err}`));
};
module.exports.login = (req, res) => {
    res.render('admin/login.html');
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
module.exports.accept = (req, res) => {
    var query = "UPDATE listings SET approved = TRUE where id = ";
    var id = req.body.id;
    query = query.concat(id);
    db.any(query)
    .then( function () {
        res.redirect('/admin');
        //success
        // res.redirect('admin/dashboard', { //i know this shouldn't work, it's just placeholder until the request works with variables
        //     listing: data,
        // });
    })
    .catch(err => res.send(`Error retrieving listing detail; ${err}`));
}
module.exports.reject = (req, res) => {
    var query = "DELETE FROM listings WHERE id = ";
    var id = req.body.id;
    query = query.concat(id);
    db.any(query)
    .then(function () {
        res.redirect('/admin');
    })
    .catch(err => res.send(`Error retrieving listing detail; ${err}`));
}

module.exports.block = (req, res) => {
    var query = "UPDATE users SET banned = TRUE WHERE id = ";
    var id = req.body.id;
    query = query.concat(id);
    db.any(query)
    .then(function () {
        res.redirect('/admin');
    })
    .catch(err => res.send(`Error retrieving listing detail; ${err}`));
}

module.exports.deleteUser = (req, res) => {
    var query = "DELETE FROM users WHERE id = ";
    var id = req.body.id;
    query = query.concat(id);
    db.any(query)
    .then(function () {
        res.redirect('/admin');
    })
    .catch(err => res.send(`Error retrieving listing detail; ${err}`));
}

module.exports.deleteListing = (req, res) => {
    var query = "DELETE FROM listings WHERE id = ";
    var id = req.body.id;
    query = query.concat(id);
    db.any(query)
    .then(function () {
        res.redirect('/admin');
    })
    .catch(err => res.send(`Error retrieving listing detail; ${err}`));
}
