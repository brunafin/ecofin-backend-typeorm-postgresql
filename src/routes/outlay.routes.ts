import { Router } from "express";
import { OutlayController } from "../controllers/OutlayController";

const routes = Router();

// compras
routes.post('/', new OutlayController().create);
routes.get('/', new OutlayController().getAll);
routes.get('/:id', new OutlayController().getById);
routes.put('/:id', new OutlayController().updateById);
routes.delete('/:id', new OutlayController().deleteById);


export default routes;