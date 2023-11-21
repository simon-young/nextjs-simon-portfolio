import { Suspense } from "react";
import { Navigation } from "../components/nav/nav";
import Loading from "./loading";

export default function FolioLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
            <div className="relative pb-16">
                <Navigation />
				<Suspense fallback={<Loading />}>
					{children}
				</Suspense>
			    
            </div>
		</div>
	);
}