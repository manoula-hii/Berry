import { ScrollView } from "react-native"; // Import ScrollView
import { Text, View , Image, TouchableOpacity} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { icons } from 'lucide-react-native';
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";



export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="pl-5"  contentContainerStyle={{ paddingBottom: 90 }}> 
        <View>
          <View className="flex flex-row item-center justify-between mt-5 pr-5">
            <View className="flex flex-row">
              <Image source={images.avatar} className="size-12 rounded-full" />
              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="text-sm font-rubik text-black-200">Good Morning </Text>
                <Text className="text-base font-rubik text-black-200">Manel</Text>
              </View>
            </View>
            <icons.BellDot size={24} color="#660000" style={{ marginTop: 9 }} />
          </View>
          <Search />
          <View className="mt-5 mb-1">
            <View className="flex flex-row items-center justify-between pr-5">
              <Text className="text-xl font-rubik-semibold text-black-200">Featured</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-semibold text-primary-300">See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false} // Hide the scroll bar for a cleaner look
              className="mt-5"
              contentContainerStyle={{ gap: 2 }} // Adds spacing between cards
            >
              <FeaturedCard />
              <FeaturedCard />
              <FeaturedCard />
              <FeaturedCard />
              <FeaturedCard />
            </ScrollView>
          </View>

          <View className="flex flex-row items-center justify-between pr-5">
            <Text className="text-xl font-rubik-semibold text-black-200">Our Recommendation</Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-semibold text-primary-300">See all</Text>
            </TouchableOpacity>
          </View>

          <Filters />

          <View className="flex flex-row gap-5 mt-5 pr-5">
            <Card />
            <Card />
          </View>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
