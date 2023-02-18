import { json } from '@remix-run/node'
import type { MetaFunction, LinksFunction, LoaderArgs } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { createBrowserClient } from '@supabase/auth-helpers-remix'
import { useEffect, useState } from 'react'

import styles from './styles/global.css'
import type { Database } from './types/database'
import { createSupabaseServerClient } from './utils/supabase.server'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Dve-Chat',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }

  const response = new Response()

  const supabase = createSupabaseServerClient({ request, response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json({ env, session }, { headers: response.headers })
}

export default function App() {
  const { env, session } = useLoaderData<typeof loader>()

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  )

  console.log('server', { session })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('client', { session })
    })
  }, [])

  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase }} />{' '}
        {/* aquí es donde va lo que se renderiza desde la ruta */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
