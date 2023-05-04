import React, { useState } from 'react';
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
  carColor?: Color,
}

export const carsWithColors = carsFromServer.map((car: Car) => {
  const carColor = colorsFromServer.find(color => (
    car.colorId === color.id
  ));

  return {
    ...car,
    carColor,
  };
});

export const App: React.FC<{}> = () => {
  let newCars = [...carsWithColors];
  const [query, setQuery] = useState('');
  const [selectedColorId, setSelectedColorId] = useState(0);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => (
    setQuery(event.target.value)
  );

  const handleSelectColor = (event: React.ChangeEvent<HTMLSelectElement>) => (
    setSelectedColorId(+event.target.value)
  );

  if (query) {
    const formattedQuery = query.trim();

    newCars = newCars.filter(car => (
      car.brand.toLowerCase().includes(formattedQuery)
    ));
  }

  if (selectedColorId) {
    newCars = newCars.filter(car => (
      car.colorId === selectedColorId
    ));
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={handleQuery}
      />

      <select
        onChange={handleSelectColor}
      >
        <option
          value={0}
        >
          Choose a color
        </option>
        {colorsFromServer.map(color => (
          <option
            key={color.id}
            value={color.id}
          >
            {color.name}
          </option>
        ))}
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
          {newCars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: car.carColor?.name }}>
                {car.carColor?.name}
              </td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
