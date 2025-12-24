"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  {
    url: "https://youtu.be/Gd1okK9O7H8?si=ubqUNkx3HJBp1Dtu",
  },
  {
    url: "https://youtube.com/shorts/zoYJzWjrKx0?si=my439sYtMmrgYb3_",
  },
  {
    url: "https://youtube.com/shorts/ispvtG3CU3k?si=HrnWyxIA002C9RER",
  },
  {
    url: "https://youtu.be/naV6EeXMnWw?si=Rrv942HQlzLOgL3j",
  },
];

const getYouTubeThumbnail = (url: string) => {
  const videoId = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*v\/|.*shorts\/))([^&\n?#]+)/
  )?.[1];
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
};

export function Videos() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Video Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Experience the festival through our video collection
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-card">
                  <img
                    src={getYouTubeThumbnail(video.url)}
                    alt="Festival Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play
                        className="w-8 h-8 text-primary ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 px-2 py-1 rounded text-xs text-white font-medium">
                    YouTube
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
