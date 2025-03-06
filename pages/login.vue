<template>
    <div class="flex bg-zinc-900 h-screen">
        <!-- Sidebar -->
        <div class="bg-[#09090B] w-[516px] p-12 flex flex-col justify-center">
            <Logo />
            <h1 class="text-white font-bold text-lg mt-8">Log in to your account</h1>
            <p class="text-[#F4F4F5] text-sm mt-1">Don't have an account?<nuxt-link to="/register"
                    class="font-bold text-[#FFAC00] underline"> Sign Up</nuxt-link> for one.</p>
            <form @submit.prevent="submitForm">
                <div class="mt-8">
                    <label for="" class="text-[#F4F4F5] text-sm block mb-2">Email Address</label>
                    <input v-model="email" type="email" placeholder="you@example.com"
                        class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-2 py-2 placeholder:text-[#66666B] text-sm" />
                </div>

                <div class="mt-6">
                    <label for="" class="text-[#F4F4F5] text-sm block mb-2">Password</label>
                    <input v-model="password" type="password" placeholder="***************"
                        class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-2 py-2 placeholder:text-[#66666B] text-sm" />
                </div>

                <!-- sign up button -->
                <div>
                    <button
                        class="w-full mt-4 bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2">
                        <span>Login</span>
                        <ArrowRight />
                    </button>
                </div>
                <!-- /sign up button -->
            </form>

        </div>
        <!--/sidebar -->

        <!-- note Introduction -->
        <div>

        </div>
        <!-- /note I ntroduction -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');

async function submitForm() {
    try {
        console.log(email.value, password.value);
        const response = await $fetch('/api/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value
            }
        });

        const { isConfirmed } = await Swal.fire({
            title: 'Success!',
            text: 'Logged In Successfully',
            icon: 'success',
            confirmButtonText: 'Close'
        });

        if (isConfirmed) {
            navigateTo('/')
            // $router.push('/');
        }
    } catch (error) {
        console.log("ERROR")
        console.log(error.response?._data?.message);
        Swal.fire({
            title: 'Error!',
            text: error.response?._data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        });
    }
}
</script>