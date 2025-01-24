import { Tabs } from "expo-router";
import {  Text, View } from "react-native";
import { Home, LucideProps, Search, UserRound } from 'lucide-react-native';
import { ComponentType } from "react";

type IconType = ComponentType<LucideProps>;

const TabIcon = ({
    focused,
    icon: Icon,
    title,
  }: {
    focused: boolean;
    icon: IconType;
    title: string;
  }) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Icon color={focused ? "#660000" : "gray"} size={24} />
      <Text
        className={`${
          focused
            ? "text-primary-100 font-rubik-medium"
            : "text-black-200 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Search} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={UserRound} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;