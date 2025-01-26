import { Button, FlatList, ScrollView } from "react-native"; // Import ScrollView
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { icons } from "lucide-react-native";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";

export default function Index() {

  const {user} = useGlobalContext();


  return (
    <SafeAreaView className="bg-white h-full">

      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View className="flex flex-row item-center justify-between mt-5 ml-4">
              <View className="flex flex-row items-center">
                <Image
                  source={{uri: user?.avatar}}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-sm font-rubik text-black-200">
                    Good Morning{" "}
                  </Text>
                  <Text className="text-base font-rubik text-black-200">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <icons.BellDot
                size={24}
                color="#660000"
                style={{ marginTop: 9 , marginRight:15 }}
              />
            </View>
            <Search />
            <View className="mt-5 mb-1">
              <View className="flex flex-row items-center justify-between pr-4 ml-4">
                <Text className="text-xl font-rubik-semibold text-black-200">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-semibold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => <FeaturedCard />}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex mt-4 ml-3.5"
              />
            </View>

            <View className="flex flex-row items-center justify-between pr-4 ml-4">
              <Text className="text-xl font-rubik-semibold text-black-200">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-semibold text-primary-300">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
