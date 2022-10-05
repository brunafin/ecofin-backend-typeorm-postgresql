import { Request, Response } from "express";
import { installmentRepository } from "../repositories/installmentRepository";
import { monthlyRepository } from "../repositories/monthlyRepository";
import { outlayRepository } from "../repositories/outlayRepository";
import { verifyPaymentDate } from "../utils/createMonthsAndYears";

export class MonthlyController {
  async create(req: Request, res: Response) {
    const { date, quantity_months, amount } = req.body;

    try {
      const outlays = await outlayRepository.find();
      const basicsOutlay = outlays.filter((item) => item.basic === true).map((element) => element);
      console.log(basicsOutlay);

      for (let index = 1; index <= quantity_months; index++) {
        const element = {
          month: verifyPaymentDate(date, index, quantity_months, 'planning')?.paymentMonth,
          year: verifyPaymentDate(date, index, quantity_months, 'planning')?.paymentYear,
          amount
        };

        const monthFinded = await monthlyRepository.findOne({ where: { month: verifyPaymentDate(date, index, quantity_months, 'planning')?.paymentMonth, year: verifyPaymentDate(date, index, quantity_months, 'planning')?.paymentYear } });

        if (!monthFinded) {
          monthlyRepository.create(element);
          if (basicsOutlay.length) {
            basicsOutlay.map((item) => {
              const newInstallmentBasic = {
                number_installment: 1,
                month: verifyPaymentDate(date, index, quantity_months, 'planning')?.paymentMonth,
                year: verifyPaymentDate(date, index, quantity_months, 'planning')?.paymentYear,
                value: item.value
              }
              installmentRepository.save(newInstallmentBasic);
            })
          }
          await monthlyRepository.save(element);
        }
      }
      return res.status(201).json("Planejamento criado!");

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }

  async getMonthAndYear(req: Request, res: Response) {
    const { month, year } = req.body;

    try {
      const monthly = await monthlyRepository.findOne({ where: { month, year } })
      return res.status(200).json(monthly);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const { amount } = req.body;

    try {
      await monthlyRepository.update(id, { amount })

      return res.status(204).end();

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }
}
