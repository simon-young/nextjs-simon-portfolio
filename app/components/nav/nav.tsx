"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { Children, useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	function NavLink({ link, children }: { link: string, children: string }) {
		return (
			<Link
                href={link}
                className="text-sm font-mono italic uppercase duration-200 p-4 bg-gradient-to-b from-[#c72872] from-[20%] to-[#F470AE] hover:text-zinc-300 text-transparent underline underline-offset-4 bg-clip-text decoration-[#F470AE] hover:decoration-white md:text-xl"
			>
				{children}
			</Link>
		);
	}

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b bg-[rgba(0,0,0,0.04)]  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-2 mx-auto md:p-6">
					<div className="flex justify-between gap-2 sm:gap-4 md:gap-8">
						
						<NavLink link={'case-studies'}>UX case studies</NavLink>
						<NavLink link={'work'}>Work</NavLink>
						<NavLink link={'contact'}>Contact</NavLink>

					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
