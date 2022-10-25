import { Request, Response } from "express";
import { installmentRepository } from "../repositories/installmentRepository";
import { outlayRepository } from "../repositories/outlayRepository";
import { verifyPaymentDate } from "../utils/createMonthsAndYears";

export class OutlayController {
  async create(req: Request, res: Response) {
    const { basic, description, value, installments_quantity, date, pay } = req.body;

    if (!basic && (!description || !value || !installments_quantity || !date || !pay)) {
      return res.status(400).json({ message: 'Informe todos os campos' })
    }

    try {
      const newOutlay = outlayRepository.create({
        description,
        value,
        installments_quantity,
        date,
        pay,
        basic
      });

      const outlay = await outlayRepository.save(newOutlay);

      for (let index = 1; index <= installments_quantity; index++) {
        const element = {
          number_installment: index,
          month: verifyPaymentDate(pay, index, installments_quantity)?.paymentMonth,
          year: verifyPaymentDate(pay, index, installments_quantity)?.paymentYear,
          value: value / installments_quantity,
          outlay_id: Number(outlay.id),
        };

        if (!outlay.basic) {
          installmentRepository.create(element);
          await installmentRepository.save(element);
        }
      }

      return res.status(201).json(newOutlay);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const outlay = await outlayRepository.findOne({ where: { id }, relations: { installments: true } });
      return res.status(200).json(outlay);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }

  async getAll(req: Request, res: Response) {

    try {
      const outlays = await outlayRepository.find();

      return res.status(200).json(outlays);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const { description, value, installments_quantity, date, pay } = req.body;

    try {
      await outlayRepository.update(id, { description, value, installments_quantity, date, pay });

      const installmentsByOutlay = await installmentRepository.find({ where: { outlay_id: Number(id) } });

      const total = installmentsByOutlay.map((item) => item.value).reduce((acc, cur) => acc + cur, 0);

      if (!(total === value)) {
        installmentsByOutlay.forEach((item) => installmentRepository.delete(item.id));

        for (let index = 1; index <= installments_quantity; index++) {
          const element = {
            number_installment: index,
            month: verifyPaymentDate(pay, index, installments_quantity)?.paymentMonth,
            year: verifyPaymentDate(pay, index, installments_quantity)?.paymentYear,
            value: value / installments_quantity,
            outlay_id: Number(id),
          };

          installmentRepository.create(element);
          await installmentRepository.save(element);
        }
      }

      return res.status(204).json("Registro atualizado");

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await outlayRepository.delete(id);
      return res.status(204).json("Registro excluído");

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }
}