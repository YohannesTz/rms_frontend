import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist((set, get) => ({
        authData: {},
        setAuthData: (newAuthData) => set(({ authData: newAuthData })),
        updateProfilePicture: (newProfilePicture) => set(state => ({ ...state.authData, propfile_picture_url: newProfilePicture })),
        removeAuthData: () => {
            set({ authData: {} })
            localStorage.clear();
        },
    }), {
        name: 'auth-storage'
    })
)

/* export const useAuthStore = create((set) => ({
    persist((set, get)) => ({
        authData: {},
        setAuthData: (newAuthData) => set(({ authData: newAuthData })),
        updateProfilePicture: (newProfilePicture) => set(state => ({ ...state.authData, propfile_picture_url: newProfilePicture })),
        removeAuthData: () => {
            set({ authData: {} })
            localStorage.clear();
        },
    }), {
        name: 'auth-storage',
        storage: () => localStorage
    }
})) */