"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ReviewsSectionOpinie() {
  const reviewImages = [
    "/opinie/opinia1.jpg",
    "/opinie/opinia2.jpg",
    "/opinie/opinia3.jpg",
    "/opinie/opinia4.jpg",
    "/opinie/opinia5.jpg",
    "/opinie/opinia6.jpg",
    "/opinie/opinia7.jpg",
    "/opinie/opinia8.jpg",
    "/opinie/opinia9.jpg",
    "/opinie/opinia10.jpg",
    "/opinie/opinia11.jpg",
    "/opinie/opinia12.jpg",
    "/opinie/opinia13.jpg",
    "/opinie/opinia14.jpg",
    "/opinie/opinia15.jpg",
    "/opinie/opinia16.jpg",
  ];
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {reviewImages.map((image, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid mb-6"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="bg-white rounded-2xl p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Opinia klienta ${index + 1}`}
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  style={{ aspectRatio: "auto" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
