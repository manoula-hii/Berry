import images from '@/constants/images';
import Images from '@/constants/images';
import { icons } from 'lucide-react-native';
import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LucideIcon } from 'lucide-react-native'; 
import { CircleArrowRight } from 'lucide-react-native';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';


interface SettingsItemProps{
    Icon: LucideIcon;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({Icon, title, onPress, textStyle, showArrow = true}: SettingsItemProps) => (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
        <View className="flex flex-row items-center gap-3" >
            <Icon size={27} color="#660000" />
            <Text className="text-lg font-medium ">{title}</Text>
        </View>

        {showArrow && <CircleArrowRight size={24} color="#660000" />}


    </TouchableOpacity>
)

const Profile = () => {
    const {user, refetch} = useGlobalContext();

    const handleLogout = async () => {
        const result = await logout()

        if(result){
            Alert.alert("Success", "You have been logged out successfully.");
            refetch();
        } else {
            Alert.alert("Error", "An error occurred while logging out.")
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
           <ScrollView  
           showsVerticalScrollIndicator={false}
           contentContainerClassName="pb-32 px-7"
           >
                <View className="flex flex-row items-center justify-between mt-7">
                    <Text className ="text-2xl font-rubik-semibold">
                        Profile
                    </Text>
                    <icons.Bell size={24} color="#660000" />
                </View>

                <View className="flex-row justify-center flex mt-5">
                        <View className="flex flex-col item-center relative justify-center mt-0">
                            <Image source={{uri: user?.avatar}} className="size-32 relative rounded-full" />
                            <TouchableOpacity className='absolute bottom-11 right-0'>
                                <icons.Pencil size={20} color="#660000"/>
                            </TouchableOpacity>
                            <Text className="text-xl font-rubik-semibold mt-4 text-center ">{user?.name}</Text>
                        </View>
                </View>


                <View className="flex flex-col mt-4 ">
                        <SettingsItem Icon={icons.Amphora} title="My Pieces" />
                        <SettingsItem Icon={icons.Wallet} title="Payments" />
                </View>


                <View className="flex flex-col mt-3 border-t pt-5 border-primary-100">
                        {settings.slice(2).map((item, index) => (
                             <SettingsItem key={index} {...item} />
                        ))}
                </View>

                <View className="flex flex-col mt-1 border-t pt-5 border-primary-100">
                        <SettingsItem Icon={icons.LogOut} title="Logout"  textStyle="text-red-600" showArrow={false} onPress={handleLogout}>        
                        </SettingsItem>

                    </View>


           </ScrollView>
        </SafeAreaView>
    )
}


export default Profile