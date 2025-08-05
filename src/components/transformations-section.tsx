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
    "przemiana1.jpeg",
    "przemiana2.jpeg",
    "przemiana3.jpeg",
    "przemiana4.jpeg",
    "przemiana5.jpeg",
    "przemiana6.jpeg",
    "przemiana7.JPG",
    "przemiana8.jpeg",
  ];

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <section className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
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
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1">
                  <Image
                    src={`/przemiany/${src}`}
                    alt={`Przemiana podopiecznego ${index + 1}`}
                    width={300}
                    height={400}
                    className="rounded-lg object-cover w-full h-auto"
                  />
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
