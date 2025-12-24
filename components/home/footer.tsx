import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Maghey Sankranti Mela</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Celebrating 71 Years of Culture & Community
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/homestays"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Homestays
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-primary-foreground transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                vishalmukhia@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 70012 71507
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 6296 796 429
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Nayabazar, Jorethang
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/MagheySankratiMelaJorethangNayabazar?rdid=awOiDDMrcgpiGrg1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C4v6dkhVo%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/maghey_mela_jorethangnayabazer/?igsh=YnM1MnoxbnZpdXhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@magheymelajorethang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
          <p>© 2025 Maghey Sankranti Mela. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
