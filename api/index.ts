import express, { json } from "express"
import cors from "cors"
import { connect } from "mongoose"
import { config } from "dotenv"

// Import Routers
import helloRoutes from "./routes/hello"
import userRoutes from "./routes/user"
import apis from "./routes/Api"

const app = express()
config()

const databaseUrl: string = process.env.DATABASE_URL!

connect(databaseUrl)
  .then(() => {
    console.log("Connected to MongoDB")
    // Start the server after successful connection
    const port = Number.parseInt(process.env.PORT || "3000")
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1) // Exit the process with a non-zero status code to indicate failure
  })

app.use(json())
app.use(cors())
app.use(express.static("public"))

// Routes
app.use('/hello', helloRoutes);
apiRoutes.then((apiRouter) => {
  app.use('/api', apiRouter)
})

const port = Number.parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
