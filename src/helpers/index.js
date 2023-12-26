export const formatMoney = (money) => {
  return Number(money).toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatFecha = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  return formattedDate;
};
