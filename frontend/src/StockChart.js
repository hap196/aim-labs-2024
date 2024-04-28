import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ApexCharts from "apexcharts";

const StockChart = ({ selectedShoe }) => {
  const [chartData, setChartData] = useState([]);
  const [maxY, setMaxY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setLoading(true);

    const selectedShoeWithDashes = selectedShoe.replace(/ /g, "-");
    const csvData = require(`./data/eachshoedata/${selectedShoeWithDashes}.csv`);

    Papa.parse(csvData, {
      download: true,
      header: true,
      complete: function (results) {
        const shoeData = results.data.slice(0, -1).map((row) => {
          const date = new Date(row["OrderDate"]);
          let salesPrice = 0;
          if (row["SalesPrice"] && !isNaN(row["SalesPrice"])) {
            salesPrice = parseFloat(row["SalesPrice"]);
          }
          return { x: date, y: salesPrice };
        });

        const maxYValue = Math.max(...shoeData.map((data) => data.y));
        setMaxY(maxYValue);
        setChartData(shoeData);
        setLoading(false);
      },
    });
  }, [selectedShoe]);

  useEffect(() => {
    if (!loading) {
      if (chart) {
        chart.destroy(); 
      }

      var options = {
        series: [
          {
            name: selectedShoe,
            data: chartData,
          },
        ],
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: false,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          min: 0,
          max: maxY + 50,
          labels: {
            formatter: function (val) {
              return val.toFixed(2);
            },
          },
          title: {
            text: "Price",
          },
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            },
          },
        },
      };

      var newChart = new ApexCharts(document.querySelector("#chart"), options);
      newChart.render();
      setChart(newChart); 
    }
  }, [chartData, selectedShoe, maxY, loading]);

  return <div id="chart"></div>;
};

export default StockChart;
