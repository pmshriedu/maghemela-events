"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  TreePine,
  Star,
  Wifi,
  Car,
  Coffee,
  Home,
  Mountain,
} from "lucide-react";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";

const homestays = [
  {
    id: 1,
    name: "Kazi Heritage",
    address: "Chakhung",
    rooms: "3 Cottages",
    contact: "6297066016",
    type: "homestay" as const,
    description:
      "Experience traditional Sikkimese hospitality in our heritage cottages surrounded by pristine nature.",
    amenities: [
      "Traditional Architecture",
      "Garden View",
      "Home-cooked Meals",
      "Cultural Experience",
    ],
  },
  {
    id: 2,
    name: "Bamboo Homestay",
    address: "Chakhung",
    rooms: "2 Rooms",
    contact: "8001747954",
    type: "homestay" as const,
    description:
      "Eco-friendly bamboo construction offering a unique and sustainable stay experience.",
    amenities: [
      "Eco-friendly",
      "Bamboo Architecture",
      "Nature Walks",
      "Organic Garden",
    ],
  },
  {
    id: 3,
    name: "Green Wings Homestay",
    address: "Chakhung",
    rooms: "5 Cottages",
    contact: "9907448830",
    type: "homestay" as const,
    description:
      "Spacious cottages with modern amenities while maintaining the charm of traditional Sikkimese hospitality.",
    amenities: ["Spacious Rooms", "Mountain View", "WiFi", "Parking"],
  },
  {
    id: 4,
    name: "Bhotaygroung Homestay",
    address: "Chakhung",
    rooms: "5 Rooms",
    contact: "8967624390",
    type: "homestay" as const,
    description:
      "Family-run homestay offering authentic local experiences and warm hospitality.",
    amenities: [
      "Family-run",
      "Local Cuisine",
      "Cultural Programs",
      "Trekking Guide",
    ],
  },
  {
    id: 5,
    name: "Pine Valley Homestay",
    address: "Mendogaon, Chakhung",
    rooms: "2 Rooms",
    contact: "9046520776",
    type: "homestay" as const,
    description:
      "Nestled in the pine forests, offering tranquility and breathtaking valley views.",
    amenities: ["Pine Forest", "Valley View", "Peaceful", "Bird Watching"],
  },
  {
    id: 6,
    name: "Rewaz Homestay",
    address: "Chakhung",
    rooms: "8 Rooms",
    contact: "8617640188",
    type: "homestay" as const,
    description:
      "Largest homestay in the area with excellent facilities and traditional Sikkimese architecture.",
    amenities: [
      "Large Property",
      "Multiple Rooms",
      "Traditional Design",
      "Group Friendly",
    ],
  },
  {
    id: 7,
    name: "Rai Homestay",
    address: "Zoom Namrik",
    rooms: "3 Rooms",
    contact: "8170948458",
    type: "homestay" as const,
    description:
      "Peaceful retreat away from the crowds, perfect for a quiet and serene experience.",
    amenities: [
      "Peaceful",
      "Scenic Location",
      "Personal Attention",
      "Local Guide",
    ],
  },
];

const hotels = [
  {
    id: 8,
    name: "Hotel Heritage",
    address: "3rd Lane, Jorethang",
    rooms: "8 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    remarks: "Only Advance Booking",
    description: "Premium hotel with modern amenities and traditional charm.",
    amenities: ["Premium Service", "Modern Amenities", "Restaurant", "WiFi"],
  },
  {
    id: 9,
    name: "Hotel Doklam",
    address: "Sisney, West Sikkim",
    rooms: "6 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    remarks: "Only Advance Booking",
    description:
      "Comfortable accommodation with beautiful views of the surrounding hills.",
    amenities: [
      "Hill View",
      "Comfortable Rooms",
      "Room Service",
      "Travel Desk",
    ],
  },
  {
    id: 10,
    name: "Hotel Puspanjali",
    address: "3rd Lane, Jorethang",
    rooms: "13 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    description:
      "Well-established hotel offering comfortable stays with modern facilities.",
    amenities: ["Established", "Modern Facilities", "Restaurant", "Parking"],
  },
  {
    id: 11,
    name: "Building Lounge",
    address: "Chakhung, West District",
    rooms: "4 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    description:
      "Boutique accommodation with personalized service and modern comfort.",
    amenities: ["Boutique", "Personalized Service", "Modern Comfort", "WiFi"],
  },
  {
    id: 12,
    name: "Captain Hotel",
    address: "Majhi Gaon, Jorethang",
    rooms: "12 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    description:
      "Centrally located hotel with easy access to local attractions and amenities.",
    amenities: [
      "Central Location",
      "Easy Access",
      "Restaurant",
      "Travel Assistance",
    ],
  },
  {
    id: 13,
    name: "Zoom Amenity Centre",
    address: "Sal Dara, Zoom Busty",
    rooms: "4 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    description:
      "Modern amenity center offering comfortable accommodation and facilities.",
    amenities: ["Modern Amenities", "Facilities", "Clean Rooms", "Service"],
  },
  {
    id: 14,
    name: "Hotel Kohinoor",
    address: "Jorethang",
    rooms: "11 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    description:
      "Popular hotel known for its hospitality and convenient location.",
    amenities: ["Popular", "Good Hospitality", "Convenient", "Restaurant"],
  },
  {
    id: 15,
    name: "Hotel Rock Home",
    address: "Masjid Lane, Jorethang",
    rooms: "13 Rooms",
    contact: "Contact for booking",
    type: "hotel" as const,
    remarks: "Only Advance Booking",
    description:
      "Modern hotel with comfortable accommodations and excellent service.",
    amenities: ["Modern", "Comfortable", "Excellent Service", "WiFi"],
  },
];

