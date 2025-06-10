import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartComponent = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [averageMeasurement, setAverage] = useState();

  // Expose functions to parent via ref
  useImperativeHandle(ref, () => ({
    addMeasurements(newMeasurement) {
      setChartData(prev => [...prev, newMeasurement]);
    },
    getAverage() {
      return averageMeasurement
    }
  }));

  // Fetch initial data
  useEffect(() => {
    fetch('http://localhost:8000/api/metingen/')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const initialData = data.map(item => item.afstand).slice(0,5);
        setChartData(initialData);

        // If chart is already initialized, update it
        if (chartInstanceRef.current) {
          chartInstanceRef.current.data.datasets[0].data = initialData.reverse();
          chartInstanceRef.current.data.labels = initialData.map((_, i) => `Meting ${i + 1}`);
          chartInstanceRef.current.update();
        }
      })
      .catch(error => console.error('Error fetching measurements:', error));
  }, []);

  // Update chart when chartData changes
  useEffect(() => {
    if (chartData.length === 0) return;

    const newestMeasurements = chartData.slice(-5);
    console.log('Updating chartData:', newestMeasurements);

    if (chartInstanceRef.current) {
      // Calculate average
      const total = newestMeasurements.reduce((acc, val) => acc + parseFloat(val), 0);
      const average = (total / newestMeasurements.length).toFixed(2);

      // Save average to state (for external use / UI)
      setAverage(average);

      // Update main dataset
      chartInstanceRef.current.data.datasets[0].data = newestMeasurements;
      chartInstanceRef.current.data.labels = newestMeasurements.map((_, i) => `Meting ${i + 1}`);

      // Update average dataset with a horizontal line
      chartInstanceRef.current.data.datasets[1].data = Array(newestMeasurements.length).fill(average);
      chartInstanceRef.current.data.datasets[1].label = `Gemiddelde: ${average ?? 0}cm`;

      chartInstanceRef.current.update();
    }
  }, [chartData]);

  // Initialize chart once when canvas is ready
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      console.log("chart average: " + averageMeasurement)

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Meting 1', 'Meting 2', 'Meting 3', 'Meting 4', 'Meting 5'],
          datasets: [
            {
              label: 'Momentopname',
              data: [],
              borderWidth: 2,
              borderColor: '#2596be',
              tension: 0.3
            },
            {
              label: 'Gemiddelde',
              data: [], // fallback if undefined
              borderWidth: 2,
              borderDash: [5, 5],
              borderColor: 'rgb(198, 0, 42)',
              tension: 0.3
            }
          ]
        },
        options: {
          legend: {
              labels: {
                  color: "blue",
              }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: { display: true, text: 'Hoogte (CM)' },
              beginAtZero: true,
              grid: { color: 'grey' }
            },
            x: {
              title: { display: true, text: 'Metingen (Meest recent)' },
              grid: { color: 'grey' }
            }
          }
        }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

    return (
      <div className="relative w-full h-96">
          <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    );

});

export default ChartComponent;
