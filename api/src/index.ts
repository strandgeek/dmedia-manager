import express, { Application } from "express";
import cors from "cors";
import { auth } from "./api/auth";
import { projects } from "./api/projects";
import path from "path";

// Constants
const PORT = 4000;

// Express App Setup
const app: Application = express();

// Serve Webapp
app.use(express.static(path.resolve(__dirname, './webappbuild')));

// Global Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

// API V1
const apiV1 = express.Router()

apiV1.use('/projects', projects)
apiV1.use('/auth', auth);

app.use('/api/v1', apiV1)


try {
  app.listen(PORT, (): void => {
    console.log(`Listening dMedia Manager API on port ${PORT}...`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
