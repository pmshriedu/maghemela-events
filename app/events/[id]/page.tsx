"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";

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

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventAndRelated = async () => {
      try {
        // Fetch all events
        const eventsResponse = await fetch("/api/events");
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }

        const eventsData = await eventsResponse.json();
        setAllEvents(eventsData);

        // Find the specific event
        const currentEvent = eventsData.find((e: Event) => e.id === params.id);
        if (!currentEvent) {
          setError("Event not found");
          return;
        }

        setEvent(currentEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEventAndRelated();
    }
  }, [params.id]);

  const isEventExpired = (date: Date) => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  const formatDate = (date: Date) => {
    const eventDate = new Date(date);
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

  const getCurrentEventIndex = () => {
    return allEvents.findIndex((e) => e.id === event?.id);
  };

  const getNextEvent = () => {
    const currentIndex = getCurrentEventIndex();
    if (currentIndex < allEvents.length - 1) {
      return allEvents[currentIndex + 1];
    }
    return null;
  };

  const getPreviousEvent = () => {
    const currentIndex = getCurrentEventIndex();
    if (currentIndex > 0) {
      return allEvents[currentIndex - 1];
    }
    return null;
  };

  const shareEvent = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <>
        <main className="min-h-screen bg-background pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-muted rounded w-32"></div>
                <div className="h-10 bg-muted rounded w-3/4"></div>
                <div className="h-64 bg-muted rounded-2xl"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <DesktopDock />
        <MobileNav />
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <main className="min-h-screen bg-background pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <Link href="/events">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
              <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/events">
                <Button>Browse All Events</Button>
              </Link>
            </div>
          </div>
        </main>
        <DesktopDock />
        <MobileNav />
      </>
    );
  }

  const dateInfo = formatDate(event.date);
  const expired = isEventExpired(event.date);
  const nextEvent = getNextEvent();
  const previousEvent = getPreviousEvent();

  return (
    <>
      <main className="min-h-screen bg-background pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/events">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={shareEvent}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Event Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge
                  className={`${
                    expired ? "bg-gray-500" : "bg-green-500"
                  } text-white px-4 py-2 text-sm`}
                >
                  {expired ? "Expired" : "Upcoming"}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{dateInfo.fullDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{event.time}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                {event.title}
              </h1>
            </motion.div>

            {/* Event Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl"
            >
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className={`w-full h-full ${
                    expired
                      ? "bg-gradient-to-br from-gray-400 to-gray-600"
                      : "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400"
                  } flex items-center justify-center relative`}
                >
                  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                  <Calendar className="h-24 w-24 text-white/80" />
                </div>
              )}

              {/* Date Overlay */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">
                    {dateInfo.day}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {dateInfo.month}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Calendar className="h-6 w-6 text-primary" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed text-foreground">
                    {event.description}
                  </p>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Date</p>
                          <p className="text-muted-foreground">
                            {dateInfo.fullDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Time</p>
                          <p className="text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-500/10 rounded-full">
                          <MapPin className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-muted-foreground">
                            Jorethang, Nayabazar
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-full">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Organizer</p>
                          <p className="text-muted-foreground">
                            MSMC Committee
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation to Next/Previous Events */}
            {(previousEvent || nextEvent) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col md:flex-row gap-4 justify-between"
              >
                {previousEvent ? (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/events/${previousEvent.id}`)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Previous</p>
                      <p className="font-semibold truncate">
                        {previousEvent.title}
                      </p>
                    </div>
                  </Button>
                ) : (
                  <div />
                )}

                {nextEvent && (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/events/${nextEvent.id}`)}
                    className="flex items-center gap-2 flex-1 justify-end"
                  >
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Next</p>
                      <p className="font-semibold truncate">
                        {nextEvent.title}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <DesktopDock />
      <MobileNav />
    </>
  );
}
