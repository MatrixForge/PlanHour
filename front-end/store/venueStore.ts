import { create } from "zustand";
import axios from "@/lib/axios";

interface Venue {
  _id:string;
  id: string;
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
  searchQuery: string;
  sortOption: string;
  fetchRestaurants: () => void;
  setFilter: (filter: string) => void;
  setCityFilter: (city: string) => void;
  setBudgetFilter: (budget: { min: number; max: number }) => void;
  setStaffFilter: (staff: string) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: string) => void;
  filterRestaurants: () => void;
}

const useVenueStore = create<VenueStore>((set, get) => ({
  restaurants: [],
  filteredRestaurants: [],
  filter: "",
  cityFilter: [],
  budgetFilter: [],
  staffFilter: [],
  searchQuery: "",
  sortOption: "Relevance",
  fetchRestaurants: async () => {
    try {
      const response = await axios.get("/plans/getVendors");
      if (response) {
        set({ restaurants: response.data, filteredRestaurants: response.data });
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  },
  setFilter: (filter: string) => {
    set({ filter });
    get().filterRestaurants();
  },
  setCityFilter: (city: string) => {
    const { cityFilter } = get();
    const updatedCityFilter = cityFilter.includes(city)
      ? cityFilter.filter((c) => c !== city)
      : [...cityFilter, city];
    set({ cityFilter: updatedCityFilter });
    get().filterRestaurants();
  },
  setBudgetFilter: (budget: { min: number; max: number }) => {
    const { budgetFilter } = get();
    const updatedBudgetFilter = budgetFilter.some(
      (b) => b.min === budget.min && b.max === budget.max
    )
      ? budgetFilter.filter(
          (b) => !(b.min === budget.min && b.max === budget.max)
        )
      : [...budgetFilter, budget];
    set({ budgetFilter: updatedBudgetFilter });
    get().filterRestaurants();
  },
  setStaffFilter: (staff: string) => {
    const { staffFilter } = get();
    const updatedStaffFilter = staffFilter.includes(staff)
      ? staffFilter.filter((s) => s !== staff)
      : [...staffFilter, staff];
    set({ staffFilter: updatedStaffFilter });
    get().filterRestaurants();
  },
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().filterRestaurants();
  },
  setSortOption: (option: string) => {
    set({ sortOption: option });
    get().filterRestaurants();
  },
  filterRestaurants: () => {
    const {
      restaurants,
      filter,
      cityFilter,
      budgetFilter,
      staffFilter,
      searchQuery,
      sortOption,
    } = get();

    let filtered = restaurants.filter((restaurant: Venue) => {
      const matchesFilter = filter ? restaurant.vendorType === filter : true;
      const matchesCity =
        cityFilter.length > 0
          ? cityFilter.some((city) => restaurant.city.includes(city))
          : true;
      const matchesBudget =
        budgetFilter.length > 0
          ? budgetFilter.some(
              (b: any) => restaurant.min >= b.min && restaurant.max <= b.max
            )
          : true;
      const matchesStaff =
        staffFilter.length > 0
          ? staffFilter.every((s: any) => restaurant.staff.includes(s))
          : true;
      const matchesSearch = searchQuery
        ? restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return (
        matchesFilter &&
        matchesCity &&
        matchesBudget &&
        matchesStaff &&
        matchesSearch
      );
    });

    switch (sortOption) {
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price":
        filtered = filtered.sort((a, b) => b.min - a.min); // Assuming popularity can be represented by min value
        break;
      default:
        break;
    }

    set({ filteredRestaurants: filtered });
  },
}));

export default useVenueStore;
