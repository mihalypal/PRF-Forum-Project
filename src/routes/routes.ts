import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';

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

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {    

    router.get('/', (req: Request, res: Response) => {
        res.write('The server is available at the moment.');
        res.status(200).end(`Wow it's working`);
    });

    router.get('/topics', (req: Request, res: Response) => {
        res.write(forum.toString());
        res.status(200).end('This were the topics of the forum.');
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log('kurva: ' + error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server errror.');
                        } else {
                            console.log("Successfully logged in.");
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response ) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = new User({email: email, password: password});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error');
                }
                res.status(200).send('Successfully logged out.');
            });
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    return router;
}