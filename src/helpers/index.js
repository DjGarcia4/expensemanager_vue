export const formatMoney = (money) => {
  return Number(money).toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
  });
};
