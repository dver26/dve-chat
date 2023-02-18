import { useOutletContext } from "@remix-run/react"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/types/database"

type TypedSupabaseClient = SupabaseClient<Database>

export type SupabaseOutletContext = {
  name: string,
  supabase: TypedSupabaseClient
}

export const useSupabase = () => {
  const { supabase } = useOutletContext<SupabaseOutletContext>()
  return supabase
}