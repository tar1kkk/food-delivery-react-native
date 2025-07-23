import {View, Text, Button, Alert} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {useState} from "react";
import {signIn} from "@/lib/appwtire";
import * as Sentry from "@sentry/react-native";


export default function SignIn() {

    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({email : '', password: ''});
    const submitHandler = async () => {
        const {email, password} = form;
        if(!email || !password) return Alert.alert('Error','Please enter a valid email address & password');

        setSubmitting(true);

        try {
            await signIn({email,password });

            Alert.alert('Success','User signed in successfully');
            router.replace('/');
        } catch (error : any) {
            Alert.alert('Error', error.message);
            Sentry.captureEvent(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput
                placeholder='Enter your email'
                value={form.email}
                onChangeText={(text)=> setForm((prev)=> ({...prev, email: text}))}
                label='Email'
                keyboardType='email-address'
            />
            <CustomInput
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text)=> setForm((prev)=> ({...prev, password: text}))}
                label='Password'
                secureTextEntry={true}
            />

            <CustomButton
                title='Sign In'
                isLoading={isSubmitting}
                onPress={submitHandler}
            />

            <View className='flex justify-center mt-5 gap-2 flex-row'>
                <Text className='base-regular text-gray-100'>
                    Don't have an account?
                </Text>
                <Link href='/sign-up' className='base-bold text-primary'>
                    Sign Up
                </Link>
            </View>
        </View>
    )
}