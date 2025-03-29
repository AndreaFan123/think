import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export type ChallengesInfo = {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: string;
  date_used: string;
}

async function fetchChallengesInfo(): Promise<ChallengesInfo[]> {
  const { data: challenges, error: dbError } = await supabase 
    .from("articles")
    .select("*");

  if (dbError) {
    throw new Error(dbError.message);
  }

  if (!challenges) {
    return [];
  }

  return challenges.map(challenge => ({
    id: challenge.id,
    title: challenge.title || "",
    content: challenge.content || "",
    category: challenge.category || "",
    difficulty: challenge.difficulty || "medium",
    date_used: challenge.date_used || new Date().toISOString(),
  }));
}

export function useChallenges() {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: ()=>fetchChallengesInfo(),
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
  });
}