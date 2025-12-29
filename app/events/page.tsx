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
import Image from "next/image";

export default function EventsPage() {
  const events = [
    {
      title: "Sandhya Aarati",
      date: "14-21 January 2026",
      time: "5pm-6pm",
      location: "River Confluence",
      description:
        "Sacred evening prayers at the confluence of Rangeet and Rangam rivers with traditional rituals",
      category: "Spiritual",
      color: "from-orange-500 to-red-500",
      icon: Heart,
      image: "/assets/gallery/eve/Sandhya Aarati.jpeg",
    },
    {
      title: "Traditional Culture & Heritage Mela",
      date: "14-21 January 2026",
      time: "24/7",
      location: "Heritage Pavilion",
      description:
        "Showcase of traditional arts, crafts, music, dance and cultural performances",
      category: "Cultural",
      color: "from-amber-500 to-yellow-500",
      icon: Palette,
      image: "/assets/gallery/eve/Traditional Culture & Heritage Mela.jpeg",
    },
    {
      title: "Golden Music & Dance Competition",
      date: "14-21 January 2026",
      time: "10:00 AM - 8:00 PM",
      location: "Main Stage",
      description:
        "Competitive showcase of music and dance performances featuring local and regional talent",
      category: "Cultural",
      color: "from-yellow-500 to-orange-500",
      icon: Palette,
      image: "/assets/gallery/eve/Golden Music & Dance Competition.jpeg",
    },
    {
      title: "11th All India Chief Minister's Gold Cup Football Tournament",
      date: "5-21 January 2026",
      time: "11am-5pm",
      location: "Renovated Football Stadium",
      description:
        "AIFF-guided football tournament featuring local and regional teams",
      category: "Sports",
      color: "from-green-500 to-emerald-500",
      icon: Trophy,
      image:
        "/assets/gallery/eve/11th All India Chief Minister's Gold Cup Football Tournament.jpeg",
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
      image: "/assets/gallery/eve/Agriculture & Floriculture Exhibition.jpeg",
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
      image: "/assets/gallery/eve/Adventure & River Tourism Activities.jpeg",
    },
    {
      title: "SARAS Mela",
      date: "14-21 January 2026",
      time: "24/7",
      location: "Women's Pavilion",
      description:
        "National scale women empowerment exhibition featuring SHGs and women entrepreneurs",
      category: "Empowerment",
      color: "from-purple-500 to-pink-500",
      icon: Crown,
      image: "/assets/gallery/eve/Saras Mela.jpeg",
    },
    {
      title: "Bangey Bazar 2.0",
      date: "14-21 January 2026",
      time: "24/7",
      location: "Main Festival Ground",
      description:
        "Enhanced organic marketplace showcasing youth entrepreneurship and local products",
      category: "Commerce",
      color: "from-blue-500 to-cyan-500",
      icon: ShoppingCart,
      image: "/assets/gallery/eve/Bangey Bazar 2.0.jpeg",
    },
    {
      title: "Investors Meet & Business Summit",
      date: "14-21 January 2026",
      time: "10am-10pm",
      location: "Business Pavilion",
      description:
        "Networking event for startups, MSMEs, investors and business development",
      category: "Business",
      color: "from-slate-500 to-gray-600",
      icon: Briefcase,
      image: "/assets/gallery/eve/Investors Meet & Business Summit.jpeg",
    },
    {
      title: "Food & Cuisine Festival",
      date: "14-21 January 2026",
      time: "24/7",
      location: "Food Court & Stalls",
      description:
        "Traditional and modern cuisine from Sikkim and neighboring regions",
      category: "Culinary",
      color: "from-red-500 to-orange-500",
      icon: ChefHat,
      image: "/assets/gallery/eve/Food & Cuisine Festival.jpeg",
    },
    {
      title: "Teen's Street",
      date: "14-21 January 2026",
      time: "10am - 12pm",
      location: "Youth Zone",
      description:
        "Dedicated space for teenagers with gaming, music, dance and interactive activities",
      category: "Youth",
      color: "from-violet-500 to-purple-500",
      icon: User,
      image: "/assets/gallery/eve/Teen's Street.jpeg",
    },
    {
      title: "Children's Fun Zone",
      date: "14-21 January 2026",
      time: "10am-10pm",
      location: "Kids Area",
      description:
        "Safe play area with rides, games, educational activities and entertainment for children",
      category: "Family",
      color: "from-pink-500 to-rose-500",
      icon: Home,
      image: "/assets/gallery/eve/Children's Fun Zone.jpeg",
    },
    {
      title: "Tourism Promotion & Destination Showcase",
      date: "14-21 January 2026",
      time: "24/7",
      location: "Tourism Pavilion",
      description:
        "Showcase of Sikkim's tourist destinations, travel packages and hospitality services",
      category: "Tourism",
      color: "from-sky-500 to-blue-500",
      icon: Map,
      image:
        "/assets/gallery/eve/Tourism Promotion & Destination Showcase.jpeg",
    },
    {
      title: "Government Services & Public Outreach Pavilion",
      date: "14-21 January 2026",
      time: "10am-10pm",
      location: "Government Pavilion",
      description:
        "Information and services from various government departments and public schemes",
      category: "Public Service",
      color: "from-indigo-500 to-blue-500",
      icon: Shield,
      image:
        "/assets/gallery/eve/Government Services & Public Outreach Pavilion.jpeg",
    },
    {
      title: "Merchandise",
      date: "14-21 January 2026",
      time: "24/7",
      location: "Merchandise Stalls",
      description:
        "Official festival merchandise, local handicrafts and souvenir shopping",
      category: "Shopping",
      color: "from-emerald-500 to-teal-500",
      icon: ShoppingBag,
      image: "/assets/gallery/eve/Merchandise.jpeg",
    },
    {
      title: "Rural Sports & Others",
      date: "5-21 January 2026",
      time: "8am - 5pm",
      location: "Sports Ground",
      description:
        "Traditional rural sports competitions, folk games and cultural sports activities",
      category: "Traditional Sports",
      color: "from-orange-600 to-red-600",
      icon: Target,
      image: "/assets/gallery/eve/Rural Sports & Others.jpeg",
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
                🎪 16 MAJOR ACTIVITIES & ATTRACTIONS
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Experience all 16 featured events & programs - Eight days of
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

        {/* Zone Map Banner */}
        <section className="py-16 px-4 bg-muted/5">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
                PROPOSED ZONE MAPPING
              </h2>
              <h3 className="text-xl md:text-2xl font-medium text-muted-foreground">
                JORETHANG – NAYABAZAR
                <br />
                MAGHEY MELA 2026
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden mb-12"
            >
              <div className="relative">
                <img
                  src="/assets/zone-map/ZONEMAPPINGIMAGE.jpg"
                  alt="Zone Mapping for Maghey Mela 2026"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Major Location Labels - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-card rounded-xl border border-border p-6 mb-8"
            >
              <h5 className="text-lg font-semibold text-foreground mb-4">
                MAJOR LOCATION LABELS (as seen on map)
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <span className="text-muted-foreground">• Akar Bridge</span>
                <span className="text-muted-foreground">• Jorethang</span>
                <span className="text-muted-foreground">• Green Park</span>
                <span className="text-muted-foreground">• River Rangeet</span>
                <span className="text-muted-foreground">• Sikkim</span>
                <span className="text-muted-foreground">• West Bengal</span>
                <span className="text-muted-foreground">• General Parking</span>
                <span className="text-muted-foreground">• Parking Akaray</span>
              </div>
            </motion.div>

            {/* Legend - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-card rounded-xl border border-border p-6 mb-8"
            >
              <h5 className="text-lg font-semibold text-foreground mb-4">
                LEGEND
              </h5>
              <h6 className="text-md font-medium text-primary mb-3">
                PROPOSED EVENTS & VENUES
              </h6>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">SL. NO</th>
                      <th className="text-left py-2 font-medium">
                        PROPOSED EVENTS
                      </th>
                      <th className="text-left py-2 font-medium">VENUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2">1</td>
                      <td className="py-2">
                        Sports / Cultural / Official Events
                      </td>
                      <td className="py-2">Football Ground</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">2</td>
                      <td className="py-2">Parking (General & VIP)</td>
                      <td className="py-2">Khola Bagar / School Ground</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">3</td>
                      <td className="py-2">
                        Entertainment Zone (Mega Mela, Tambola, Circus, Mini
                        Goal etc.)
                      </td>
                      <td className="py-2">Nayabazar Bagar, Soreng Stand</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">4</td>
                      <td className="py-2">Expo Events / Exhibition</td>
                      <td className="py-2">
                        Van Stand, Truck Stand, Middle Lane
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">5</td>
                      <td className="py-2">Traditional Stalls</td>
                      <td className="py-2">Old Truck Stand</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">6</td>
                      <td className="py-2">Saras Mela</td>
                      <td className="py-2">S.N.T Complex</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">7</td>
                      <td className="py-2">Bangay Bazaar</td>
                      <td className="py-2">Volley Ball Ground</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">8</td>
                      <td className="py-2">Teen Street / Art Exhibition</td>
                      <td className="py-2">Middle Lane</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">9</td>
                      <td className="py-2">J.B / Hawkers / Manihaari Shops</td>
                      <td className="py-2">
                        Circular Road, 1st Lane, 3rd Lane
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">10</td>
                      <td className="py-2">
                        IPR Exhibition / Departmental Stalls
                      </td>
                      <td className="py-2">Green Park</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">11</td>
                      <td className="py-2">
                        Organic Market (Oranges & Local Kiwis)
                      </td>
                      <td className="py-2">
                        Near Forest Check Post, Nayabazar
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">12</td>
                      <td className="py-2">Local Hotels / Fast Food</td>
                      <td className="py-2">
                        Soreng Stand, Gangtok Stand & Selective Areas
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">13</td>
                      <td className="py-2">
                        Welcome Gates, Information Kiosks, Help Desks
                      </td>
                      <td className="py-2">
                        Nayabazar, Namgyal Hotel, RDD Office
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Color-Coded Zones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-8 bg-card rounded-xl border border-border p-6"
            >
              <h5 className="text-lg font-semibold text-foreground mb-4">
                COLOR-CODED ZONES (as per numbering on map)
              </h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-orange-500"></div>
                  <span>1 (Orange) – Main Event / Cultural Zone</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-blue-500"></div>
                  <span>2 (Blue) – General & VIP Parking Areas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-purple-500"></div>
                  <span>3 (Purple) – Entertainment / Mela Zone</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-300"></div>
                  <span>4 (Light Green) – Exhibition & Expo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  <span>5 (Yellow) – Traditional Sales</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-cyan-500"></div>
                  <span>6 (Cyan) – Saras Mela</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-yellow-600"></div>
                  <span>7 (Dark Yellow) – Bangay Bazaar</span>
                </div>
                <div className="col-span-full text-center mt-4 text-muted-foreground">
                  8–13 – Supporting activities, stalls, access, help & info
                  zones
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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

                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-contain"
                      />
                    </div>

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
                📧 Contact: contact@magheymela.in <br />
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
