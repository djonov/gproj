import * as express from "express";
import * as cors from "cors";
import * as mongo from "mongodb";

import { errorHandler } from "./handler";
import * as routes from "./routes/index.routes";
import { config } from "./config";
import { setDb } from "./db";

export const app = express();

const corsOptionsDelegate = (req, callback) => {
  const corsOptions: cors.CorsOptions = {
    credentials: true
  };

  corsOptions.origin = [];
  if (corsOptions.origin.length === 0) {
    corsOptions.origin = ["http://localhost:3000", "http://127.0.0.1:3000"];
  }
  callback(null, corsOptions);
};

// Add CORS support
app.use(cors(corsOptionsDelegate));

// Setup all the parser we need
app.use(express.json());
app.use(express.urlencoded());

app.use(routes.todo);

// Simple error handler
app.use(errorHandler);

mongo.MongoClient.connect(config.db.url, { useUnifiedTopology: true }).then(
  (value: mongo.MongoClient) => {
    app.set("db", value.db());
    console.log(`Successfully connected to ${config.db.url}`);
    app.emit("DB_CONNECTED");
    setDb(value.db());
  }
);

const port = process.env.PORT || 80;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
