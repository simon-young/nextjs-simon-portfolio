"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useElementOnScreen } from "@/util/useElementOnScreen";
import Image from "next/image";
import MenuIcon from "../../../public/img/bars-staggered.svg";
import CloseIcon from "../../../public/img/xmark.svg";

const navigation = [
    { name: "UX Case Studies", href: "folio/UX-case-studies" },
    { name: "Work", href: "folio/work" },
    { name: "Contact", href: "folio/contact" },
];

export default function NavMenuHome() {

    const [ containerRef, isVisible ] = useElementOnScreen({
		root: null,
		rootMargin: "0px",
		threshold: 1.0
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			// Close mobile menu when resizing past breakpoint
			setIsMobile(window.innerWidth);

			if (isMobile > 639) {
				setIsOpen(false);
			}
		}

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		}
	}, [isMobile]);

	const pathname = usePathname();
	const router = useRouter();
	let arrowNavName = '';

	if (pathname?.includes('/UX-case-studies/')) {
		arrowNavName = 'UX Case Studies';

	} else if (pathname?.includes('/work/')) {
		arrowNavName = 'Work';

	} else {
		arrowNavName = 'Home';
	}

	const handleClick = () => {
		if (pathname?.includes('/UX-case-studies/')) {
			router.push('/folio/UX-case-studies');

		} else if (pathname?.includes('/work/')) {
			router.push('/folio/work');

		} else {
			router.push('/');
		}
	}

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	}

    const NavLink = ({ link, children }: { link: string, children: string }) => {

		return (
				<div className="relative">
					<Link
						href={link}
						className={`text-xl sm:text-sm font-mono italic uppercase duration-200 text-zinc-800 sm:text-transparent p-4 bg-gradient-to-b from-[#c72872] from-[20%] to-[#F470AE] hover:text-zinc-300 text-transparent bg-clip-text decoration-[#F470AE] hover:decoration-white md:text-xl ${pathname === (link) && "before:content-['👉'] before:text-white before:underline before:decoration-transparent before:absolute before:left-[-12px] before:animate-nav-marker sm:before:left-[-4px] md:before:left-[-12px]"} `}
						onClick={() => setTimeout(() => setIsOpen(false), 200)}
					>
						{children}
					</Link>
				</div>
		);
	};

    return(
            <header>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b bg-zinc-900/80 border-white/10`}
			>
				<div className="container flex flex-row-reverse items-center justify-between px-6 mx-auto md:p-6 max-w-7xl h-[64px]">
					{/* Desktop Menu */}
					<div className="hidden justify-between gap-2 sm:flex sm:gap-4 md:gap-8">
						
						<NavLink link={'/folio/UX-case-studies'}>UX case studies</NavLink>
						<NavLink link={'/folio/work'}>Work</NavLink>
						<NavLink link={'/folio/contact'}>Contact</NavLink>

					</div>

					{/* Mobile Menu */}
					<div className="flex text-zinc-300 sm:hidden">
						<button onClick={toggleMenu}>
							<Image src={MenuIcon} alt="Menu" width={21} />
						</button>
					</div>

					<div className={`flex flex-row absolute top-0 right-0 w-full ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-200`}>
						<div className="flex bg-transparent w-[48px] h-screen" onClick={toggleMenu}></div>
						<div className="w-full bg-[#C72973] h-screen p-6">
							<div className="flex justify-end">
								<button onClick={toggleMenu}>
									<Image src={CloseIcon} alt="Menu" width={21} />
								</button>
							</div>

							<div className="flex flex-col gap-6 py-8">
								<NavLink link={'/folio/UX-case-studies'}>UX case studies</NavLink>
								<NavLink link={'/folio/work'}>Work</NavLink>
								<NavLink link={'/folio/contact'}>Contact</NavLink>
							</div>
							
						</div>
					</div>

					<div>
						<Link href="/" className="text-white font-display text-4xl">SY</Link>
					</div>
				</div>
			</div>
		</header>
    );
}