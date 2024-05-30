export default formatCurrency = (amount) => {
  return amount.toLocaleString("en-US").replace(/,/g, ".");
};
