import { useQuery } from '@tanstack/react-query';
import { mockLevels, Level } from '@/lib/mock-data';

// TODO: Replace with actual Supabase queries
// import { supabase } from '@/lib/supabase';

export function useLevels() {
  return useQuery({
    queryKey: ['levels'],
    queryFn: async (): Promise<Level[]> => {
      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('levels')
      //   .select('*')
      //   .order('order', { ascending: true });
      // if (error) throw error;
      // return data;

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return mockLevels;
    },
  });
}

export function useLevel(levelId: string) {
  return useQuery({
    queryKey: ['level', levelId],
    queryFn: async (): Promise<Level | null> => {
      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('levels')
      //   .select('*')
      //   .eq('id', levelId)
      //   .single();
      // if (error) throw error;
      // return data;

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockLevels.find(level => level.id === levelId) || null;
    },
    enabled: !!levelId,
  });
}