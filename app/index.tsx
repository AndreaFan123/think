import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout error");
    } else {
      router.replace("/auth");
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
