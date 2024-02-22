import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';

export default function WelcomeScreen() {
    NavigationBar.setBackgroundColorAsync("#03c04a");

    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#03c04a' }}>
            <StatusBar style='auto'></StatusBar>
            <View className="flex-1 flex justify-around my-4">
                <Text
                    className="text-white font-bold text-3xl text-center">
                    Welcome to Agrify!</Text>
                <View className="flex-row justify-center">
                    <Image source={require("../../assets/images/pic2-removebg-preview.png")}
                        style={{ width: 350, height: 350 }} />
                </View>

                <View className="space-y-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-700">
                            Sign up with email
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-700">
                            Continue with phone number
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="font-semibold text-yellow-400"> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}