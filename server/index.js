import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// CONFIGS
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({ message: "Welcome to the server"});
})


// ROUTES


// MONGOOSE SETUP
const PORT = process.env.PORT || 6000;

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));