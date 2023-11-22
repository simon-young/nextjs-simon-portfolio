"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useElementOnScreen } from "@/util/useElementOnScreen";

export const Navigation: React.FC = () => {

	// const [ containerRef, isVisible ] = useElementOnScreen({
	// 	root: null,
	// 	rootMargin: "0px",
	// 	threshold: 1.0
	// });

	const pathname = usePathname();
	const router = useRouter();
	let arrowNavName = '';

	if (pathname?.includes('/case-studies/')) {
		arrowNavName = 'Case Studies';

	} else if (pathname?.includes('/work/')) {
		arrowNavName = 'Work';

	} else {
		arrowNavName = 'Home';
	}

	const handleClick = () => {
		if (pathname?.includes('/case-studies/')) {
			router.push('/folio/case-studies');

		} else if (pathname?.includes('/work/')) {
			router.push('/folio/work');

		} else {
			router.push('/');
		}
	}


	const NavLink = ({ link, children }: { link: string, children: string }) => {

		return (
				<div className="relative">
					<Link
						href={link}
						className={`text-sm font-mono italic uppercase duration-200 p-4 bg-gradient-to-b from-[#c72872] from-[20%] to-[#F470AE] hover:text-zinc-300 text-transparent underline underline-offset-4 bg-clip-text decoration-[#F470AE] hover:decoration-white md:text-xl ${pathname === (link) && "before:content-['👉'] before:text-white before:underline before:decoration-transparent before:absolute before:left-[-12px] before:animate-nav-marker sm:before:left-[-4px] md:before:left-[-12px]"} `}
					>
						{children}
					</Link>
				</div>
		);
	};

	return (
		<header>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b bg-[rgba(0,0,0,0.72)] bg-zinc-900/0 border-transparent`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-2 mx-auto md:p-6">
					<div className="flex justify-between gap-2 sm:gap-4 md:gap-8">
						
						<NavLink link={'/folio/case-studies'}>UX case studies</NavLink>
						<NavLink link={'/folio/work'}>Work</NavLink>
						<NavLink link={'/folio/contact'}>Contact</NavLink>

					</div>

					<div>
						<button
							onClick={handleClick}
							className="duration-200 text-zinc-300 hover:text-zinc-100 flex gap-2"
						>
							<ArrowLeft className="w-6 h-6 " />
							<p className="text-zinc-200">{arrowNavName}</p>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};
