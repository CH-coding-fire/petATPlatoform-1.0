// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config();
// console.log('asddws',process.env.CLOUDINARY_CLOUD_NAME)
// }
const express = require('express')
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs')
const https = require('https')
const hostname = "petexchangehk.com"
const httpsOptions = {
	cert: fs.readFileSync('./ssl/www_petexchangehk_com.crt'),
	ca: fs.readFileSync('./ssl/www_petexchangehk_com.ca-bundle'),
	key:fs.readFileSync('../../../..csr.pem')
	// key: fs.readFileSync('./')
}
const httpsServer = https.createServer(httpsOptions, app)
//*Above is for libraries, below is for modules
const adoptionRoute = require('./routes/adoptions');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const User = require('./models/users');
const cors = require('cors');
const database = 'pet-service';




mongoose
	.connect(`mongodb://localhost:27017/${database}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		try {
			const today = new Date();
			console.log(
					`*********   MongoDB database ${database} CONNNECTION OPEN! at ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} *********`
				)
		} catch (error) {
			console.log(`ERROR!! ${database} mongoDB connection FAILED!!!`);
			throw new Error(error.message)
		}
	});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET, POST, PUT,DELETE',
		credentials: true,
	})
);

const sessionConfig = {
	secret: 'thisshouldbeabettersecret!',
	resave: false,
	saveUninitialized: true,
	// cookie: {
	// 	// httpOnly: true,
	// 	expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
	// 	maxAge: 1000 * 60 * 60 * 24 * 7,
	// },
};

app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use('/adoptions', adoptionRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.get('/', (req, res) => {
	res.send('hello TESTING, successful!');
});
app.get('/fakeUser', async (req, res) => {
	const user = new User({ email: 'colt123@gmail.com', username: 'colt123' });
	const newUser = await User.register(user, 'chicken');
	res.send(newUser);
});
app.get('/req', async (req, res) => {
	console.log('from app req.user:', req.user);
	console.log('from app req.body:', req.body);
});
app.post('/req', async (req, res) => {
	console.log('from app req.user:', req.user);
	console.log('from app req.body:', req.body);
});

// const PORT = 8080;
// app.listen(PORT, () => {
// 	const today = new Date();
// 	console.log(
// 		`*********  Express: LISTENING TO PORT: ${PORT} at ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} *********`
// 	);
// });

const httpsPort = 8080
httpsServer.listen(httpsPort, hostname, () => {
console.log('hello...server successfully launch I guess')
})




