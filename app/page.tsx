import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import NavMenuHome from "./components/nav/nav-home";
import Image from "next/image";
import cert from "../public/img/nng-cert.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">

      <nav className="my-16 animate-fade-in z-40">
        <ul className="flex items-center justify-center gap-4">
          <NavMenuHome />
        </ul>
      </nav>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={1000}
      />

      {/* <div className="absolute z-0 w-full h-[640px] opacity-0 animate-fade-in-hero delay-300 bg-[url('/img/hero-image.png')] bg-no-repeat mix-blend-difference bg-center bg-contain" /> */}

      <Image src='/img/halo.svg' alt='background' width='992' height='992' className="absolute z-1 opacity-0 animate-fade-in-scale" />

      <h1 className="z-10 text-8xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-9xl md:text-[20em] whitespace-nowrap bg-clip-text">
        SIMON YOUNG
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="flex flex-col my-16 w-2/3 text-center animate-fade-in z-10">
        <h2 className="font-mono italic text-lg text-zinc-100 lg:top-[2em] rounded-lg p-4 ">
          👋 Hi I'm Simon a Product and UX Designer from Melbourne, Australia. <br />
          I'm the founder of Catchcry Design and End Hunt. <br />
          UX certified with NN/g. Previously at Sportradar and BurnsRED. 
        </h2>
        <div className="self-center p-4">
          <Link href="https://www.nngroup.com/ux-certification/people/" className="cursor-pointer"><Image src={cert} height={84} alt="NN/g UX certificate" quality={100}/></Link>
        </div>
        
      </div>
    </div>
  );

}
