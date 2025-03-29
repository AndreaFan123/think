import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';


export type UserInfo = {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: number;
  preferred_language: string;
  subscription_status: string;
};

async function fetchUserInfo(): Promise<UserInfo> {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("User not found");
  }

  const { data: userData, error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (dbError) {
    throw new Error(dbError.message);
  }

  return {
    id: user.id,
    email: user.email || "",
    username: userData.username || "",
    xp: userData.xp || 0,
    level: userData.level || 1,
    preferred_language: userData.preferred_language || "",
    subscription_status: userData.subscription_status || "free",
  };
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: ()=>fetchUserInfo(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
} 