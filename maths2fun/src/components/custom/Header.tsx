'use client'
import { useState, useEffect, useRef} from 'react'
import Image from "next/image";
import Link from "next/link";
import { SubHeadersLinks } from "@/utils/types";
import {
    LayoutDashboard,
    Package,
    Trophy,
    Menu,
    X,
} from 'lucide-react';
import { useId } from "react";
import { usePathname ,useRouter} from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/Toastcontext';



const Header: React.FC = ({ }) => {

    const subHeadersLinks: SubHeadersLinks[] = [
        { title: 'Home', link: '/', isActive: false, id: useId(), icon: LayoutDashboard },
        { title: 'All Puzzles', link: '/all-puzzles', isActive: false, id: useId(), icon: Package },
        { title: 'Achievements', link: '/achievements', isActive: false, id: useId(), icon: Trophy },
    ];

    const kidsIcon = '👦';
  const { logout, isAuth } = useAuth();
  const {addToast} = useToast()


    const pathName = usePathname();
    const router = useRouter();

    const handleLogout=()=>{
        try{
            logout();
        router.push('/')
        addToast("Logout Success","success")
        }catch(error:unknown){
            if (error instanceof Error) {
                addToast(error.message, 'error');
              } else {
                addToast('An unexpected error occurred', 'error');
              }
        }
    }


    const handleProfileSettings=()=>{
        router.push('/profile')
    }

    const handleLogin=()=>{
        router.push('/login')
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-black sticky top-0 z-50">
            <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-[#FFE66D] focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    <Link href='/' className="flex items-center">
                        <Image
                 src="/maths2fun.png"
                 alt="maths2fun Logo"
                 width={80}
                 height={80}
                 priority
                 className="w-16 h-12 md:w-18 md:h-14"
                />
                        <span className={`text-3xl font-bold text-[#FFE66D] hidden sm:block font-['Comic_Sans_MS']`}>
                            Maths2Fun
                        </span>
                    </Link>

                    <div className="hidden md:flex">
                        <nav className='flex items-center justify-center gap-8'>
                            {subHeadersLinks.map(links => {
                                const isActive = pathName === links.link;
                                return (
                                    <Link key={links.id} href={links.link} className={`flex items-center ${isActive ? 'text-[#FFE66D]' : 'text-white'} hover:text-[#FFE66D]`}>
                                        {links.icon && <links.icon size={20} />}{links.title}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className={`md:hidden absolute top-16 left-0 right-0 bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} ref={menuRef}>
                        <nav className="flex flex-col px-4 py-2">
                            {subHeadersLinks.map(links => {
                                const isActive = pathName === links.link;
                                return (
                                    <Link
                                        key={links.id}
                                        href={links.link}
                                        className={`py-3 px-4 flex items-center ${isActive ? 'text-[#FFE66D]' : 'text-white'} hover:text-[#FFE66D] border-b border-gray-800`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {links.icon && <links.icon size={20} />}{links.title}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FFE66D] flex items-center hover:bg-white cursor-pointer justify-center text-xl"
                                onClick={handleProfileSettings}>
                                {kidsIcon}
                            </div>
                            <span className="hidden m:block text-white text-sm font-medium">
                                Welcome 
                            </span>
                            {isAuth ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-[#FF6B6B] text-white px-4 py-2 font-bold hover:bg-[#ff8585] transition-colors duration-300"
                                >Logout
                                </button>
                            ) : (
                                <button onClick={handleLogin}
                                    className="bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] py-2 px-4 bordred-full font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 animate__animated animate__bounceIn">
                                    <span className="sm:inline">Login</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

        </header>
    )

}
export default Header;