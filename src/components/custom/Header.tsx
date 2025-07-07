'use client'
import { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import Link from "next/link";
import { SubHeadersLinks } from "@/utils/types";
import {
    LayoutDashboard,
    Package,
    Trophy,
    Menu,
    X,
    Book,
} from 'lucide-react';
import { useId } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/Toastcontext';

const Header: React.FC = ({ }) => {

    const subHeadersLinks: SubHeadersLinks[] = [
        { title: 'Home', link: '/', isActive: false, id: useId(), icon: LayoutDashboard },
        { title: 'All Puzzles', link: '/all-puzzles', isActive: false, id: useId(), icon: Package },
        { title: 'Achievements', link: '/achievements', isActive: false, id: useId(), icon: Trophy },
        { title: 'Learn More', link: '/learn-more', isActive: false, id: useId(), icon: Book },
    ];

    const kidsIcon = '👦';
    const { logout, isAuth, user } = useAuth();
    const { addToast } = useToast()
    const pathName = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        try {
            logout();
            router.push('/')
            addToast("Logout Success", "success")
        } catch (error: unknown) {
            if (error instanceof Error) {
                addToast(error.message, 'error');
            } else {
                addToast('An unexpected error occurred', 'error');
            }
        }
    }

    const handleProfileSettings = () => {
        router.push('/profile')
    }

    const handleLogin = () => {
        router.push('/login')
    }

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
        <header className="bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 shadow-lg border-b-4 border-yellow-200 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex mdcustom:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-yellow-300 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                    <Link href='/' className="flex items-center gap-2">
                        <Image
                            src="/maths2fun1.png"
                            alt="maths2fun Logo"
                            width={80}
                            height={80}
                            priority
                            className="w-16 h-12 md:w-18 md:h-14 drop-shadow-xl"
                        />
                        <span className={`text-3xl font-bold text-yellow-200 hidden sm:block font-['Comic_Sans_MS'] drop-shadow-xl`}>
                            Maths2Fun
                        </span>
                    </Link>
                    <div className="hidden mdcustom:flex">
                        <nav className='flex items-center justify-center gap-8'>
                            {subHeadersLinks.map(links => {
                                const isActive = pathName === links.link;
                                return (
                                    <Link key={links.id} href={links.link} className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-yellow-200 text-blue-800 font-bold shadow-md' : 'text-white hover:text-yellow-200 hover:bg-white/10'}`}>
                                        {links.icon && <links.icon size={20} className="mr-1" />}{links.title}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                    <div className={`mdcustom:hidden absolute top-16 left-0 right-0 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} ref={menuRef}>
                        <nav className="flex flex-col px-4 py-2">
                            {subHeadersLinks.map(links => {
                                const isActive = pathName === links.link;
                                return (
                                    <Link
                                        key={links.id}
                                        href={links.link}
                                        className={`py-3 px-4 flex items-center rounded-lg transition-colors duration-200 ${isActive ? 'bg-yellow-200 text-blue-800 font-bold shadow-md' : 'text-white hover:text-yellow-200 hover:bg-white/10'}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {links.icon && <links.icon size={20} className="mr-1" />}{links.title}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-yellow-200 flex items-center hover:bg-white cursor-pointer justify-center text-xl shadow-md"
                                onClick={handleProfileSettings}>
                                {kidsIcon}
                            </div>
                            <span className="hidden sm:block text-white text-sm font-medium drop-shadow-xl">
                                Welcome {isAuth ? user?.displayName?.toUpperCase() : 'Guest'}
                            </span>
                            {isAuth ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-pink-500 text-white px-4 py-2 font-bold rounded-lg hover:bg-pink-400 transition-colors duration-300 shadow-md"
                                >Logout
                                </button>
                            ) : (
                                <button onClick={handleLogin}
                                    className="bg-transparent border-2 border-yellow-200 text-yellow-200 py-2 px-4 rounded-lg font-bold hover:bg-yellow-200 hover:text-blue-800 transition-colors duration-300 animate__animated animate__bounceIn shadow-md">
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