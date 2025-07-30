interface DocumentsLayoutProps{
    children: React.ReactNode;
}

 const AuthLayout=({children}:DocumentsLayoutProps)=>{
    return(
        <div>
        <nav className="bg-amber-200 p-4">Auth Page</nav>
        {children}
        </div>
    )
}
export default AuthLayout;