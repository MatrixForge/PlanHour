// FilterOptions.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../../styles/addEvent.module.css";

const FilterOptions: React.FC = () => {
  const filters = [
      "Islamabad",
    "Rawalpindi",
  ];

  const budgets = [
    { min: 0, max: 1500 },
    { min: 1501, max: 2500 },
    { min: 2501, max: 4000 },
    { min: 4001, max: 5000 },
    { min: 5001, max: 6000 },
  ];

  const staffs = ["Male", "Female"];

  return (
    <div className="col-md-3 p-3">
      <div>
        <h4>Filters</h4>
        <h6 className="mt-5 mb-3">City</h6>
        <ul className="">
          {filters.map((filter, index) => (
            <li key={index} className="list-group-item my-4">
              <input type="checkbox" id={`filter-${index}`} className="me-2" />
              <label htmlFor={`filter-${index}`}>{filter}</label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div>
        <h6 className="mt-5 mb-3">Budget</h6>
        <ul>
          {budgets.map((budget, index) => (
            <li key={index} className="list-group-item my-4">
              <input type="checkbox" id={`filter-${index}`} className="me-2" />
              <label htmlFor={`filter-${index}`}>
                {budget.min}-{budget.max}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div>
        <h6 className="mt-5 mb-3">Staff</h6>
        <ul className="">
          {staffs.map((staff, index) => (
            <li key={index} className="list-group-item my-4">
              <input type="checkbox" id={`filter-${index}`} className="me-2" />
              <label htmlFor={`filter-${index}`}>{staff}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterOptions;
