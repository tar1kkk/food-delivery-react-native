import {View, Text, Button, Alert} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {useState} from "react";
import {createUser} from "@/lib/appwtire";

export default function SignUp() {

    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({name: '',email : '', password: ''});
    const submitHandler = async () => {
        const {name,email,password} = form;

        if(!name || !email || !password) return Alert.alert('Error','Please enter a valid email address & password');
        setSubmitting(true);

        try {
            await createUser({
                email,
                password,
                name
            });
            Alert.alert('Success','User signed in successfully');
            router.replace('/');
        } catch (error : any) {
            Alert.alert('Error', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput
                placeholder='Enter your full name'
                value={form.name}
                onChangeText={(text)=> setForm((prev)=> ({...prev, name: text}))}
                label='Full name'
            />
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
                title='Sign Up'
                isLoading={isSubmitting}
                onPress={submitHandler}
            />

            <View className='flex justify-center mt-5 gap-2 flex-row'>
                <Text className='base-regular text-gray-100'>
                    Already have an account?
                </Text>
                <Link href='/sign-in' className='base-bold text-primary'>
                    Sign In
                </Link>
            </View>
        </View>
    )
}