if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcryptjs')

const usersRouter = require('./routes/users')
const baptismRouter = require('./routes/baptism')
const marriageRouter = require('./routes/marriage')

const initializePassport = require('./passport-config')
const PORT = process.env.PORT || 4000;

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => console.log("Database Connected"))

app.use(express.json());
app.use(flash())
app.use(session(
  {
    secret : process.env.JWT_KEY,
    resave : false,
    saveUninitialized : false
  }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/baptism', baptismRouter);
app.use('/api/marriage', marriageRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Parish application." });
});

app.post('/login',)

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));

  