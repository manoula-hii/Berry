import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native';
import images from '@/constants/images';

const SingIn = () => {
    const handleLogin = () => {};
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
            <Image source={images.sculpture} className="w-2/4 h-1/2 self-center"  resizeMode="contain" />

            <View className ="px-10">
                <Text className="text-3xl text-center uppercase font-rubik-bold text-black-default">
                    Welcome to {"\n"}
                    <Text>Berry !</Text>
                </Text>

                <Text className="text-base text-black-200 font-rubik-semibold text-center mt-2">
                    Let's get you started.
                </Text>

                <Text className="text-lg font-rubik text-black-default text-center mt-16">Login to Berry with Google</Text>
                <TouchableOpacity onPress={handleLogin} className ="bg-white shadow-md shadow-black-200 rounded-full w-full py-4 mt-5">
                    <View className ="flex flex-row items-centre justify-center">
                        <Image 
                    source={images.google} className="w-5 h-7" resizeMode="contain"/>
                    <Text className="text-lg font-rubik-midium text-black-200 ml-2 text-center"> Continue with Google </Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default SingIn