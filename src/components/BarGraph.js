
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = (props) => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label:props.title,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          strokeColor:'#36454F',
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            title: {
               display: true,
               text: 'Bar Chart'
             }
          }
      };

  return (
    <Bar
      data={data}
        style={{width:'100%',height:'100%'}}

      options={options}
    />

  );
}
export default BarChart