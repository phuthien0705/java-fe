export default function calcProfit(value: number) {
  // Tính giá trị tối thiểu và tối đa
  const minValue = value * 0.15;
  const maxValue = value * 0.25;

  // Tạo số ngẫu nhiên từ giá trị tối thiểu đến tối đa
  const randomValue = Math.random() * (maxValue - minValue) + minValue;

  // Làm tròn số ngẫu nhiên và trả về
  const roundedValue = Math.round(randomValue);
  return roundedValue;
}
