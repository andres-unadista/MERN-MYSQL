import express from 'express';
import cors from "cors";
import { dirname, join } from 'path';
import { fileURLToPath } from "url";


import { PORT } from './config.js';
import indeRouter from './routes/index.routes.js';
import tasksRouter from "./routes/tasks.routes.js";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);


app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(indeRouter);
app.use(tasksRouter);

app.use(express.static(join(__dirname, '../client/dist')));

app.listen(PORT);
console.log('Listening on port ', PORT);

