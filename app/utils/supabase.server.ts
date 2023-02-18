// este archivo tiene un .server en su nombre para que Remix sepa que esto lo tenemos que empaquetar desde el servidor
import { createServerClient } from "@supabase/auth-helpers-remix"
import type { Database } from "~/types/database"

export const createSupabaseServerClient = ({
  request,
  response,
}: {
  request: Request
  response: Response
}) =>
  createServerClient<Database>(
    process.env.SUPABASE_URL!, // process no está definido en el cliente, se lo pasamos desde el servidor
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  )
