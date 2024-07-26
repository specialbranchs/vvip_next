import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { sxStyle } from '@/extra/utils/config';




ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Eventwise Total Pass',
      font:{
        family:sxStyle.fontFamily
      }
      
    },
  },
};


type Props={
  labels:string[],
  dataset:string;
  data:number[],
  backgroundColor:string[],
  borderColor:string[]
}
export function ChartJs({labels,dataset,data,backgroundColor,borderColor}:Props) {

  const dataArr = {
    labels,
    datasets: [
      {
        label: dataset,
        data: data,
        backgroundColor:backgroundColor,
        borderColor:borderColor ,
        borderWidth: 1
      },

    ],
  };
  return <Bar options={options} data={dataArr} />;
}
