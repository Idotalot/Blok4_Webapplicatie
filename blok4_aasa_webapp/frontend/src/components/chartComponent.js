import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { data } from 'react-router-dom';

Chart.register(...registerables)

const ChartComponent = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const fakeData = [1, 32, 23, 18, 9]

    useImperativeHandle(ref, () => ({
      addMeasurements(newMeasurement) {
        console.log('Adding measurements to chart:', newMeasurement);

        // Keep only the last 5 (or however many you want)
        setChartData((prevMeasurements) => [...prevMeasurements, newMeasurement.afstand]);
        console.log("chartData:" + chartData)
      },

      showLatestResults() {
        let result = true
        if (chartInstanceRef.current) {

          // Check of chartData 5 of meer waardes heeft
          if (chartData.length >= 5) {
            // Haal de meest recente waardes op
            const recentResults = chartData.slice(0, 5);
            recentResults.forEach((result, i) => {
              // Voeg elke meting toe aan de chart met de bijbehorende label
              chartInstanceRef.current.data.datasets[0].data[i] = result;
              chartInstanceRef.current.data.labels[i] = `Meting ${i + 1}`;
            });

            chartInstanceRef.current.update();

            result = true
          } else {
            console.log("Niet genoeg data...")
            chartData.forEach(data => {
              console.log(chartData[data] + ": " + data)
            });
            
            result = false
          }  
        }

        return result
      }
    
    }));

  useEffect(() => {
    fetch('http://localhost:8000/api/metingen/')
      .then(response => response.json())
      .then(data => setChartData(data.map(item => item.afstand)))
      .catch(error => console.error('Error fetching messages:', error));

    console.log(chartData)

    // Ensure the canvas is available before creating the chart
    const ctx = canvasRef.current.getContext('2d');

    // Create a new Chart.js instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Meting 1', 'Meting 2', 'Meting 3', 'Meting 4', 'Meting 5'],
        datasets: [{
          label: 'Meting',
          data: null,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            title: { display: true, text: 'Hoogte (CM)' },
            grid: {
              color: 'grey'
            },
            beginAtZero: true
          },
          x: {
            title: { display: true, text: 'Metingen (Meest recent)' },
            grid: {
                color: 'grey'
            }
          }
        }
      }
    });

    // Cleanup: destroy the chart instance when the component unmounts
    return () => {
      if (ctx) {
        // Destroy chart if it's already initialized to prevent memory leaks
        Chart.getChart(ctx)?.destroy();
      }
    };
  }, []);

  return (
    <div className='w-full h-full'>
      <canvas ref={canvasRef} id="myChart" className='w-full h-full m-10 mb-0'></canvas>
    </div>
  );
});

export default ChartComponent;
