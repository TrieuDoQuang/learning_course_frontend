// Author: Dat
// This function will format the currency to the US format
export default formatCurrency = (amount) => {
  return amount.toLocaleString("en-US").replace(/,/g, ".");
};
