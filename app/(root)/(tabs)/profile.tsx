import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, LucideIcon } from 'lucide-react-native';
import { CircleArrowRight } from 'lucide-react-native';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { account, databases, logout, storage } from '@/lib/appwrite';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ID } from 'react-native-appwrite';

interface SettingsItemProps {
    Icon: LucideIcon;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({ Icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
        <View className="flex flex-row items-center gap-3">
            <Icon size={27} color="#660000" />
            <Text className="text-lg font-medium ">{title}</Text>
        </View>
        {showArrow && <CircleArrowRight size={24} color="#660000" />}
    </TouchableOpacity>
);

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=660000&color=ffffff';

const Profile = () => {
    const [image, setImage] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const { user, refetch } = useGlobalContext();
    const [imageLoadError, setImageLoadError] = useState(false);
    const bucketId = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID;

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

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (!permissionResult.granted) {
                Alert.alert('Permission Required', 'Please allow access to your photo library to change profile picture.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                const selectedImage = result.assets[0];
                setImage(selectedImage.uri);
                await uploadImage(selectedImage);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image from library.');
        }
    };

    const uploadImage = async (selectedImage: ImagePicker.ImagePickerAsset) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(selectedImage.uri);
    
            if (!fileInfo.exists) throw new Error('File does not exist');
    
            const fileId = ID.unique();
            const file = {
                uri: selectedImage.uri,
                name: `${fileId}.jpg`,
                type: 'image/jpeg',
                size: fileInfo.size || 0,
            };
    
            if (!bucketId) {
                throw new Error('Bucket ID is not defined. Please check your environment variables.');
            }
            
            const uploadedFile = await storage.createFile(bucketId, fileId, file);
    
            if (user?.$id) {
                await updateUserAvatar(uploadedFile.$id);
                await refetch();
                setImage(null); // Clear temporary image state
                Alert.alert('Success', 'Profile picture updated successfully');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
    };
    
    
      const handleLogout = async () => {
        const result = await logout();

        if (result) {
            Alert.alert('Success', 'You have been logged out successfully.');
            refetch();
        } else {
            Alert.alert('Error', 'An error occurred while logging out.');
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
                <View className="flex flex-row items-center justify-between mt-7">
                    <Text className="text-2xl font-rubik-semibold">Profile</Text>
                    <icons.Bell size={24} color="#660000" />
                </View>

                <View className="flex-row justify-center flex mt-5">
                    <View className="flex flex-col item-center relative justify-center mt-0">
                        <Image 
                            source={{ 
                                uri: image || avatarUrl || DEFAULT_AVATAR,
                                cache: 'reload'
                            }}
                            className="size-32 relative rounded-full"
                            onLoadStart={() => console.log('Image loading started')}
                            onLoadEnd={() => console.log('Image loading ended')}
                            onError={(e) => {
                                console.error('Image loading error:', e.nativeEvent.error);
                                setImageLoadError(true);
                                setAvatarUrl(DEFAULT_AVATAR);
                            }}
                        />
                        {imageLoadError && (
                            <Text className="text-red-500 text-xs mt-1">Failed to load image</Text>
                        )}
                        <TouchableOpacity 
                            className="absolute bottom-11 right-0" 
                            onPress={pickImage}
                        >
                            <icons.Pencil size={20} color="#660000" />
                        </TouchableOpacity>
                        <Text className="text-xl font-rubik-semibold mt-4 text-center">
                            {user?.name || 'User'}
                        </Text>
                    </View>
                </View>

                <View className="flex flex-col mt-4">
                    <SettingsItem Icon={icons.Amphora} title="My Pieces" />
                    <SettingsItem Icon={icons.Wallet} title="Payments" />
                </View>

                <View className="flex flex-col mt-3 border-t pt-5 border-primary-100">
                    {settings.slice(2).map((item, index) => (
                        <SettingsItem key={index} {...item} />
                    ))}
                </View>

                <View className="flex flex-col mt-1 border-t pt-5 border-primary-100">
                    <SettingsItem Icon={icons.LogOut} title="Logout" textStyle="text-red-600" showArrow={false} onPress={handleLogout} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

async function updateUserAvatar(fileId: string) {
    try {
        console.log('Updating user avatar with file ID:', fileId);
        const response = await account.updatePrefs({
            avatar: fileId
        });
        console.log('Avatar update response:', response);
        return response;
    } catch (error) {
        console.error('Error updating user avatar:', error);
        throw error;
    }
}

export default Profile;