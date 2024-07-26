import {create} from 'zustand';
import axios from "@/lib/axios";

interface Venue {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  city: string[];
  min: number;
  max: number;
  email: string;
  contact: string;
  rating: number;
  staff: string[];
  vendorType: string;
  services: string[];
}

interface VenueStore {
  restaurants: Venue[];
  filteredRestaurants: Venue[];
  filter: string;
  cityFilter: string[];
  budgetFilter: { min: number; max: number }[];
  staffFilter: string[];
  fetchRestaurants: () => void;
  setFilter: (filter: string) => void;
  setCityFilter: (city: string) => void;
  setBudgetFilter: (budget: { min: number; max: number }) => void;
  setStaffFilter: (staff: string) => void;
}

const useVenueStore = create<VenueStore>((set, get) => ({
  restaurants: [],
  filteredRestaurants: [],
  filter: "",
  cityFilter: [],
  budgetFilter: [],
  staffFilter: [],
  fetchRestaurants: async () => {
    try {
      var response = await axios.get("http://localhost:5000/api/plans/getVendors");
      if (response) {
         set({ restaurants: response.data, filteredRestaurants: response.data });
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  },
  setFilter: (filter: string) => {
    const { cityFilter, budgetFilter, staffFilter, restaurants } = get();
    const filtered = applyFilters({ restaurants, filter, cityFilter, budgetFilter, staffFilter });
    set({ filter, filteredRestaurants: filtered });
  },
  setCityFilter: (city: string) => {
    const { cityFilter, filter, budgetFilter, staffFilter, restaurants } = get();
    const updatedCityFilter = cityFilter.includes(city)
      ? cityFilter.filter(c => c !== city)
      : [...cityFilter, city];

    const filtered = applyFilters({ restaurants, filter, cityFilter: updatedCityFilter, budgetFilter, staffFilter });
    set({ cityFilter: updatedCityFilter, filteredRestaurants: filtered });
  },
  setBudgetFilter: (budget: { min: number; max: number }) => {
    const { budgetFilter, filter, cityFilter, staffFilter, restaurants } = get();
    const updatedBudgetFilter = budgetFilter.some(b => b.min === budget.min && b.max === budget.max)
      ? budgetFilter.filter(b => !(b.min === budget.min && b.max === budget.max))
      : [...budgetFilter, budget];

    const filtered = applyFilters({ restaurants, filter, cityFilter, budgetFilter: updatedBudgetFilter, staffFilter });
    set({ budgetFilter: updatedBudgetFilter, filteredRestaurants: filtered });
  },
  setStaffFilter: (staff: string) => {
    const { staffFilter, filter, cityFilter, budgetFilter, restaurants } = get();
    const updatedStaffFilter = staffFilter.includes(staff)
      ? staffFilter.filter(s => s !== staff)
      : [...staffFilter, staff];

    const filtered = applyFilters({ restaurants, filter, cityFilter, budgetFilter, staffFilter: updatedStaffFilter });
    set({ staffFilter: updatedStaffFilter, filteredRestaurants: filtered });
  },
}));

const applyFilters = ({ restaurants, filter, cityFilter, budgetFilter, staffFilter }: any) => {
  return restaurants.filter((restaurant: Venue) => {
    const matchesFilter = filter ? restaurant.vendorType === filter : true;
    const matchesCity = cityFilter.length > 0 ? cityFilter.some(city => restaurant.city.includes(city)) : true;
    const matchesBudget = budgetFilter.length > 0
      ? budgetFilter.some((b: any) => restaurant.min >= b.min && restaurant.max <= b.max)
      : true;
    const matchesStaff = staffFilter.length > 0
      ? staffFilter.every((s: any) => restaurant.staff.includes(s))
      : true;
    return matchesFilter && matchesCity && matchesBudget && matchesStaff;
  });
};

export default useVenueStore;
