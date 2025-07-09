// stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Usuario } from '@/model/usuario.models'

interface AuthState {
  user: Usuario | null
  token: string | null
  loading: boolean
  setAuth: (user: Usuario, token: string) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: true,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
)
