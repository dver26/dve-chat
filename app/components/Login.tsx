import { useSupabase } from "~/hooks/useSupabase"

export default function Login() {
  const supabase = useSupabase()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log("Error al cerrar sesión", error)
    console.log('loggeado')
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    })

    if (error) console.log("Error al cerrar sesión", error)
  }

  return (
    <div style={{display: 'flex', gap: '12px'}}>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  )
}
