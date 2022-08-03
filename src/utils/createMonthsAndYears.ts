export const verifyPaymentDate = (date: string, currentlyQuantity: number, totalQuantity: number, type = 'installments') => {
  const month = type === 'installments' ? new Date(date).getMonth() :  new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  if (currentlyQuantity <= totalQuantity) {
    const monthAdd = month + currentlyQuantity;
    const yearAdd = monthAdd / 12;
    const payMonth = (monthAdd <= 12 ? monthAdd : monthAdd - 12 * Math.floor(yearAdd)) === 0 ? 12 : monthAdd <= 12 ? monthAdd : monthAdd - 12 * Math.floor(yearAdd);
    const payYear = (monthAdd - 12 * Math.floor(yearAdd)) === 0 ? year + Math.floor(yearAdd) - 1 : year + Math.floor(yearAdd);
    const obj = { paymentMonth: String(payMonth), paymentYear: monthAdd <= 12 ? String(year) : String(payYear) }

    return obj;
  }
}