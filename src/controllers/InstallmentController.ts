import { Request, Response } from "express";
import { installmentRepository } from "../repositories/installmentRepository";

export class InstallmentController {
  async create(req: Request, res: Response) {
    const { number_installment, month, year, outlay_id, value } = req.body;

    try {
      const newInstallment = installmentRepository.create({
        number_installment,
        month,
        year,
        outlay_id,
        value
      });

      await installmentRepository.save(newInstallment);
      return res.status(201).json(newInstallment);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor' })
    }
  }
}
