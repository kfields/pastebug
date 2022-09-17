import { computed } from 'vue';
import { defineStore } from 'pinia';
import { ApiError, User } from '@supabase/supabase-js';
import useSupaBase from 'api/supabase';

export const useUserStore = defineStore('user', () => {
  const { supabase } = useSupaBase();
  //let user = $ref<User | null | undefined>();
  //const user = computed(() => supabase.auth.user());
  let user = $ref<User | null | undefined>(supabase.auth.user());
  const isSignedIn = computed(() => user != null);

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
    switch (event) {
      case 'SIGNED_IN':
        {
          user = session?.user;
        }
        break;
      case 'SIGNED_OUT':
        {
          user = null;
        }
        break;
    }
  });

  async function setPassword(password: string) {
    console.log('setPassword');
    const session = supabase.auth.session();
    console.log(session);
    //const user = supabase.auth.user()
    console.log(user);
    const token = session?.access_token;
    if (token) {
      supabase.auth.setAuth(token);
      const { data, error } = await supabase.auth.update({ password });
      if (error) {
        alert(error.message);
      }
    } else {
      console.log('no token');
    }
  }

  async function signIn(email: string, password: string) {
    console.log(supabase);
    const {
      user: authUser,
      session,
      error,
    } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    }
  }

  async function signOut() {
    console.log('signOut');
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }
  }

  return {
    user,
    isSignedIn,
    setPassword,
    signIn,
    signOut,
  };
});
