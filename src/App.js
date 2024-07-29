import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green"],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      borderWidth: 1,
    },
  ],
};

const charts = [
  { id: "donut", name: "도넛 차트" },
  { id: "bar", name: "막대 차트" },
  { id: "line", name: "선 차트" },
];

const DonutChart = () => <Pie data={data} options={{ cutout: "50%" }} />;

const BarChart = () => (
  <Bar
    data={data}
    options={{
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Bar Chart",
        },
      },
    }}
  />
);

const LineChart = () => (
  <Line
    data={data}
    options={{
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Line Chart",
        },
      },
    }}
  />
);

export default function Layout() {
  const [selectedChart, setSelectedChart] = useState("donut");

  const getChartComponent = () => {
    switch (selectedChart) {
      case "donut":
        return <DonutChart />;
      case "bar":
        return <BarChart />;
      case "line":
        return <LineChart />;
      default:
        return <DonutChart />;
    }
  };

  const getChartDescription = () => {
    switch (selectedChart) {
      case "donut":
        return "도넛 차트는 원형 차트의 변형으로, 중앙에 구멍이 있는 형태입니다. 이 차트는 전체에 대한 부분의 비율을 시각적으로 표현하는 데 효과적입니다.";
      case "bar":
        return "막대 차트는 데이터를 직사각형 막대로 표현하여 범주 간의 비교를 용이하게 합니다. 각 막대의 길이나 높이가 해당 데이터의 값을 나타냅니다.";
      case "line":
        return "선 차트는 시간에 따른 데이터의 변화나 추세를 보여주는 데 효과적입니다. 데이터 포인트를 선으로 연결하여 연속적인 변화를 표현합니다.";
      default:
        return "";
    }
  };

  const getChartCode = () => {
    switch (selectedChart) {
      case "donut":
        return `
import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderWidth: 1,
    },
  ],
};

const DonutChart = () => (
  <Pie data={data} options={{ cutout: '50%' }} />
);
        `;
      case "bar":
        return `
import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderWidth: 1,
    },
  ],
};

const BarChart = () => (
  <Bar data={data} options={{
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  }} />
);
        `;
      case "line":
        return `
import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderWidth: 1,
    },
  ],
};

const LineChart = () => (
  <Line data={data} options={{
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
  }} />
);
        `;
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 왼쪽 메뉴 */}
      <div className="w-48 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">차트 선택</h2>
          <ul>
            {charts.map((chart) => (
              <li key={chart.id} className="mb-2">
                <button
                  className={`w-full text-left p-2 rounded ${
                    selectedChart === chart.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedChart(chart.id)}
                >
                  {chart.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 중앙 설명 및 코드 영역 */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">
          {charts.find((c) => c.id === selectedChart).name}
        </h1>
        <p className="mb-4">{getChartDescription()}</p>
        <div className="bg-gray-800 text-white p-4 rounded-lg overflow-auto h-64">
          <pre className="text-sm">
            <code>{getChartCode()}</code>
          </pre>
        </div>
      </div>

      {/* 오른쪽 차트 영역 */}
      <div className="w-1/3 p-8 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">차트 미리보기</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          {getChartComponent()}
        </div>
      </div>
    </div>
  );
}
