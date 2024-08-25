import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = ({ data }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const cars = data.Cars;

  const groupedData = cars.reduce((acc, car) => {
    const brand = car.NameMMT.split(" ")[0];
    const model = car.Model;

    if (!acc[brand]) {
      acc[brand] = { totalCount: 0, models: {} };
    }

    if (!acc[brand].models[model]) {
      acc[brand].models[model] = { count: 0, value: 0 };
    }

    const price = parseInt(car.Prc.replace(/,/g, ""), 10);

    acc[brand].totalCount += 1;
    acc[brand].models[model].count += 1;
    acc[brand].models[model].value += price;

    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        data: Object.values(groupedData).map((brand) => brand.totalCount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
          "#36A2EB",
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(groupedData),
    datasets: Object.keys(groupedData).flatMap((brand) =>
      Object.keys(groupedData[brand].models).map((model, index) => ({
        label: `${brand} ${model}`,
        data: Object.keys(groupedData).map((brandKey) =>
          brandKey === brand ? groupedData[brand].models[model]?.count || 0 : 0
        ),
        backgroundColor: `rgba(${index * 50}, ${index * 20}, ${
          index * 10
        }, 0.6)`,
      }))
    ),
  };

  return (
    <div>
      <div className="carlogo">
        <img
          src="car_logo.png"
          alt="Logo"
          style={{ width: "200px", margin: "20px 0" }}
        />
      </div>
      <h1>Dashboard</h1>
      <div className="dashboard">
        <div className="chart-row">
          <div className="chart-container pie-chart">
            <h2>Cars by Brand</h2>
            <Pie data={pieData} />
          </div>

          <div className="chart-container bar-chart">
            <h2>Models by Brand</h2>
            <Bar
              data={barData}
              options={{
                scales: {
                  x: { stacked: true },
                  y: { stacked: true },
                },
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      filter: (legendItem, chartData) => {
                        return chartData.labels.includes(legendItem.text);
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <table className="TableDesign">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Total Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).map((brand) => (
              <React.Fragment key={brand}>
                <tr
                  onClick={() =>
                    setSelectedBrand(selectedBrand === brand ? null : brand)
                  }
                >
                  <td style={{ cursor: "pointer" }}>{brand}</td>
                  <td>{groupedData[brand].totalCount}</td>
                </tr>

                {selectedBrand === brand && (
                  <tr>
                    <td colSpan={2}>
                      <table>
                        <thead>
                          <tr>
                            <th>Model</th>
                            <th>Count</th>
                            <th>Value (Baht)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(groupedData[brand].models).map(
                            (model) => (
                              <tr key={model}>
                                <td>{model}</td>
                                <td>
                                  {groupedData[brand].models[model].count}
                                </td>
                                <td>
                                  {groupedData[brand].models[
                                    model
                                  ].value.toLocaleString()}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
