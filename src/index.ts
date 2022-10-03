import express from 'express';
import {AppDataSource} from './data-source';
import routes from './routes';

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const cors = require("cors");
    
    app.use(cors());

    app.use(express.json());

    app.use('/api', routes);

    return app.listen(process.env.PORT);
  })
