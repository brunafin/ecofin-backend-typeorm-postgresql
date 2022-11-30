import express, { Router } from 'express';

import outlayRoutes from './outlay.routes';
import monthlyyRoutes from './monthly.routes';

const router = express.Router();

router.use('/outlays', outlayRoutes);
router.use('/monthly', monthlyyRoutes);

export default router;