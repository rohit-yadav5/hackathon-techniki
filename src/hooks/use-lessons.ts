import { useQuery } from '@tanstack/react-query';
import { mockLessons, Lesson } from '@/lib/mock-data';

// TODO: Replace with actual Supabase queries
// import { supabase } from '@/lib/supabase';

export function useLessons(levelId?: string) {
  return useQuery({
    queryKey: ['lessons', levelId],
    queryFn: async (): Promise<Lesson[]> => {
      // TODO: Replace with actual Supabase query
      // const query = supabase.from('lessons').select('*');
      // if (levelId) {
      //   query.eq('level_id', levelId);
      // }
      // const { data, error } = await query.order('created_at', { ascending: true });
      // if (error) throw error;
      // return data;

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 400));
      return levelId 
        ? mockLessons.filter(lesson => lesson.levelId === levelId)
        : mockLessons;
    },
    enabled: !!levelId,
  });
}

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async (): Promise<Lesson | null> => {
      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('lessons')
      //   .select('*, level:levels(*)')
      //   .eq('id', lessonId)
      //   .single();
      // if (error) throw error;
      // return data;

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockLessons.find(lesson => lesson.id === lessonId) || null;
    },
    enabled: !!lessonId,
  });
}