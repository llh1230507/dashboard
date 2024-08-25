import React, { useState, useEffect } from "react";
import carData from "../taladrod-cars.min.json";

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [cars, setCars] = useState(carData.Cars);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(savedCars);
  }, []);

  const handleHighlight = (car) => {
    const updatedHighlightedCars = [...highlightedCars, car];
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem(
      "highlightedCars",
      JSON.stringify(updatedHighlightedCars)
    );
  };

  const handleRemove = (carToRemove) => {
    const updatedHighlightedCars = highlightedCars.filter(
      (car) => car.Cid !== carToRemove.Cid
    );
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem(
      "highlightedCars",
      JSON.stringify(updatedHighlightedCars)
    );
  };

  return (
    <div>
      <div>
        <img
          src="car_logo.png"
          alt="Logo"
          style={{ width: "200px", margin: "20px 0" }}
        />
      </div>

      <div>
        <h1>Highlighted Cars</h1>

        <div className="highlighted-cars-container">
          {highlightedCars.map((car) => (
            <div key={car.Cid} className="car-item">
              <img src={car.Img300} alt={car.NameMMT} />
              <h3>{car.NameMMT}</h3>
              <p>Price: {car.Prc} Baht</p>
              <p>Year: {car.Yr}</p>
              <button onClick={() => handleRemove(car)}>Remove</button>
            </div>
          ))}
        </div>

        <h2>Available Cars</h2>
        <div className="available-cars-container">
          {cars.map((car) => (
            <div key={car.Cid} className="car-item">
              <img src={car.Img300} alt={car.NameMMT} />
              <h3>{car.NameMMT}</h3>
              <button onClick={() => handleHighlight(car)}>Pin</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightedCars;
