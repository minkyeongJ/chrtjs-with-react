import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartCommonFeaturesComparison = () => {
  const chartRef = useRef(null);
  const [key, setKey] = useState(0);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const baseData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random() * 1000),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random() * 1000),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const baseOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  // 1. x, y축 계산식
  const axisOptions = {
    ...baseOptions,
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
        ticks: {
          callback: function (value, index) {
            return index + 1 + "월";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        ticks: {
          callback: function (value) {
            return "₩" + value.toLocaleString();
          },
        },
      },
    },
  };

  // 2. 애니메이션 효과
  const animationOptions = {
    ...baseOptions,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  // 3. 컬러 설정
  const colorData = {
    ...baseData,
    datasets: baseData.datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: index === 0 ? "rgb(75, 192, 192)" : "rgb(153, 102, 255)",
      backgroundColor:
        index === 0 ? "rgba(75, 192, 192, 0.5)" : "rgba(153, 102, 255, 0.5)",
    })),
  };

  // 4. 데이터 처리 방법 (JSON, CSV)
  const csvData = `month,value\nJan,100\nFeb,200\nMar,300\nApr,400\nMay,500\nJun,600\nJul,700`;

  const parseCSV = (csv) => {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header] =
          header === "month" ? values[index] : parseFloat(values[index]);
        return obj;
      }, {});
    });
  };

  const parsedCSVData = parseCSV(csvData);

  const dataFromCSV = {
    labels: parsedCSVData.map((item) => item.month),
    datasets: [
      {
        label: "CSV Data",
        data: parsedCSVData.map((item) => item.value),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  // 5. 유용한 메소드들
  useEffect(() => {
    const updateChart = () => {
      const chart = chartRef.current;
      if (chart && chart.data && chart.data.datasets) {
        chart.data.datasets.forEach((dataset) => {
          dataset.data = labels.map(() => Math.random() * 1000);
        });
        chart.update();
      }
    };

    const resetChart = () => {
      const chart = chartRef.current;
      if (chart) {
        chart.reset();
      }
    };

    const timer1 = setTimeout(updateChart, 3000);
    const timer2 = setTimeout(resetChart, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [key]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>Chart.js 공통 기능 비교</h1>

      <h2>1. x, y축 계산식</h2>
      <Line options={axisOptions} data={baseData} />

      <h2>2. 애니메이션 효과</h2>
      <Line options={animationOptions} data={baseData} />

      <h2>3. 컬러 설정</h2>
      <Line options={baseOptions} data={colorData} />

      <h2>4. 데이터 처리 방법 (CSV)</h2>
      <Line options={baseOptions} data={dataFromCSV} />

      <h2>5. 유용한 메소드들 (update, reset)</h2>
      <Line ref={chartRef} options={baseOptions} data={baseData} key={key} />
      <p>이 차트는 3초 후에 업데이트되고, 6초 후에 리셋됩니다.</p>
      <button onClick={() => setKey((prev) => prev + 1)}>차트 재생성</button>
    </div>
  );
};

export default ChartCommonFeaturesComparison;
