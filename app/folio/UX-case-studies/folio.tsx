import type { Cases } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";

type Props = {
	cases: Cases;
	views: number;
};

export const Folio: React.FC<Props> = ({ cases, views }) => {
	return (
		<Link href={`/case-studies/${cases.slug}`}>
			<article className="p-4 md:p-4">

				<div className={`flex bg-zinc-800 h-[320px] mb-4 rounded-lg overflow-hidden`}>
                  	{ cases.image &&
						<img src={`${cases.image}`} className="w-full"/>
					}
                </div>

				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{cases.date ? (
							<time dateTime={new Date(cases.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(cases.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-5xl text-zinc-200 group-hover:text-white font-display tracking-[.01em]">
					{cases.title}
				</h2>
				{/* <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{cases.description}
				</p> */}
			</article>
		</Link>
	);
};
