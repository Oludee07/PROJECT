const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/v1/users");


const app = express();
const PORT = 4000;

//ADD RESTRICTED ACCESS WHEN URL(DOMAIN) IS IMPLEMENTED
// const corsOptions = {
//     origin: 'http://smarthaven.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }

app.use(cors());
app.use(express.json());

app.use('/v1/users', usersRouter)

// app.get('/', (req, res) => {
//     res.status(200).json({message: "we are live"});
// });

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});