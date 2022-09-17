<template>
    <div>
      <form @submit.prevent="handleSignup">
        <div>
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import useSupabase from 'api/supabase';
  
  const { supabase } = useSupabase();
  
  const email = ref('');
  const password = ref('');
  
  const handleSignup = async () => {
    try {
      // Use the Supabase provided method to handle the signup
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };
  </script>
  