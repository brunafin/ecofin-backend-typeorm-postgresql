import { Router } from "express";
import { InstallmentController } from "./controllers/InstallmentController";
import { MonthlyController } from "./controllers/MonthlyController";
import { OutlayController } from "./controllers/OutlayController";

const routes = Router();

// compras
routes.post('/outlay', new OutlayController().create);
routes.get('/outlays', new OutlayController().getAll);
routes.get('/outlay/:id', new OutlayController().getById);
routes.put('/outlay/:id', new OutlayController().updateById);
routes.delete('/outlay/:id', new OutlayController().deleteById);

// parcelas

// total mes
routes.post('/monthly', new MonthlyController().create);
routes.get('/monthly', new MonthlyController().getMonthAndYear);
routes.patch('/monthly/:id', new MonthlyController().updateById);

export default routes;