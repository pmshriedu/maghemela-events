"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";

interface Event {
  id: string;
  title: string;
  image?: string;
  description: string;
  time: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
      "(min-width: 1280px)": { slidesToScroll: 4 },
    },
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (response.ok) {
          const data = await response.json();
          // Get all events, not just upcoming ones, so we can show expired badge
          setEvents(data.slice(0, 12)); // Show max 12 events for carousel
        } else {
          console.error("Failed to fetch events:", response.status);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
      };

      emblaApi.on("select", onSelect);
      onSelect(); // Initial state

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const isEventExpired = (date: Date) => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  const formatDate = (date: Date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const day = eventDate.getDate();
    const month = eventDate.toLocaleDateString("en-US", { month: "short" });
    const fullDate = eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return { day, month, fullDate };
  };

  if (loading) {
    return (
      <section className="py-20 bg-linear-to-br from-slate-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-500 to-orange-600 rounded-full mx-auto mb-6 shadow-lg">
                <Calendar className="h-10 w-10 text-white animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Loading exciting events...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-linear-to-br from-slate-50 to-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-500 to-orange-600 rounded-full mx-auto mb-6 shadow-lg">
              <Calendar className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't miss these exciting events during the Maghey Sankranti Mela
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Calendar className="h-20 w-20 text-amber-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No Events Found
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're planning exciting events for you. Check back soon for new
                programs and celebrations!
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Navigation */}
            {events.length > 4 && (
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollPrev}
                  disabled={prevBtnDisabled}
                  className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollNext}
                  disabled={nextBtnDisabled}
                  className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {events.map((event) => {
                  const dateInfo = formatDate(event.date);
                  const expired = isEventExpired(event.date);

                  return (
                    <div
                      key={event.id}
                      className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                    >
                      <Card
                        onClick={() => router.push(`/events/${event.id}`)}
                        className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300 cursor-pointer h-full p-0"
                      >
                        {/* Image Section - No gap at top */}
                        <div className="relative overflow-hidden m-0 p-0">
                          {event.image ? (
                            <div className="relative h-48 overflow-hidden w-full">
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                style={{ objectPosition: "center top" }}
                              />
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                            </div>
                          ) : (
                            <div
                              className={`h-48 w-full ${
                                expired
                                  ? "bg-linear-to-br from-gray-400 to-gray-500"
                                  : "bg-linear-to-br from-amber-400 via-orange-400 to-red-400"
                              } flex items-center justify-center relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                              <Calendar className="h-16 w-16 text-white/80" />
                            </div>
                          )}

                          {/* Top colored border */}
                          <div
                            className={`absolute top-0 left-0 right-0 h-1 ${
                              expired
                                ? "bg-gray-400"
                                : "bg-linear-to-r from-amber-500 to-orange-500"
                            }`}
                          />

                          {/* Date Badge */}
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                            <div className="text-center">
                              <div className="text-xl font-bold text-amber-600">
                                {dateInfo.day}
                              </div>
                              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                {dateInfo.month}
                              </div>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge
                              className={`${
                                expired
                                  ? "bg-gray-500 hover:bg-gray-600"
                                  : "bg-green-500 hover:bg-green-600"
                              } text-white shadow-lg px-3 py-1`}
                            >
                              {expired ? "Expired" : "Upcoming"}
                            </Badge>
                          </div>
                        </div>

                        {/* Content Section */}
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                                expired
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-linear-to-r from-amber-500 to-orange-500 text-white"
                              }`}
                            >
                              <Calendar className="h-3 w-3" />
                              Event
                            </span>
                          </div>

                          <CardHeader className="p-0 mb-3">
                            <CardTitle className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {event.title}
                            </CardTitle>
                          </CardHeader>

                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span className="text-xs">
                                {dateInfo.fullDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span className="text-xs">{event.time}</span>
                            </div>
                          </div>

                          {/* Click indicator */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                            <span className="text-xs text-muted-foreground">
                              Click to view details
                            </span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
