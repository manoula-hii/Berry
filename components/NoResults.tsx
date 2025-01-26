import {View, Text, Image} from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
    return (
        <View className="flex items-center my-5">
            <Image source={images.noresult} className="w-11/12 h-40" resizeMode="contain" style={{marginTop:30}}/>
            <Text className="text-2xl font-rubic-bold text-black mt-5">No Results</Text>
            <Text className="text-base text-black-200 mt-2">We could not find any results.</Text>
        </View>
    )
}

export default NoResults