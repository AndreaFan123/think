import React, { useState } from "react";
import { Alert, View, TextInput, TouchableOpacity, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
      return;
    }
    if (session) {
      router.push("/");
    }

    setLoading(false);
  }

  return (
    <View className="w-full z-20 relative px-6 max-w-full bg-white min-h-screen flex gap-7 flex-col items-center justify-center">
      <Text className="font-bold text-indigo-800 text-3xl mb-3">
        Welcome Back! Login 🚀
      </Text>
      <View className="w-full flex flex-col gap-1">
        <Text className="text-xl text-indigo-700 font-semibold">Email</Text>

        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          autoCapitalize={"none"}
          className="placeholder:text-indigo-500 text-xl border-2 p-4 rounded-xl border-indigo-800"
        />
      </View>
      <View className="w-full flex flex-col gap-1">
        <Text className="text-lg text-indigo-700 font-semibold">Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={showPassword ? false : true}
          placeholder="Enter your Password"
          autoCapitalize={"none"}
          className="placeholder:text-indigo-500 relative text-xl border-2 p-4 rounded-xl border-indigo-800"
        />
        <Entypo
          name={showPassword ? "eye" : "eye-with-line"}
          size={24}
          color="#4337ee"
          className="absolute right-7 top-[53%]"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <View className="w-full max-w-full">
        <TouchableOpacity
          disabled={loading}
          onPress={() => signInWithEmail()}
          className="bg-indigo-700 rounded-2xl"
        >
          <Text className="text-white text-xl font-medium p-4 text-center">
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Link className="text-lg text-[#3c32cb] font-medium" href="/register">
          Not a member? Register Here!
        </Link>
      </View>
    </View>
  );
}
