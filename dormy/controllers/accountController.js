
module.exports.dashboard = (req, res) => {
    res.render('account/dashboard');
};

module.exports.login = (req, res) => {
    res.render('account/login');
};

module.exports.register = (req, res) => {
    res.render('account/register');
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/account/login');
};

module.exports.listings = (req, res) => {
    res.render('account/user-listings');
};
