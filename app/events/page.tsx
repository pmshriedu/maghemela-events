"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Palette,
  Trophy,
  Leaf,
  Mountain,
  Crown,
  ShoppingCart,
  Briefcase,
  ChefHat,
  User,
  Home,
  Map,
  Shield,
  ShoppingBag,
  Target,
} from "lucide-react";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import Head from "next/head";

export default function EventsPage() {
  const events = [
    {
      title: "Sandhya Aarati",
      date: "14-21 January 2026",
      time: "6:00 PM Daily",
      location: "River Confluence",
      description:
        "Sacred evening prayers at the confluence of Rangeet and Rangam rivers with traditional rituals",
      category: "Spiritual",
      color: "from-orange-500 to-red-500",
      icon: Heart,
    },
    {
      title: "Traditional Culture & Heritage Mela",
      date: "14-21 January 2026",
      time: "10:00 AM - 8:00 PM",
      location: "Heritage Pavilion",
      description:
        "Showcase of traditional arts, crafts, music, dance and cultural performances",
      category: "Cultural",
      color: "from-amber-500 to-yellow-500",
      icon: Palette,
    },
    {
      title: "11th All India Chief Minister's Gold Cup Football Tournament",
      date: "15-20 January 2026",
      time: "10:00 AM - 6:00 PM",
      location: "Renovated Football Stadium",
      description:
        "AIFF-guided football tournament featuring local and regional teams",
      category: "Sports",
      color: "from-green-500 to-emerald-500",
      icon: Trophy,
    },
    {
      title: "Agriculture & Floriculture Exhibition",
      date: "14-21 January 2026",
      time: "9:00 AM - 7:00 PM",
      location: "Agriculture Pavilion",
      description:
        "Display of local agricultural produce, floriculture innovations and farming techniques",
      category: "Agriculture",
      color: "from-lime-500 to-green-500",
      icon: Leaf,
    },
    {
      title: "Adventure & River Tourism Activities",
      date: "14-21 January 2026",
      time: "8:00 AM - 6:00 PM",
      location: "Adventure Zone & Riverside",
      description:
        "River rafting, camping, trekking, zip-lining and other adventure sports",
      category: "Adventure",
      color: "from-teal-500 to-cyan-500",
      icon: Mountain,
    },
    {
      title: "SARAS Mela",
      date: "16-19 January 2026",
      time: "10:00 AM - 7:00 PM",
      location: "Women's Pavilion",
      description:
        "National scale women empowerment exhibition featuring SHGs and women entrepreneurs",
      category: "Empowerment",
      color: "from-purple-500 to-pink-500",
      icon: Crown,
    },
    {
      title: "Bangey Bazar 2.0",
      date: "14-21 January 2026",
      time: "9:00 AM - 8:00 PM",
      location: "Main Festival Ground",
      description:
        "Enhanced organic marketplace showcasing youth entrepreneurship and local products",
      category: "Commerce",
      color: "from-blue-500 to-cyan-500",
      icon: ShoppingCart,
    },
    {
      title: "Investors Meet & Business Summit",
      date: "18 January 2026",
      time: "2:00 PM - 6:00 PM",
      location: "Business Pavilion",
      description:
        "Networking event for startups, MSMEs, investors and business development",
      category: "Business",
      color: "from-slate-500 to-gray-600",
      icon: Briefcase,
    },
    {
      title: "Food & Cuisine Festival",
      date: "14-21 January 2026",
      time: "11:00 AM - 10:00 PM",
      location: "Food Court & Stalls",
      description:
        "Traditional and modern cuisine from Sikkim and neighboring regions",
      category: "Culinary",
      color: "from-red-500 to-orange-500",
      icon: ChefHat,
    },
    {
      title: "Teen Street",
      date: "15-19 January 2026",
      time: "2:00 PM - 9:00 PM",
      location: "Youth Zone",
      description:
        "Dedicated space for teenagers with gaming, music, dance and interactive activities",
      category: "Youth",
      color: "from-violet-500 to-purple-500",
      icon: User,
    },
    {
      title: "Children's Fun Zone",
      date: "14-21 January 2026",
      time: "10:00 AM - 6:00 PM",
      location: "Kids Area",
      description:
        "Safe play area with rides, games, educational activities and entertainment for children",
      category: "Family",
      color: "from-pink-500 to-rose-500",
      icon: Home,
    },
    {
      title: "Tourism Promotion & Destination Showcase",
      date: "14-21 January 2026",
      time: "10:00 AM - 7:00 PM",
      location: "Tourism Pavilion",
      description:
        "Showcase of Sikkim's tourist destinations, travel packages and hospitality services",
      category: "Tourism",
      color: "from-sky-500 to-blue-500",
      icon: Map,
    },
    {
      title: "Government Services & Public Outreach Pavilion",
      date: "14-21 January 2026",
      time: "10:00 AM - 5:00 PM",
      location: "Government Pavilion",
      description:
        "Information and services from various government departments and public schemes",
      category: "Public Service",
      color: "from-indigo-500 to-blue-500",
      icon: Shield,
    },
    {
      title: "Merchandise",
      date: "14-21 January 2026",
      time: "9:00 AM - 8:00 PM",
      location: "Merchandise Stalls",
      description:
        "Official festival merchandise, local handicrafts and souvenir shopping",
      category: "Shopping",
      color: "from-emerald-500 to-teal-500",
      icon: ShoppingBag,
    },
    {
      title: "Rural Sports & Others",
      date: "17-20 January 2026",
      time: "11:00 AM - 5:00 PM",
      location: "Sports Ground",
      description:
        "Traditional rural sports competitions, folk games and cultural sports activities",
      category: "Traditional Sports",
      color: "from-orange-600 to-red-600",
      icon: Target,
    },
  ];

  const newFeatures2026 = [
    "Enhanced Sandhya Aarti ceremony",
    "Upgraded football stadium facilities",
    "Digital payment integration",
    "Mobile app for festival navigation",
    "Eco-friendly waste management",
    "International cuisine stalls",
  ];

  return (
    <>
      <Head>
        <title>Events & Activities - Maghey Sankranti Mela 2026</title>
        <meta
          name="description"
          content="Explore all events and activities at Maghey Sankranti Mela 2026. From cultural performances to adventure sports, spiritual ceremonies to food festivals. Join us at Jorethang Nayabazar, Sikkim from January 14-21, 2026."
        />
        <meta
          name="keywords"
          content="Maghey Sankranti events, festival activities, cultural performances, adventure sports, food festival, spiritual ceremonies, traditional arts, river rafting, paragliding, Sikkim events 2026"
        />
        <meta
          property="og:title"
          content="Events & Activities - Maghey Sankranti Mela 2026"
        />
        <meta
          property="og:description"
          content="Discover exciting events and activities at Sikkim's grandest cultural festival. Cultural performances, adventure sports, spiritual ceremonies and more."
        />
        <meta property="og:url" content="/events" />
        <meta property="og:image" content="/og-events.jpg" />
        <link rel="canonical" href="/events" />
      </Head>
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
                🎪 15 MAJOR ACTIVITIES & ATTRACTIONS
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Experience all 15 featured events & programs - Eight days of
                spiritual, cultural, and commercial celebrations at Maghey
                Sankranti Mela 2026
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>14-21 January 2026</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>Jorethang, Nayabazar</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                  <Users className="h-4 w-4 text-accent" />
                  <span>200,000+ Expected Visitors</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <UpcomingEvents />

        {/* Events Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                Featured Events & Programs
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${event.color}`}
                    />

                    <div className="p-6">
                      <div className="mb-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r ${event.color} text-white`}
                        >
                          <event.icon className="h-3 w-3" />
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* New Features 2026 */}
        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                🎉 New Features & Enhancements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {newFeatures2026.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-linear-to-r from-primary to-secondary" />
                    <span className="text-foreground font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-8 rounded-2xl bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Join the Celebration!
              </h2>
              <p className="text-muted-foreground mb-6">
                Experience the grandest cultural confluence of Northeast India.
                Eight days of tradition, spirituality, and modern celebration
                await you.
              </p>
              <div className="text-lg font-semibold text-primary">
                📧 Contact: vishalmukhia@gmail.com <br />
                📞 Phone: +91 70012 71507 <br />
                📞 Phone: +91 6296 796 429 <br />
                🌐 Website: www.magheymela.com
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <DesktopDock />
      <MobileNav />
    </>
  );
}
