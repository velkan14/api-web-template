export const formatCurrency = (price) => {
  return Intl.NumberFormat("en-En", {
    currency: `EUR`,
    style: "currency",
  }).format(price);
};