function AccommodationCard({
  accommodation,
}: {
  accommodation: (typeof homestays)[0] | (typeof hotels)[0];
}) {
  const cardColor =
    accommodation.type === "homestay"
      ? "from-green-500 to-emerald-500"
      : "from-blue-500 to-cyan-500";

  return (
    <Card className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300 p-0 h-full">
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cardColor}`}
      />

      <CardHeader className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {accommodation.name}
          </CardTitle>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${cardColor} text-white`}
          >
            {accommodation.type === "homestay" ? "Homestay" : "Hotel"}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {accommodation.address}
        </div>
        {"remarks" in accommodation && accommodation.remarks && (
          <Badge variant="destructive" className="text-xs mt-2">
            {accommodation.remarks}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-0 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {accommodation.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-foreground">{accommodation.rooms}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Amenities:</h4>
          <div className="flex flex-wrap gap-1">
            {accommodation.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {accommodation.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{accommodation.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomestaysPage() {
  const [activeTab, setActiveTab] = useState("all");

  const allAccommodations = [...homestays, ...hotels];

  const getFilteredData = () => {
    switch (activeTab) {
      case "homestays":
        return homestays;
      case "hotels":
        return hotels;
      default:
        return allAccommodations;
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/20 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-playfair">
                🏠 HOMESTAYS & HOTELS
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover comfortable homestays and premium hotels for your visit
                to the Maghey Sankranti Mela 2026. Experience authentic
                Sikkimese hospitality in the heart of West Sikkim.
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
                  <Home className="h-4 w-4 text-accent" />
                  <span>96+ Accommodations Available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 border border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <Home className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">7</h3>
                    <p className="text-muted-foreground">Homestays Available</p>
                    <p className="text-sm text-muted-foreground">
                      25+ Rooms & Cottages
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 border border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                      <Mountain className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">8</h3>
                    <p className="text-muted-foreground">Hotels Available</p>
                    <p className="text-sm text-muted-foreground">
                      71 Rooms Total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 border border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">96+</h3>
                    <p className="text-muted-foreground">
                      Total Accommodations
                    </p>
                    <p className="text-sm text-muted-foreground">
                      For All Budgets
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                Accommodation Options
              </h2>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="all">All </TabsTrigger>
                  <TabsTrigger value="homestays">
                    Homestays ({homestays.length})
                  </TabsTrigger>
                  <TabsTrigger value="hotels">
                    Hotels ({hotels.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredData().map((accommodation, index) => (
                      <motion.div
                        key={accommodation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * (index % 6) }}
                      >
                        <AccommodationCard accommodation={accommodation} />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Star className="h-6 w-6 text-accent" />
                Important Information for Maghey Sankranti Mela 2026
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4 text-lg">
                    📋 Booking Guidelines:
                  </h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Some hotels require advance booking</li>
                    <li>• Contact directly for best rates</li>
                    <li>• Book early due to high demand during festival</li>
                    <li>• Homestays offer authentic local experience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4 text-lg">
                    ✨ What to Expect:
                  </h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Traditional Sikkimese hospitality</li>
                    <li>• Home-cooked local cuisine</li>
                    <li>• Cultural experiences and local stories</li>
                    <li>• Guidance for festival activities</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center text-lg font-semibold text-primary">
                📧 Contact: contact@magheymela.in <br />
                📞 Phone: +91 70012 71507 <br />
                📞 Phone: +91 6296 796 429
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
