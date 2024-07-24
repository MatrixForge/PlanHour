// store/venueStore.ts
import create from 'zustand';
import axios from 'axios';

interface Venue {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
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

const useVenueStore = create<VenueStore>((set) => ({
  restaurants: [],
  filteredRestaurants: [],
  filter: "",
  cityFilter: [],
  budgetFilter: [],
  staffFilter: [],
  fetchRestaurants: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/plans/getVendors");
      set({ restaurants: response.data, filteredRestaurants: response.data });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  },
  setFilter: (filter: string) => set((state) => {
    const filtered = state.restaurants.filter((restaurant) => restaurant.vendorType === filter);
    return { filter, filteredRestaurants: filtered };
  }),
  setCityFilter: (city: string) => set((state) => {
    const updatedCityFilter = state.cityFilter.includes(city)
      ? state.cityFilter.filter(c => c !== city)
      : [...state.cityFilter, city];

    const filtered = state.restaurants.filter((restaurant) =>
      updatedCityFilter.includes(restaurant.location) &&
      state.budgetFilter.every(b => restaurant.min >= b.min && restaurant.max <= b.max) &&
      state.staffFilter.every(s => restaurant.staff.includes(s))
    );

    return { cityFilter: updatedCityFilter, filteredRestaurants: filtered };
  }),
  setBudgetFilter: (budget: { min: number; max: number }) => set((state) => {
    const updatedBudgetFilter = state.budgetFilter.some(b => b.min === budget.min && b.max === budget.max)
      ? state.budgetFilter.filter(b => !(b.min === budget.min && b.max === budget.max))
      : [...state.budgetFilter, budget];

    const filtered = state.restaurants.filter((restaurant) =>
      updatedBudgetFilter.some(b => restaurant.min >= b.min && restaurant.max <= b.max) &&
      state.cityFilter.includes(restaurant.location) &&
      state.staffFilter.every(s => restaurant.staff.includes(s))
    );

    return { budgetFilter: updatedBudgetFilter, filteredRestaurants: filtered };
  }),
  setStaffFilter: (staff: string) => set((state) => {
    const updatedStaffFilter = state.staffFilter.includes(staff)
      ? state.staffFilter.filter(s => s !== staff)
      : [...state.staffFilter, staff];

    const filtered = state.restaurants.filter((restaurant) =>
      state.cityFilter.includes(restaurant.location) &&
      state.budgetFilter.every(b => restaurant.min >= b.min && restaurant.max <= b.max) &&
      updatedStaffFilter.every(s => restaurant.staff.includes(s))
    );

    return { staffFilter: updatedStaffFilter, filteredRestaurants: filtered };
  })
}));

export default useVenueStore;
