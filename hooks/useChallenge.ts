import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ChallengesInfo } from './useChallenges';

async function fetchChallenge(challengeId: string): Promise<ChallengesInfo> {
  const { data: challenge, error: dbError } = await supabase
    .from("articles")
    .select("*")
    .eq("id", challengeId)
    .single();

  if (dbError) {
    throw new Error(dbError.message);
  }
  if (!challenge) {
    throw new Error("No challenge found");
  }

  return {
    id: challenge.id,
    title: challenge.title || "",
    content: challenge.content || "",
    category: challenge.category || "",
    difficulty: challenge.difficulty || "medium",
    date_used: challenge.date_used || new Date().toISOString(),
  };
}

export function useChallenge(challengeId: string) {
  return useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => fetchChallenge(challengeId),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!challengeId,
  });
}