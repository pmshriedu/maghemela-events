"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const galleryImages = [
    {
      src: "/assets/gallery/culture.jpg",
      title: "Cultural Dance Performance",
      category: "Cultural",
    },
    {
      src: "/assets/gallery/crowd 1.jpg",
      title: "Festival Crowd Celebration",
      category: "Community",
    },
    {
      src: "/assets/gallery/gurung dance.jpg",
      title: "Traditional Gurung Dance",
      category: "Cultural",
    },
    {
      src: "/assets/gallery/handicrafts.jpg",
      title: "Traditional Handicrafts",
      category: "Arts",
    },
    {
      src: "/assets/gallery/sports.jpg",
      title: "Festival Sports Events",
      category: "Sports",
    },
    {
      src: "/assets/gallery/giant wheel.jpg",
      title: "Giant Wheel Attraction",
      category: "Entertainment",
    },
    {
      src: "/assets/gallery/book stall.jpg",
      title: "Book Stall Exhibition",
      category: "Education",
    },
    {
      src: "/assets/gallery/logo launching.jpg",
      title: "Logo Launching Ceremony",
      category: "Cultural",
    },
    {
      src: "/assets/gallery/Damphu.jpg",
      title: "Damphu Traditional Music",
      category: "Cultural",
    },
    {
      src: "/assets/gallery/crowd 2.jpg",
      title: "Community Gathering",
      category: "Community",
    },
    {
      src: "/assets/gallery/jore.JPEG",
      title: "Jorethang Festival Scene",
      category: "Cultural",
    },
    {
      src: "/assets/gallery/one.jpeg",
      title: "Festival Highlights",
      category: "Cultural",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery1.jpeg",
      title: "Community Celebration 1",
      category: "Community",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery11.jpeg",
      title: "Community Celebration 2",
      category: "Community",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery12.jpeg",
      title: "Community Celebration 3",
      category: "Community",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery123.jpeg",
      title: "Community Celebration 4",
      category: "Community",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery1234.jpeg",
      title: "Community Celebration 5",
      category: "Community",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery12343.jpeg",
      title: "Community Celebration 6",
      category: "Community",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery1234332.jpeg",
      title: "Community Celebration 7",
      category: "Community",
    },
    {
      src: "/assets/gallery/banner gallery/bn0gallery12ds.jpeg",
      title: "Community Celebration 8",
      category: "Community",
    },
  ];

  const categories = [
    "All",
    "Cultural",
    "Community",
    "Arts",
    "Sports",
    "Entertainment",
    "Education",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((image) => image.category === selectedCategory);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? filteredImages.length - 1
          : selectedImageIndex - 1
      );
    }
  };

  return (
    <>
      <main className="min-h-screen bg-linear-to-br from-background to-muted/20 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-linear-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-playfair">
                📸 Festival Gallery
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Capturing moments of joy, tradition, and community spirit from
                seven decades of celebration
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-primary/80 mb-2">
                      {image.category}
                    </span>
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Festival Highlights Video */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-playfair">
                🎬 Festival Highlights
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the magic and tradition of Maghey Sankranti Mela
                through our highlight video
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  <source
                    src="/assets/Highlights Video/Highlights.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Maghey Sankranti Mela 2024 Highlights
                </h3>
                <p className="text-muted-foreground">
                  A celebration of culture, community, and tradition spanning
                  seven decades
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Share */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-8 rounded-2xl bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Share Your Memories
              </h2>
              <p className="text-muted-foreground mb-6">
                Have photos or videos from past festivals? We'd love to feature
                them in our gallery! Share your memories with us and become part
                of our visual heritage.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-card rounded-full border">
                  📧 Email: vishalmukhia@gmail.com
                </span>
                <span className="px-4 py-2 bg-card rounded-full border">
                  📱 Phone: +91 70012 71507
                </span>
                <span className="px-4 py-2 bg-card rounded-full border">
                  📱 Phone: +91 6296 796 429
                </span>
                <span className="px-4 py-2 bg-card rounded-full border">
                  #MagheySankrantiMela
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <Image
                src={filteredImages[selectedImageIndex].src}
                alt={filteredImages[selectedImageIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">
                {filteredImages[selectedImageIndex].title}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/80">
                {filteredImages[selectedImageIndex].category}
              </span>
              <p className="text-sm text-gray-300 mt-2">
                {selectedImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <DesktopDock />
      <MobileNav />
    </>
  );
}
