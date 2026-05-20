import { useState } from "react"
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"

const Navbar = () => {
    const { user, setUser, navigate } = useAppContext()
    const [open, setOpen] = useState(false)

    const handleUserLogin = () => {
        setOpen(false)
        setShowUserLogin(true)
    }

    const handleUserLogout = async () => {
        setUser(null)
        navigate('/')
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/">
                <img src={assets.logo} alt="logo" className="w-38 h-10" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                </div>

                <div className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="cart" className="w-4 h-4" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src={assets.profile_icon} alt="profile" className="w-8 h-8" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 w-30 bg-white shadow-md border border-gray-200 py-2.5 rounded-md text-sm z-40">
                            <li onClick={() => navigate('my-orders')} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Orders</li>
                            <li onClick={handleUserLogout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>

                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                {user && (
                    <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink>
                )}
                <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                {!user ? (
                    <button onClick={handleUserLogin} className="cursor-pointer px-6 py-2 mt-2 bg-primary transition text-white rounded-full text-sm">
                        Login
                    </button>
                ) : (
                    <button onClick={handleUserLogout} className="cursor-pointer px-6 py-2 mt-2 bg-primary transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}

            </div>
        </nav>
    )
}

export default Navbar