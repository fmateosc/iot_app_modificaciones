//Solo los administradores pueden ver la pagina USERS
export default function({store, redirect }) {    
  const isAdmin = store.state.auth.userData.isAdmin

  if (!isAdmin) {
    return redirect("/dashboard");
  }
}