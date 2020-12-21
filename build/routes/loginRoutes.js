"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted.');
}
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n\t\t\t<div>\n\t\t\t\t<div>You are logged in</div>\n\t\t\t\t<a href='/logout'>Log out?</a>\n\t\t\t</div>\n\t\t");
    }
    else {
        res.send("\n\t\t\t<div>\n\t\t\t\t<div>You are logged out</div>\n\t\t\t\t<a href='/login'>Log in?</a>\n\t\t\t</div>\n\t\t");
    }
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === "hi" && password === "ppp") {
        req.session = {
            loggedIn: true,
        };
        res.redirect("/");
    }
    else {
        res.send("<div>Denied</div>");
    }
});
router.get('/logout', function (req, res) {
    req.session = {
        loggedIn: false
    };
    res.send("\n\t<div>Log in</div>\n\t<a href='/login'>Log In?</a>\n\t");
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected auth!');
});
