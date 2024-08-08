interface DebitComponentProps {
  logo: string;
  value: number;
}

const DebitComponent = ({ logo, value }: DebitComponentProps) => {
  const getClassName = (value: number) => {
    if (value < 0) {
      return "font-bold text-4xl font-mono text-red-500";
    }
    return "font-bold text-4xl font-mono text-green-500";
  };

  return (
    <div className="container bg-white rounded-lg border-2 border-gray-400 my-4">
      <div className="flex justify-around items-center">
        <img className="w-20 h-20 rounded-full my-2" src={logo} />
        <div className="rounded-lg mx-1 w-1/3 bg-gray-200 text-gray-200">.</div>
        <p className={getClassName(value)}>{value + " $"}</p>
      </div>
    </div>
  );
};

export default DebitComponent;
