interface DebitComponentProps {
  logo: string;
  value: number;
}

const DebitComponent = ({ logo, value }: DebitComponentProps) => {
  const getClassName = (value: number) => {
    if (value < 0) {
      return "text-center tw-font-bold tw-text-3xl tw-font-mono tw-text-red-500";
    }
    return "tw-font-bold text-center tw-text-3xl tw-font-mono tw-text-green-500";
  };

  return (
    <div className="container tw-bg-white tw-rounded-lg tw-border-2 tw-border-gray-400 tw-my-4">
      <div className="d-flex align-items-center justify-content-around">
        <img className="tw-w-20 tw-h-20 tw-rounded-full tw-my-2" src={logo} />
        <div className="tw-rounded-lg tw-mx-1 tw-w-1/3 tw-bg-gray-200 tw-text-gray-200">
          .
        </div>
        <div className={getClassName(value)}>{value + " $"}</div>
      </div>
    </div>
  );
};

export default DebitComponent;
