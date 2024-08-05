import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceManagementSystem = () => {
  const employees = ["김철수", "이영희", "박민수", "정수진", "홍길동"];
  const months = ["1월", "2월", "3월", "4월", "5월", "6월"];

  // 출근 시간 데이터 (분 단위, 9시 출근 기준)
  const attendanceData = {
    labels: employees,
    datasets: months.map((month, index) => ({
      label: month,
      data: employees.map(() => Math.floor(Math.random() * 30) - 15),
      backgroundColor: `rgba(${index * 40}, 99, 132, 0.6)`,
    })),
  };

  // 초과근무 시간 데이터 (시간 단위)
  const overtimeData = {
    labels: months,
    datasets: employees.map((employee, index) => ({
      label: employee,
      data: months.map(() => Math.floor(Math.random() * 20)),
      borderColor: `rgba(${index * 50}, 99, 132, 1)`,
      fill: false,
    })),
  };

  const attendanceOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "직원별 평균 출근 시간 (9시 기준)" },
    },
    scales: {
      y: {
        title: { display: true, text: "분" },
        suggestedMin: -20,
        suggestedMax: 20,
      },
    },
  };

  const overtimeOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "직원별 월간 초과근무 시간" },
    },
    scales: {
      y: {
        title: { display: true, text: "시간" },
        suggestedMin: 0,
        suggestedMax: 25,
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>사내 근태관리 시스템 대시보드</h1>
      <div style={{ marginBottom: "40px" }}>
        <Bar options={attendanceOptions} data={attendanceData} />
      </div>
      <div>
        <Line options={overtimeOptions} data={overtimeData} />
      </div>
    </div>
  );
};

export default AttendanceManagementSystem;
