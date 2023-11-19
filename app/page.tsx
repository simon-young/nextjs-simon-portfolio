import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import NavMenu from "./components/nav/navigation";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">

      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          <NavMenu />
        </ul>
      </nav>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={1000}
      />

      <h1 className="z-10 text-9xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-9xl md:text-[20em] whitespace-nowrap bg-clip-text">
        SIMON YOUNG
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="my-16 text-center animate-fade-in">
        <h2 className="font-mono italic uppercase text-lg text-zinc-400 ">
          👋 UX Designer | Melbourne, Australia 
        </h2>
      </div>
    </div>
  );

}
