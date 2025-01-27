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
import { getLatestPaintings, getPaintings, storage } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import React, { useEffect, useState } from "react";
import NoResults from "@/components/NoResults";

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=660000&color=ffffff';

export default function Index() {
  const { user } = useGlobalContext();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestPaintings, loading: latestPaintingsloading } =
    useAppwrite({
      fn: getLatestPaintings,
    });
    const bucketId = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID;
    const {
      data: paintings,
      loading,
      refetch,
    } = useAppwrite({
      fn: getPaintings,
      params: {
        filter: params.filter!, // Pass the filter (type) from URL params
        query: params.query!,   // Pass the query (name) from URL params
        limit: 25,
      },
      skip: true,
    });

  const handleCardPress = (id: string) => router.push(`/propreties/${id}`);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
        if (user?.avatar) {
            try {
                const fileUrl = user.avatar.includes('http')
                    ? user.avatar
                    : bucketId 
                        ? storage.getFileView(bucketId, user.avatar)
                        : '';
                setAvatarUrl(fileUrl.toString());
            } catch (error) {
                console.error('Error getting avatar URL:', error);
                setAvatarUrl(`${DEFAULT_AVATAR}&name=${encodeURIComponent(user?.name || 'User')}`);
            }
        } else {
            setAvatarUrl(`${DEFAULT_AVATAR}&name=${encodeURIComponent(user?.name || 'User')}`);
        }
    };
    

    fetchAvatarUrl();
}, [user?.avatar, user?.name]);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 25,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={paintings}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-100 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View>
            <View className="flex flex-row item-center justify-between mt-5 ml-4">
              <View className="flex flex-row items-center">
                <Image
                                            source={{ 
                                              uri: avatarUrl || DEFAULT_AVATAR,
                                              cache: 'reload'
                                          }}
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
                style={{ marginTop: 9, marginRight: 15 }}
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

              {latestPaintingsloading ? (
                <ActivityIndicator size="large" className="text-primary-100" />
              ) : !latestPaintings || latestPaintings.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestPaintings}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex mt-4 ml-3.5"
                />
              )}
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