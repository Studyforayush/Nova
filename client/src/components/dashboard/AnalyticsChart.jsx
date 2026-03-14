import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Global Chart configuration for the Dark B&W theme
ChartJS.defaults.color = '#aaaaaa';
ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif';

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#aaaaaa',
      },
      position: 'bottom',
    },
    tooltip: {
      backgroundColor: '#111111',
      titleColor: '#ffffff',
      bodyColor: '#aaaaaa',
      borderColor: '#2a2a2a',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
    },
  },
  scales: {
    x: {
      grid: {
        color: '#2a2a2a',
        drawBorder: false,
      },
      ticks: {
        color: '#666666',
      },
    },
    y: {
      grid: {
        color: '#2a2a2a',
        drawBorder: false,
      },
      ticks: {
        color: '#666666',
      },
    },
  },
};

const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: commonOptions.plugins,
};


const AnalyticsChart = ({ type, data }) => {
  const chartWrapperClass = "relative h-64 w-full"; // Setting fixed height for charts to render properly inside flexing cards

  switch (type) {
    case 'bar':
      return <div className={chartWrapperClass}><Bar options={commonOptions} data={data} /></div>;
    case 'line':
      return <div className={chartWrapperClass}><Line options={commonOptions} data={data} /></div>;
    case 'pie':
      return <div className={chartWrapperClass}><Pie options={pieOptions} data={data} /></div>;
    default:
      return null;
  }
};

export default AnalyticsChart;
