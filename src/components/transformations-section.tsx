"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TransformationsSection() {
  const transformations = [
    "przemiana1.png",
    "przemiana2.png",
    "przemiana3.png",
    "przemiana4.png",
    "przemiana5.png",
    "przemiana6.png",
    "przemiana7.png",
  ];

  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

  return (
    <section className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto md:px-6 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center md:mb-16 mb-8">
          Przemiany moich podopiecznych
        </h2>

        <Carousel
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl"
          opts={{
            align: "start",

            loop: true,
          }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {transformations.map((src, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1">
                  <div className="rounded-lg overflow-hidden aspect-[9/8]">
                    <Image
                      src={`/przemiany/${src}`}
                      alt={`Przemiana podopiecznego ${index + 1}`}
                      width={1080}
                      height={960}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white hover:text-white border-0 sm:flex" />

          <CarouselNext className="hidden bg-[var(--brand-accent-strong)] hover:bg-[var(--brand-accent-darker)] text-white hover:text-white border-0 sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
