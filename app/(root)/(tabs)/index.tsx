import { Text, View } from "react-native";
import { Link } from "expo-router"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10"> Welcome to Berry ! </Text>
      <Link href="/sign-in">Sign In </Link>
      <Link href="/explore">Explore page </Link>
      <Link href="/profile">Profile page </Link>
      <Link href="/propreties/1">Proprety</Link>

    </View>
  );
}
