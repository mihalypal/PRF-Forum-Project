"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const User_1 = require("../model/User");
const forum = [
    {
        topic: "something interesting",
        author: "mihalypal",
        comments: {
            1: {
                username: "valaki1",
                comment: "The comment"
            },
            2: {
                username: "valaki2",
                comment: "The comment"
            },
            3: {
                username: "valaki3",
                comment: "The comment"
            },
            4: {
                username: "valaki4",
                comment: "The comment"
            },
        }
    },
    {
        topic: "something very interesting",
        author: "palmihaly",
        comments: {
            1: {
                username: "más valaki 1",
                comment: "The comment"
            },
            2: {
                username: "más valaki 2",
                comment: "The comment"
            },
            3: {
                username: "más valaki 3",
                comment: "The comment"
            },
            4: {
                username: "más valaki 4",
                comment: "The comment"
            },
        }
    }
];
const configureRoutes = (passport, router) => {
    router.get('/', (req, res) => {
        res.write('The server is available at the moment.');
        res.status(200).end(`Wow it's working`);
    });
    router.get('/topics', (req, res) => {
        res.write(forum.toString());
        res.status(200).end('This were the topics of the forum.');
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log('kurva: ' + error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server errror.');
                        }
                        else {
                            console.log("Successfully logged in.");
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = new User_1.User({ email: email, password: password });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error');
                }
                res.status(200).send('Successfully logged out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    return router;
};
exports.configureRoutes = configureRoutes;
