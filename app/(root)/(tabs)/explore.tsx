import { ActivityIndicator, Button, FlatList, ScrollView } from "react-native"; // Import ScrollView
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { icons } from "lucide-react-native";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { getLatestPaintings, getPaintings } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import React, { useEffect } from "react";
import NoResults from "@/components/NoResults";


export default function Explore() {

  
  const params = useLocalSearchParams<{query?: string; filter?: string;}>();
  
  const {data: paintings, loading, refetch} = useAppwrite({
    fn: getPaintings,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit:6,
    },
    skip:true,
  })

  const handleCardPress = (id: string) => router.push(`/propreties/${id}`);


useEffect(() => {
  refetch({
    filter: params.filter!,
    query: params.query!,
    limit: 20,
  })
}, [params.filter, params.query])


  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={paintings}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)}/>}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-100 mt-5" />
          ) : <NoResults />
        }
        ListHeaderComponent={
         <View className ="px-5 mt-3">
            <View className="flex flex-row items-center justify-between mt-5">
                <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-white rounded-full size-11 items-center justify-center">
                <icons.CircleArrowLeft
                size={26}
                color="#660000"
              />
                </TouchableOpacity>
                <Text className="text-lg mr-2 text-center font-rubik-semibold text-black">Search for Your Ideal Painting.</Text>
                <icons.Bell
                size={26}
                color="#660000"
              />
            </View>
            <Search />

            <View className="mt-5">
                <Filters />
                <Text className="text-xl font-rubik-semibold text-black-200 mb-4 mt-2">
                    Found {paintings?.length} Paintings
                </Text>

            </View>
         </View>
        }
      />
    </SafeAreaView>
  );
}
