import { Router } from "express";
import { MonthlyController } from "../controllers/MonthlyController";


const routes = Router();

routes.post('/', new MonthlyController().create);
routes.get('/', new MonthlyController().getMonthAndYear);
routes.patch('/:id', new MonthlyController().updateById);


export default routes;