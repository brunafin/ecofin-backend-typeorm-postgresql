import express from 'express';
import { AppDataSource } from './data-source';
import router from './routes';


AppDataSource.initialize()
  .then(() => {
    const app = express();
    const cors = require("cors");

    app.use(cors());

    app.use(express.json());

    app.use('/api', router);

    return app.listen(process.env.PORT);
  })
