const Error = require("./../Models/errorModel");
const io = require('../socket');


exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page not found', isAuthenticated: req.session.isLoggedIn });
}

exports.createError = async (req, res, next) => {
    const message = res.body.message;
    let error = new Error({
        message,
    })
    error.save().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err.message);

    })
}