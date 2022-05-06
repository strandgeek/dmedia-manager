import express, { Application, Request, Response } from "express";
import cors from "cors";

// Constants
const PORT = 3000;

// Express App Setup
const app: Application = express();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json({ limit: '50mb' }));

// API V1
const apiV1 = express.Router()
app.use('/api/v1', apiV1)


try {
  app.listen(PORT, (): void => {
    console.log(`Listening dMedia Manager API on port ${PORT}...`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
