"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/projects"
							className="font-mono italic underline duration-200 text-xl hover:text-zinc-100 bg-gradient-to-b from-pink-900 from-20% via-pink-500 via-80% to-indigo-400 text-transparent bg-clip-text"
						>
							Projects
						</Link>

						<Link
							href="/case-studies"
							className="font-mono underline italic duration-200 text-xl hover:text-zinc-100 bg-gradient-to-b from-pink-900 from-20% via-pink-500 via-80% to-indigo-400 text-transparent bg-clip-text"
						>
							UX Case Studies
						</Link>

						<Link
							href="/contact"
							className="font-mono italic duration-200 text-xl hover:text-zinc-100 bg-gradient-to-b from-pink-900 from-20% via-pink-500 via-80% to-indigo-400 text-transparent bg-clip-text"
						>
							Contact
						</Link>
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
