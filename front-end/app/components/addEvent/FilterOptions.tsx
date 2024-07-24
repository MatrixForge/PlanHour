// FilterOptions.tsx
import React from "react";
import useVenueStore from "@/store/venueStore";

const FilterOptions: React.FC = () => {
  const { setCityFilter, setBudgetFilter, setStaffFilter } = useVenueStore();

  const filters = ["Islamabad", "Rawalpindi"];
  const budgets = [
    { min: 0, max: 1500 },
    { min: 1501, max: 2500 },
    { min: 2501, max: 4000 },
    { min: 4001, max: 5000 },
    { min: 5001, max: 6000 },
  ];
  const staffs = ["male", "female"];

  return (
    <div className="col-md-3 p-3">
      <div>
        <h4>Filters</h4>
        <h6 className="mt-5 mb-3">City</h6>
        <ul className="">
          {filters.map((filter, index) => (
            <li key={index} className="list-group-item my-4">
              <input
                type="checkbox"
                id={`filter-${index}`}
                className="me-2"
                onChange={() => setCityFilter(filter)}
              />
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
              <input
                type="checkbox"
                id={`budget-${index}`}
                className="me-2"
                onChange={() => setBudgetFilter(budget)}
              />
              <label htmlFor={`budget-${index}`}>
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
              <input
                type="checkbox"
                id={`staff-${index}`}
                className="me-2"
                onChange={() => setStaffFilter(staff)}
              />
              <label htmlFor={`staff-${index}`}>{staff}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterOptions;
