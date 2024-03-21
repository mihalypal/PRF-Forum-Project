"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./passport/passport");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
const dbUrl = 'mongodb://localhost:5000/my_db';
mongoose_1.default.connect(dbUrl).then(_ => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
});
// bodyParser
app.use(body_parser_1.default.urlencoded({ extended: true }));
// cookiesParser
app.use((0, cookie_parser_1.default)());
// session
const sessionOpitons = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use((0, express_session_1.default)(sessionOpitons));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.configurePassport)(passport_1.default);
app.use('/app', (0, routes_1.configureRoutes)(passport_1.default, express_1.default.Router()));
app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
