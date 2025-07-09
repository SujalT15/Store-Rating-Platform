
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user' | 'store_owner';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: UserRole;
  storeId?: string; // For store owners
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// Mock data for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'admin@example.com',
    address: '123 Admin Street, Admin City',
    role: 'admin',
    password: 'Admin123!'
  },
  {
    id: '2',
    name: 'John Doe Normal User Account',
    email: 'user@example.com',
    address: '456 User Avenue, User Town, User State 12345',
    role: 'user',
    password: 'User123!'
  },
  {
    id: '3',
    name: 'Store Owner Sample Account',
    email: 'store@example.com',
    address: '789 Store Boulevard, Store City, Store State 67890',
    role: 'store_owner',
    storeId: '1',
    password: 'Store123!'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ isAuthenticated: true, user: userWithoutPassword });
          return true;
        }
        return false;
      },
      
      signup: async (userData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
          return false;
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          address: userData.address,
          role: 'user'
        };
        
        mockUsers.push({ ...newUser, password: userData.password });
        set({ isAuthenticated: true, user: newUser });
        return true;
      },
      
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      
      updatePassword: async (currentPassword: string, newPassword: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { user } = get();
        if (!user) return false;
        
        const userIndex = mockUsers.findIndex(u => u.id === user.id);
        if (userIndex !== -1 && mockUsers[userIndex].password === currentPassword) {
          mockUsers[userIndex].password = newPassword;
          return true;
        }
        return false;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
