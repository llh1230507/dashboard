import React from "react";

const Sales = () => {
  return (
    <div>
      <div className="carlogo">
        <img
          src="car_logo.png"
          alt="Logo"
          style={{ width: "200px", margin: "20px 0" }}
        />
      </div>
      <h1>Car Sales Report</h1>
      <table className="Sales">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Sale Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Toyota</td>
            <td>6</td>
          </tr>
          <tr>
            <td>BMW</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Mercedes</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Volvo</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Honda</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Suzuki</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Izuku</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Lexus</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Kia</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
};

export default Sales;
