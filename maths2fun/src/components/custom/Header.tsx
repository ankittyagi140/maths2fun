'use client'
import Ract,{useMemo, useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import { SubHeadersLinks } from "@/utils/types";
import {
    LayoutDashboard,
    Package,
    Trophy,
} from 'lucide-react';
import { useId } from "react";
import { usePathname } from 'next/navigation';



const Header: React.FC = ({ }) => {

    const subHeadersLinks: SubHeadersLinks[] = [
        { title: 'All Apps', link: '/', isActive: false, id: useId(), icon: LayoutDashboard },
        { title: 'My Apps', link: '/myapps', isActive: false, id: useId(), icon: Package },
        { title: 'Achievements', link: '/achievements', isActive: false, id: useId(), icon: Trophy },
    ];
    const kidEmojis = useMemo(() => ['👦', '👧', '🧒', '🏽', '👧🏾'], []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

    const pathName = usePathname();

    const handleLogout=()=>{}


    const [kidIcon, setKidIcon] = useState('👦');

    const handleProfileSettings=()=>{}

    const handleLogin=()=>{}


    return (
        <header className="bg-black sticky top-0 z-50">
            <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href='/' className="flex items-center">
                        {/* <Image
                 src="/maths2fun.png"
                 alt="maths2fun Logo"
                 width={80}
                 height={80}
                 priority
                 className="w-16 h-12 md:w-18 md:h-14"
                /> */}
                        <span className={`text-4xl font-bold text-[#FFE66D] font-['Comic_Sans_MS']`}>
                            Maths2Fun
                        </span>
                    </Link>
                    <div className="flex">
                        <nav className='flex items-center justify-center gap-8'>
                            {subHeadersLinks.map(links => {
                                const isActive = pathName === links.link;
                                return (
                                    <Link key={links.id} href={links.link} className={`flex items-center ${isActive ? 'text-[#FFE66D]' : 'text-white'} hover:text-[#FFE66D]`}>{links.icon && <links.icon />}{links.title}</Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FFE66D] flex items-center hover:bg-white cursor-pointer justify-center text-xl"
                                onClick={handleProfileSettings}>
                                {kidIcon}
                            </div>

                            <span className="hidden sm:block text-white text-sm font-medium">
                                Welcome 
                            </span>

                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-red-700 transition-colors flex items-center gap-2 text-sm md:text-base"
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <>
                                            {/* <Loader className="animate-spin h-4 w-4 md:h-5 md:w-5" /> */}
                                            <span className="hidden sm:inline">Logging Out...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="sm:inline">Logout</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button onClick={handleLogin}
                                    className="bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] p-2 bordred-full font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 animate__animated animate__bounceIn">
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