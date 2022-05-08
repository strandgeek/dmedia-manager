import express, { Application } from "express";
import cors from "cors";
import { medias } from "./api/medias";
import { auth } from "./api/auth";

// Constants
const PORT = 4000;

// Express App Setup
const app: Application = express();

// Global Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

// API V1
const apiV1 = express.Router()

apiV1.use('/medias', medias);
apiV1.use('/auth', auth);

app.use('/api/v1', apiV1)


try {
  app.listen(PORT, (): void => {
    console.log(`Listening dMedia Manager API on port ${PORT}...`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
