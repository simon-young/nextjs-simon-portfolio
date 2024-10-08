import Link from "next/link";
import React, { Suspense } from "react";
import { allCases } from "contentlayer/generated";
import { Card } from "../../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import Image from 'next/image';

import featuredImage from '../../../public/img/frogbox-color.png';

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function CasesPage() {
  const views = (
    await redis.mget<number[]>(
      ...allCases.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allCases[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allCases.find((cases) => cases.slug === "frogbox")!;
  console.log(featured);
  const top2 = allCases.find((cases) => cases.slug === "cplt20")!;
  const top3 = allCases.find((cases) => cases.slug === "coming-soon")!;
  const sorted = allCases
    .filter((p) => p.published)
    .filter(
      (cases) =>
        cases.slug !== featured.slug &&
        cases.slug !== top2.slug &&
        cases.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
      <div className="px-6 mt-12 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 md:mt-2 animate-fade-in-quick">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            UX Case Studies
          </h2>
          <p className="mt-4 text-zinc-400">
            A collection of case studies from my employment as UX Lead at Sportradar for the cricket division.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">

          {/* Featured case */}
          <div className="lg:col-span-2">
            <Card>
              <Link href={`/folio/UX-case-studies/${featured.slug}`}>
                <article className="relative w-full h-full p-4 md:p-4">

                  <Suspense fallback={<p>Loading...</p>}>
                    <div className={`relative flex bg-zinc-800 mb-4 rounded-lg overflow-hidden`}>
                        {/* <Image src={`${featured.image}`} alt="featured-image" width={1548} height={1014} priority className="relative object-cover"/> */}
                        <Image src={featuredImage} alt={featured.title} priority />
                    </div>
                  </Suspense>
                  
                  

                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">
                      {featured.date ? (
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(featured.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>

                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[featured.slug] ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl text-zinc-100 group-hover:text-white sm:text-5xl font-display tracking-[.01em]"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {featured.description}
                  </p>
                  <div className="pt-8">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          </div>
          
          {/* Top cases */}
          {/* <div className="flex flex-row w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0"> */}
            {[top2, top3].map((cases) => (
                <Card key={cases.slug} >
                  <Article cases={cases} views={views[cases.slug] ?? 0 } />
                </Card>
            ))}
          {/* </div> */}
        </div>

      </div>
  );
}
