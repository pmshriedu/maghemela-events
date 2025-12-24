"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { DesktopDock } from "@/components/navigation/desktop-dock";
import { MobileNav } from "@/components/navigation/mobile-nav";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Users,
      title: "Organising Committee",
      details: ["Jorethang Maghey Sankranti Mela Committee (MSMC) 2026"],
      color: "text-primary",
    },
    {
      icon: MapPin,
      title: "Festival Venue",
      details: [
        "Main Venue: Jorethang, Nayabazar",
        "South Sikkim District, Sikkim - India",
        "Sacred Confluence: River Rangeet & Rangam",
      ],
      color: "text-secondary",
    },
    {
      icon: Calendar,
      title: "Festival Dates",
      details: [
        "14th January – 21st January 2026",
        "8 Days of Celebration",
        "Daily Events: 6:00 AM - 10:00 PM",
      ],
      color: "text-accent",
    },
    {
      icon: Mail,
      title: "Email Contact",
      details: [
        "General Inquiries: vishalmukhia@gmail.com",
        "Media Inquiries: vishalmukhia@gmail.com",
        "Sponsorship: vishalmukhia@gmail.com",
      ],
      color: "text-primary",
    },
    {
      icon: Phone,
      title: "Phone Contact",
      details: [
        "Festival Helpline: +91 70012 71507",
        "Emergency Contact: +91 6296 796 429",
        "Accommodation: +91 70012 71507",
      ],
      color: "text-secondary",
    },
    {
      icon: Globe,
      title: "Online Presence",
      details: ["Website: www.magheymela.com"],
      socialLinks: [
        {
          icon: Facebook,
          url: "https://www.facebook.com/MagheySankratiMelaJorethangNayabazar?rdid=awOiDDMrcgpiGrg1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C4v6dkhVo%2F",
          label: "Facebook",
        },
        {
          icon: Instagram,
          url: "https://www.instagram.com/maghey_mela_jorethangnayabazer/?igsh=YnM1MnoxbnZpdXhi",
          label: "Instagram",
        },
        {
          icon: Youtube,
          url: "https://www.youtube.com/@magheymelajorethang",
          label: "YouTube",
        },
      ],
      color: "text-accent",
    },
  ];

  const accommodationTypes = [
    { type: "Hotels", description: "Comfortable stays with modern amenities" },
    {
      type: "Homestays",
      description: "Experience local culture with families",
    },
    { type: "Bed & Breakfast", description: "Cozy accommodations with meals" },
    {
      type: "Service Apartments",
      description: "Fully furnished temporary housing",
    },
    { type: "Holiday Homes", description: "Private vacation rentals" },
    { type: "Riverside Camps", description: "Adventure camping by the river" },
  ];

  const leadership = [
    {
      title: "Patron",
      name: "Hon'ble Chief Minister of Sikkim",
      designation: "Shri Prem Singh Tamang (Golay)",
      department: "Government of Sikkim",
    },
  ];

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
                📞 Contact & Information
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get in touch with us for inquiries, partnerships, or assistance
                with your festival experience
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <info.icon className={`h-6 w-6 ${info.color}`} />
                    <h3 className="text-xl font-semibold text-foreground">
                      {info.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className="text-muted-foreground text-sm leading-relaxed"
                      >
                        {detail}
                      </p>
                    ))}

                    {/* Social Media Icons */}
                    {info.socialLinks && (
                      <div className="flex gap-3 mt-4 pt-3 border-t border-border/50">
                        {info.socialLinks.map((social, socialIndex) => (
                          <a
                            key={socialIndex}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                            title={social.label}
                          >
                            <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                🏛️ Patronage & Leadership
              </h2>

              {leadership.map((leader, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-card border border-border"
                >
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {leader.title}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-1">
                    {leader.designation}
                  </p>
                  <p className="text-accent font-medium">{leader.department}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Accommodation Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                🏨 Accommodation & Staycation
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodationTypes.map((accommodation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {accommodation.type}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {accommodation.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  For accommodation bookings and availability, please contact
                  our helpline
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-card rounded-full border">
                    📞 Accommodation Helpline: +91 70012 71507
                  </span>
                  <span className="px-4 py-2 bg-card rounded-full border">
                    📧 vishalmukhia@gmail.com
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Form */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-foreground">
                Quick Contact
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    General Inquiries
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Festival schedules and events</p>
                    <p>• Vendor registration</p>
                    <p>• Volunteer opportunities</p>
                    <p>• Transportation information</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    Media & Partnerships
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Press accreditation</p>
                    <p>• Sponsorship opportunities</p>
                    <p>• Cultural exchange programs</p>
                    <p>• International collaborations</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-lg font-semibold text-primary mb-2">
                  Jorethang Maghey Sankranti Mela 2026
                </p>
                <p className="text-muted-foreground">
                  "Like the confluence of the Rangeet and Rangam rivers, Maghey
                  Mela unites spirituality, culture, commerce, and people into
                  one vibrant stream."
                </p>
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
