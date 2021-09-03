require ('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 4000;
const userRouter = require('./routes/user.routes');
const cors = require('cors');
const passport = require('passport');



const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(
  cors({
      origin: "http://localhost:3000",
      credentials: true 
}))
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/api', userRouter);
app.listen(PORT, () => console.log(`server working on port ${PORT}`));