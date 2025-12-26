"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Plane,
  Train,
  Car,
  MapPin,
  Clock,
  Info,
  Phone,
  Navigation,
  Mountain,
  Route,
  Fuel,
  Ticket,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HowToReachPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("air");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tipsSectionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on mobile when modal opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      // Check if we're on mobile (screen width < 640px)
      const isMobile = window.innerWidth < 640;

      if (isMobile) {
        // Use requestAnimationFrame for better timing
        const scrollToBottom = () => {
          if (scrollContainerRef.current) {
            // Calculate the exact scroll position to show the last card fully
            const container = scrollContainerRef.current;
            const containerHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;

            // Scroll to show the bottom content with some margin
            const targetScrollTop = Math.max(
              0,
              scrollHeight - containerHeight + 40
            );
            container.scrollTop = targetScrollTop;
          }
        };

        // Delay to ensure all content and animations are complete
        setTimeout(() => {
          requestAnimationFrame(scrollToBottom);
        }, 600);

        // Additional scroll attempt after a longer delay to ensure it works
        setTimeout(() => {
          requestAnimationFrame(scrollToBottom);
        }, 1000);
      }
    }
  }, [isOpen]);

  const transportModes = [
    {
      id: "air",
      label: "By Air",
      icon: Plane,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "rail",
      label: "By Train",
      icon: Train,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "road",
      label: "By Road",
      icon: Car,
      color: "from-orange-500 to-red-500",
    },
  ];

  const airportInfo = [
    {
      name: "Bagdogra Airport (IXB)",
      location: "West Bengal",
      distance: "125 km",
      duration: "3.5-4 hours",
      description:
        "Major airport with regular flights from Delhi, Mumbai, Kolkata, and Guwahati",
      facilities: [
        "Taxi Services",
        "Car Rentals",
        "Bus Services",
        "Helicopter Services",
      ],
      tips: "Pre-book taxis or shared vehicles for best rates. Helicopter services available to Gangtok.",
    },
    {
      name: "Pakyong Airport (PYG)",
      location: "Sikkim",
      distance: "90 km",
      duration: "2.5-3 hours",
      description: "Sikkim's own airport with limited but growing connectivity",
      facilities: ["Taxi Services", "Government Transport", "Car Rentals"],
      tips: "Check flight schedules as services are weather dependent. Beautiful mountain views during landing.",
    },
  ];

  const railwayInfo = [
    {
      name: "New Jalpaiguri Railway Station (NJP)",
      location: "West Bengal",
      distance: "115 km",
      duration: "3-4 hours",
      description: "Major railway junction connecting all major Indian cities",
      facilities: ["Taxi Stand", "Bus Terminal", "Shared Jeeps", "Hotels"],
      tips: "Pre-booked taxis recommended. Shared jeeps (sumo) are economical options.",
    },
    {
      name: "Siliguri Railway Station",
      location: "West Bengal",
      distance: "88 km",
      duration: "2.5-3 hours",
      description: "Another convenient railhead with good connectivity",
      facilities: ["Local Transport", "Taxi Services", "Bus Services"],
      tips: "Closer to town center with more transport options available.",
    },
  ];

  const roadInfo = [
    {
      from: "Gangtok",
      distance: "85 km",
      duration: "3 hours",
      route: "via NH10",
      description: "Scenic mountain drive through beautiful landscapes",
      highlights: ["Mountain Views", "Waterfalls", "Tea Gardens"],
    },
    {
      from: "Darjeeling",
      distance: "30 km",
      duration: "1.5 hours",
      route: "via Kalimpong Road",
      description: "Short and picturesque drive through hill stations",
      highlights: ["Hill Views", "Colonial Architecture", "Tea Estates"],
    },
    {
      from: "Siliguri",
      distance: "83 km",
      duration: "2.5-3 hours",
      route: "via NH10",
      description: "Direct route through foothills and river valleys",
      highlights: ["River Views", "Forest Areas", "Local Markets"],
    },
    {
      from: "Kalimpong",
      distance: "35 km",
      duration: "1.5 hours",
      route: "via Local Roads",
      description: "Pleasant drive through Himalayan foothills",
      highlights: ["Mountain Vistas", "Monasteries", "Flower Gardens"],
    },
  ];

  const importantTips = [
    {
      icon: Ticket,
      title: "Permits",
      description:
        "Indian nationals: No special permit required. Foreign nationals: Protected Area Permit (PAP) required.",
    },
    {
      icon: Mountain,
      title: "Weather",
      description:
        "January weather is pleasant (10-20°C). Carry light woolens and comfortable walking shoes.",
    },
    {
      icon: Fuel,
      title: "Accommodation",
      description:
        "Book accommodations 2-3 weeks in advance. Camping facilities available at festival grounds.",
    },
    {
      icon: Phone,
      title: "Emergency Contact",
      description:
        "Tourist Helpline: 1363 | Police: 100 | Medical Emergency: 108",
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-20 sm:bottom-8 right-4 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
            size="icon"
          >
            <Navigation className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4, duration: 0.3 }}
        >
          How to Reach
          <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
        </motion.div>
      </motion.div>

      {/* Main Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-none mx-0 sm:mx-4 sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
          <DialogHeader className="px-4 sm:px-6">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
              How to Reach Jorethang Nayabazar
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              Complete travel guide to reach the Maghey Sankranti Mela venue
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col h-full max-h-[calc(95vh-120px)] sm:max-h-[60vh] px-4 sm:px-6">
            {/* Transport Mode Tabs */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                {transportModes.map((mode) => (
                  <Button
                    key={mode.id}
                    variant={activeTab === mode.id ? "default" : "ghost"}
                    className={`relative flex items-center gap-2 flex-1 sm:flex-none ${
                      activeTab === mode.id
                        ? `bg-linear-to-r ${mode.color} text-white`
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab(mode.id)}
                  >
                    <mode.icon className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{mode.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 pb-8 sm:pb-4"
            >
              <AnimatePresence mode="wait">
                {/* By Air */}
                {activeTab === "air" && (
                  <motion.div
                    key="air"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {airportInfo.map((airport, index) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-blue-500"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <CardTitle className="text-base sm:text-lg">
                              {airport.name}
                            </CardTitle>
                            <Badge variant="secondary" className="w-fit">
                              {airport.location}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-500 shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">
                                {airport.distance}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">
                                {airport.duration}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3 text-sm sm:text-base leading-relaxed">
                            {airport.description}
                          </p>
                          <div className="mb-3">
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">
                              Available Facilities:
                            </h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {airport.facilities.map((facility, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {facility}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                              <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                                {airport.tips}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                )}

                {/* By Rail */}
                {activeTab === "rail" && (
                  <motion.div
                    key="rail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {railwayInfo.map((station, index) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-green-500"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <CardTitle className="text-base sm:text-lg">
                              {station.name}
                            </CardTitle>
                            <Badge variant="secondary" className="w-fit">
                              {station.location}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-green-500 shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">
                                {station.distance}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-green-500 shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">
                                {station.duration}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3 text-sm sm:text-base leading-relaxed">
                            {station.description}
                          </p>
                          <div className="mb-3">
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">
                              Available Facilities:
                            </h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {station.facilities.map((facility, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {facility}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                              <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
                                {station.tips}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                )}

                {/* By Road */}
                {activeTab === "road" && (
                  <motion.div
                    key="road"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {roadInfo.map((route, index) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-orange-500"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <CardTitle className="text-base sm:text-lg">
                              From {route.from}
                            </CardTitle>
                            <Badge variant="secondary" className="w-fit">
                              {route.route}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-orange-500 shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">
                                {route.distance}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-orange-500 shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">
                                {route.duration}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3 text-sm sm:text-base leading-relaxed">
                            {route.description}
                          </p>
                          <div className="mb-3">
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">
                              Route Highlights:
                            </h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {route.highlights.map((highlight, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Important Tips */}
              <Separator className="my-4 sm:my-6" />
              <div ref={tipsSectionRef}>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                  Important Travel Tips
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {importantTips.map((tip, index) => (
                    <Card key={index} className="border-amber-200">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full shrink-0">
                            <tip.icon className="h-4 w-4 text-amber-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-sm sm:text-base mb-1">
                              {tip.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                              {tip.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Location Map */}
                <div className="mt-6 sm:mt-8">
                  <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Festival Venue Location
                  </h4>
                  <Card className="border-primary/20">
                    <CardContent className="p-3 sm:p-4">
                      <div className="mb-3 sm:mb-4">
                        <h5 className="font-semibold text-sm sm:text-base mb-2 text-foreground">
                          Nayabazar Jorethang Nagar Panchayat (NJNP)
                        </h5>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          South Sikkim District, Namchi - PIN: 737121
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Sacred Confluence: River Rangeet & Rangam
                        </p>
                      </div>

                      <div className="aspect-video w-full rounded-lg overflow-hidden border border-border mb-3 sm:mb-4">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123!2d88.359!3d27.1668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e69d003dd02547%3A0xa128e39d612cef01!2zSm9yZXRoYW5nIHJvYWQ!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Nayabazar Jorethang Location Map"
                        ></iframe>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Info className="h-4 w-4 shrink-0" />
                          <span>Interactive map - zoom and pan to explore</span>
                        </div>
                        <a
                          href="https://www.google.com/maps/search/Nayabazar+Jorethang+Nagar+Panchayat+NJNP+South+Sikkim+District+Namchi+PIN+737121"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto justify-center"
                        >
                          <Navigation className="h-4 w-4" />
                          Get Directions
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
