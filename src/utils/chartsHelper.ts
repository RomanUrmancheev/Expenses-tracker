import { ICategories, ITransaction } from "../interfaces";

type ChartData = {
  name: string;
  y: number;
};

export const getDataForDonutChart = (
  expanses: ITransaction[],
  categories: ICategories[]
) => {
  const data = [] as ChartData[];

  categories.forEach((element) => {
    const categoryExpanses = expanses.filter((e) => e.category === element._id);
    if (categoryExpanses.length > 0) {
      const expansesSum = categoryExpanses.reduce(
        (sum, current: ITransaction) => sum + current.total,
        0
      );
      data.push({ name: element.title, y: expansesSum * -1 });
    }
  });

  return data;
};

export const getOptionsForChart = (
  name: string,
  title: string,
  chartType: string,
  data: ChartData[],
  func: (e: React.MouseEvent<Highcharts.Point>) => void
) => {
  const options = {
    title: {
      text: title,
      align: "center", // Align title horizontally
      verticalAlign: "middle", // Align title vertically
      y: 0, // Fine-tune vertical position
      style: {
        fontSize: "16px", // Adjust the font size of the title
        fontWeight: "bold",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        point: {
          events: {
            click: func,
          },
        },
      },
    },
    series: [
      {
        type: chartType,
        name: name,
        colorByPoint: true,
        innerSize: "60%",
        data: data,
      },
    ],
  };
  return options;
};
