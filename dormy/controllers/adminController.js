
const db = require('../config/database');

// module.exports.dashboard = (req, res) => {
//     db.any(`SELECT * FROM listings WHERE NOT approved`)
//         .then(data => {
//             res.render('admin/dashboard',{
//             listing: data,
//         });
    
//     })
//     .catch(err => res.send(`Error retrieving approved listings; ${err}`))
// };

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

    db.one(`UPDATE listings SET approved = TRUE WHERE id = ${req.params.id}`)
    .then(data => {
        res.render('dashboard', {
            listing: data,
        });
    })
    .catch(err => res.send(`Error retrieving listing detail; ${err}`));
}
module.exports.reject = (req, res) => {
    db.one(`DELETE FROM listings WHERE id = ${req.params.id}`)
    .then(data => {
        res.render('dashboard', {
            listing: data,
        });
    })
    .catch(err => res.send(`Error retrieving listing detail; ${err}`));
}