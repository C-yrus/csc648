
module.exports.dashboard = (req, res) => {
    res.render('admin/dashboard.html');
};

module.exports.login = (req, res) => {
    res.render('admin/login.html');
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};