import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { icons } from 'lucide-react-native';

interface Props {
    onPress?: () => void
}

export const FeaturedCard = ({onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
            <Image source={images.redabstract} className="size-11/12 rounded-3xl" />
                <Image source={images.cardgradient} className="size-11/12 rounded-3xl absolute "/>
                <View className="flex flex-row items-center bg-white/95 px-3 py-1.5 rounded-full absolute top-3 right-7 ">
                <icons.Star size={22} color="#000000"/>
                <Text className="text-base font-rubik-bold text-primary-200 ml-1 mt-1">4.4</Text>
                </View>


                <View className="flex flex-col items-start absolute bottom-11 mr-1 inset-x-5">
                    <Text className="text-xl font-rubik-extrabold text-white numberOfLines={1}">Red Hood.</Text>
                        <Text className="text-base font-rubik text-white"> By Mariana Roberts.</Text>
                        <View className="flex flex-row items-center justify-between w-full">
                            <Text className="text-xl font-rubik-bold text-white" >  $200.</Text>
                            <icons.Heart size={22} color="white" style={{marginRight:7}}/>
                        </View>
                </View>
        </TouchableOpacity>
    )
}


export const Card = ({onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-1 w-full  px-3 py-4 rounded-lg bg-white shadow-lg shadow-neutral-950 relative">
         <View className="flex flex-row items-center absolute px-2 top-6 right-5 bg-white/90 p-1 rounded-full z-50">
                <icons.Star size={20} color="#000000"/>
                <Text className="text-base font-rubik-bold text-primary-200 ml-0.5 mt-1">4.2</Text>
                </View>
                 
                <Image source={images.horizon} className="w-full h-40 rounded-lg "/>

                <View className="flex flex-col mt-2">
                    <Text className="text-base font-rubik-bold text-black ">Summer Afternoon.</Text>
                        <Text className="text-xs font-rubik text-black"> By Lily Garber.</Text>
                        <View className="flex flex-row items-center justify-between mt-2">
                            <Text className="text-base font-rubik-bold text-primary-100" >  $120.</Text>
                            <icons.Heart size={22} color="white" style={{marginRight:7}}/>
                        </View>
                </View>
    </TouchableOpacity>
    )
}

