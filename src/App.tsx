import React from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

interface Color {
  id: number,
  name: string,
}

interface Car {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
  carColor: Color,
}

interface Props {
  car: Car,
  carColor: Color,
}

const carsWithColors = carsFromServer.map(car => {
  const carColor = colorsFromServer.find(color => {
    car.colorId === color.id;
  })

  return ({
    ...car,
    carColor,
  })
})

export const App: React.FC<Props> = () => {
  const newCars = [...carsWithColors];

  return (
    <div>
      <input type="search" placeholder="Find by car brand" />

      <select>
        <option>Chose a color</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {newCars.map(car => {
            <>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{color: car.carColor.name}}>{car.carcolor.name}</td>
              <td>{car.rentPrice}</td>
            </>
          }
          )}
        </tbody>
      </table>
    </div>
  );
};
