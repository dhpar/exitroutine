export const pad = (num:string) => Number(num) < 10?  num.padStart(2, '0') : num;
