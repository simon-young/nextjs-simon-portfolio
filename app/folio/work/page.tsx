import Link from "next/link";
import React, { Suspense } from "react";
import { allWorks } from "contentlayer/generated";
import { Navigation } from "../../components/nav/nav";
import { Card } from "../../components/card";
import { Article } from "./article";
import { Folio } from "./folio";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import Loading from "./loading";
import Image from 'next/image';
import feature_image from '../../public/img/smiley-white.gif';

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function WorksPage() {
  const views = (
    await redis.mget<number[]>(
      ...allWorks.map((p) => ["pageviews", "work", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allWorks[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allWorks.find((work) => work.slug === "frogbox")!;
  const top2 = allWorks.find((work) => work.slug === "chronark.com")!;
  const top3 = allWorks.find((work) => work.slug === "highstorm")!;
  const sorted = allWorks
    .filter((p) => p.published)
    .filter(
      (work) =>
        work.slug !== featured.slug &&
        work.slug !== top2.slug &&
        work.slug !== top3.slug,
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
            Work
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        {/* <div className="hidden w-full h-px md:block bg-zinc-800" /> */}

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((work) => (
                <Card key={work.slug}>
                  <Folio work={work} views={views[work.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((work) => (
                <Card key={work.slug}>
                  <Folio work={work} views={views[work.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((work) => (
                <Card key={work.slug}>
                  <Folio work={work} views={views[work.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
  );
}
