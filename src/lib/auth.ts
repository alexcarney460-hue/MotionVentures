'use client';

import { getSupabase } from './supabase';

const ADMIN_EMAIL = 'gardenablaze@gmail.com';

export async function getUser() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function isAdmin() {
  const user = await getUser();
  return user?.email?.toLowerCase() === ADMIN_EMAIL;
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string) {
  const supabase = getSupabase();
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  const supabase = getSupabase();
  return supabase.auth.signOut();
}
