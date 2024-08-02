import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Attendee {
  email: string;
}

interface GuestStore {
  attendees: Attendee[];
  setAttendees: (attendees: Attendee[]) => void;
}

export const useGuestStore = create<GuestStore>()(
  persist(
    (set) => ({
      attendees: [],
      setAttendees: (attendees) => set({ attendees }),
    }),
    {
      name: "attendees-storage", // Change the name to reflect the data being persisted
      getStorage: () => localStorage,
    }
  )
);
