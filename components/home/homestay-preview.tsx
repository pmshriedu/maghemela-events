"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, TreePine, Mountain } from "lucide-react";
import Link from "next/link";

interface HomestayCardProps {
  id: number;
  name: string;
  address: string;
  rooms: string;
  contact: string;
  type: "homestay" | "hotel";
  remarks?: string;
}

export function HomestayCard({
  id,
  name,
  address,
  rooms,
  contact,
  type,
  remarks,
}: HomestayCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 p-0">
      <CardHeader className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={type === "homestay" ? "default" : "secondary"}>
            {type === "homestay" ? "Homestay" : "Hotel"}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {address}
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{rooms} Available</span>
          </div>
        </div>

        {remarks && (
          <Badge variant="outline" className="text-xs">
            {remarks}
          </Badge>
        )}

        <Button asChild className="w-full">
          <Link href="/homestays">View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function HomestayPreview() {
  const featuredHomestays = [
    {
      id: 1,
      name: "Kazi Heritage",
      address: "Chakhung",
      rooms: "3 Cottages",
      contact: "6297066016",
      type: "homestay" as const,
    },
    {
      id: 2,
      name: "Green Wings Homestay",
      address: "Chakhung",
      rooms: "5 Cottages",
      contact: "9907448830",
      type: "homestay" as const,
    },
    {
      id: 3,
      name: "Hotel Heritage",
      address: "3rd Lane, Jorethang",
      rooms: "8 Rooms",
      contact: "8617640188",
      type: "hotel" as const,
    },
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TreePine className="h-8 w-8 text-amber-700" />
            <h2 className="text-3xl font-bold">Comfortable Stays</h2>
            <Mountain className="h-8 w-8 text-amber-800" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the warmth of Sikkim hospitality at our carefully
            selected homestays and hotels. Perfect for your Maghey Mela 2026
            visit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredHomestays.map((stay) => (
            <HomestayCard key={stay.id} {...stay} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800">
            <Link href="/homestays">View All Accommodations</Link>
          </Button>
        </div>

        {/* Accommodation Gallery */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-amber-900">
            Accommodation Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-amber-100">
              <img
                src="/assets/accomodation/rooms.jpg"
                alt="Comfortable Rooms"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-amber-100">
              <img
                src="/assets/accomodation/rooms 1.jpg"
                alt="Luxury Accommodation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-amber-100">
              <img
                src="/assets/accomodation/Pine-Valley-View-Homestay-20-1200x539.webp"
                alt="Pine Valley View Homestay"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-amber-100">
              <img
                src="/assets/accomodation/ddsa.jpeg"
                alt="Traditional Homestay"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-amber-100">
              <img
                src="/assets/accomodation/WhatsApp Image 2025-12-21 at 12.58.16 PM.jpeg"
                alt="Cozy Accommodation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-amber-100">
              <img
                src="/assets/accomodation/WhatsApp Image 2025-12-21 at 12.58.43 PM.jpeg"
                alt="Modern Hotel Room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
