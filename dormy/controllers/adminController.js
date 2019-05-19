
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

module.exports.accept = (req, res) => {
    db.any(`UPDATE listings SET approved='true' WHERE id='${req.body.id}'`)
        .then(() => res.redirect(`/admin`))
        .catch(err => console.error(`Error updating listing approval column; ${err}`));
};

module.exports.reject = (req, res) => {
    db.any(`DELETE FROM listings WHERE id='${req.body.id}'`)
        .then(() => res.redirect(`/admin`))
        .catch(err => console.error(`Error rejecting listing; ${err}`));
};

module.exports.deleteListing = (req, res) => {
    db.any(`DELETE FROM listings WHERE id='${req.body.id}'`)
        .then(() => res.redirect(`/admin`))
        .catch(err => console.error(`Error rejecting listing; ${err}`));
};

module.exports.block = (req, res) => {
    db.any(`UPDATE users SET banned='TRUE' WHERE id='${req.body.id}'`)
        .then(() => res.redirect('/admin'))
        .catch(err => console.error(`Error blocking user: ${err}`));
};

module.exports.deleteUser = (req, res) => {
    db.any(`DELETE FROM users WHERE id='${req.body.id}'`)
        .then(() => res.redirect('/admin'))
        .catch(err => console.error(`Error deleting user: ${err}`));
};
