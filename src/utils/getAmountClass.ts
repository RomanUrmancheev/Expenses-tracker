const getAmountClass = (value: number) => {
  if (value < 0) {
    return "text-center tw-font-bold tw-text-3xl tw-font-mono tw-text-red-500";
  }
  return "tw-font-bold text-center tw-text-3xl tw-font-mono tw-text-green-500";
};

export default getAmountClass;
