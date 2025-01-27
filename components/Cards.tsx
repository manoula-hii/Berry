import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { icons } from 'lucide-react-native';
import { Models } from 'react-native-appwrite';

interface Props {
    item: Models.Document
    onPress?: () => void
}

export const FeaturedCard = ({item: {image, rating, name, painter, price}, onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80  relative">
            <Image source={ {uri:image}} className="size-11/12 rounded-3xl" />
                <Image source={images.cardgradient} className="size-11/12 rounded-3xl absolute "/>
                <View className="flex flex-row items-center bg-white/95 px-3 py-1.5 rounded-full absolute top-3 right-7 ">
                <icons.Star size={22} color="#000000"/>
                <Text className="text-base font-rubik-bold text-primary-200 ml-1 mt-1">{rating}</Text>
                </View>


                <View className="flex flex-col items-start absolute bottom-11 mr-1 inset-x-5">
                    <Text className="text-xl font-rubik-extrabold text-white numberOfLines={1}">{name}</Text>
                        <Text className="text-base font-rubik text-white">By Maria Popins.</Text>
                        <View className="flex flex-row items-center justify-between w-full">
                            <Text className="text-xl font-rubik-bold text-white" > ${price}</Text>
                            <icons.Heart size={22} color="white" style={{marginRight:7}}/>
                        </View>
                </View>
        </TouchableOpacity>
    )
}


export const Card = ({item: {image, rating, name, painter, price}, onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-1 w-full  px-3 py-4 rounded-lg bg-white shadow-lg shadow-neutral-950 relative mb-4">
         <View className="flex flex-row items-center absolute px-2 top-6 right-5 bg-white/90 p-1 rounded-full z-50">
                <icons.Star size={20} color="#000000"/>
                <Text className="text-base font-rubik-bold text-primary-200 ml-0.5 mt-1">{rating}</Text>
                </View>
                 
                <Image source={{uri: image}} className="w-full h-40 rounded-lg "/>

                <View className="flex flex-col mt-2">
                    <Text className="text-base font-rubik-bold text-black ">{name}</Text>
                        <Text className="text-xs font-rubik text-black"> By Lily Garber.</Text>
                        <View className="flex flex-row items-center justify-between mt-2">
                            <Text className="text-base font-rubik-bold text-primary-100" >  ${price}.</Text>
                            <icons.Heart size={20} color="black" style={{marginRight:1, marginBottom:0}}/>
                        </View>
                </View>
    </TouchableOpacity>
    )
}
