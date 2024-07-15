import express from "express";
import cors from "cors";
import { connect, connection } from "mongoose";
import { config } from "dotenv";
import { AddressInfo } from "net";

// Load environment variables
config();

// Import Routers
import helloRoutes from './routes/hello';
import apiRoutes from "./routes/Api";
import userRoutes from "./routes/user";

const app = express();

app.use(express.json({ limit: "500mb" }));
app.use(cors());
app.use(express.static('public'));

// Database connection string
const databaseUrl: string = process.env.DATABASE_URL!;
if (!databaseUrl) {
  console.error('DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

let server: any;

async function startServer() {
  try {
    // Connect to MongoDB
    await connect(databaseUrl);
    console.log("Connected to MongoDB");

    // Routes
    app.use('/hello', helloRoutes);
    app.use("/api/user", userRoutes);

    // Async route setup
    try {
      const apiRouter = await apiRoutes;
      app.use('/api', apiRouter);
    } catch (err) {
      console.error("Error initializing API routes:", err);
      process.exit(1);
    }

    // Start the server
    const port = Number.parseInt(process.env.PORT || "3000", 10);
    server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      console.log("Shutting down gracefully...");

      // Close MongoDB connection
      await connection.close();

      // Close HTTP server
      server.close((err: any) => {
        if (err) {
          console.error('Error closing server:', err);
          process.exit(1);
        }
        console.log('Server closed.');
        process.exit(0);
      });
    };

    // Listen for termination signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();