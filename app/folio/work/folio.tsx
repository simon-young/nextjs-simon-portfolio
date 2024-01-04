import type { Work } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";
import { Suspense } from "react";
import Image from "next/image";
// import shimmer from "@/app/components/shimmer";

type Props = {
	work: Work;
	views: number;
};

export const Folio: React.FC<Props> = ({ work, views }) => {

	const shimmer = (w: number, h: number) => 
	`<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
			<linearGradient id="g">
			<stop stop-color="#333" offset="20%" />
			<stop stop-color="#222" offset="50%" />
			<stop stop-color="#333" offset="70%" />
			</linearGradient>
		</defs>
		<rect width="${w}" height="${h}" fill="#333" />
		<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
		<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
	</svg>`

	const toBase64 = (str: string) =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str);
	
	return (
			<article className="p-4 md:p-4">

				<div className={`flex bg-zinc-800 h-[250px] mb-4 rounded-lg overflow-hidden`}>
				{work.image && (
					
						<div className={`relative flex bg-zinc-800 h-[auto] mb-0 rounded-lg overflow-hidden content-stretch w-full`}>
							
								{ work.videowebm || work.videomp4 ?
									<video muted autoPlay playsInline loop className="object-cover">
										<source src={work.videowebm} type="video/webm" />
										<source src={work.videomp4} type="video/mp4" />
									</video>
								
								:
								
								<Image src={`${work.image}`} alt="top-work" placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} fill className="relative object-cover" />
								
								}
							
						</div>
					
				)}
                </div>

				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{work.date ? (
							<time dateTime={new Date(work.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(work.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					{/* <span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span> */}
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-5xl text-zinc-200 group-hover:text-white font-display tracking-[.01em]">
					{work.title}
				</h2>
				{/* <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{work.description}
				</p> */}
			</article>
		// </Link>
	);
};
