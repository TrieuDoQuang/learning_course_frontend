export function currencyFormatVN(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "1.") + " VND";
}
