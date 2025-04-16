
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface UserProfile {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
}

export const useUser = () => {
  const { user: authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get user profile from auth user
  const user = authUser ? {
    name: authUser.name || '',
    email: authUser.email || '',
    bio: '',
    location: '',
    website: ''
  } : null;
  
  // Update user profile
  const updateUser = async (userData: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to update the user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For the mock implementation, we just simulate a successful update
      // In a real app, we would update the user in the state or context
      
      return { ...user, ...userData };
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    user,
    isLoading,
    updateUser
  };
};
