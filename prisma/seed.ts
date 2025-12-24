import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Initialize Prisma client with adapter for v7
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting to seed database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@culturalevent.com" },
    update: {},
    create: {
      id: "admin-user",
      email: "admin@culturalevent.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("👤 Created admin user:", admin.email);

  // Create sample blogs
  const blog1 = await prisma.blog.upsert({
    where: { slug: "welcome-to-our-cultural-center" },
    update: {},
    create: {
      id: "blog-1",
      title: "Welcome to Our Cultural Center",
      slug: "welcome-to-our-cultural-center",
      content:
        "Welcome to our cultural center! We are excited to share our rich heritage and upcoming events with you. Stay tuned for amazing cultural experiences.",
      coverImage: "/images/sample-blog-1.jpg",
      updatedAt: new Date(),
    },
  });

  const blog2 = await prisma.blog.upsert({
    where: { slug: "traditional-arts-workshop" },
    update: {},
    create: {
      id: "blog-2",
      title: "Traditional Arts Workshop",
      slug: "traditional-arts-workshop",
      content:
        "Join us for an immersive traditional arts workshop where you can learn ancient techniques and create beautiful crafts. This hands-on experience is perfect for all skill levels.",
      coverImage: "/images/sample-blog-2.jpg",
      updatedAt: new Date(),
    },
  });

  console.log("📝 Created sample blogs:", blog1.title, "and", blog2.title);

  // Create sample news
  const news1 = await prisma.news.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      title: "Maghey Sankranti Mela 2025",
      content:
        "We are thrilled to announce Maghey Sankranti Mela 2025! This year's festival will feature traditional music, dance performances, art exhibitions, and delicious cultural cuisine. Mark your calendars for an unforgettable celebration of our heritage.",
      eventDate: new Date("2025-06-15"),
      updatedAt: new Date(),
    },
  });

  const news2 = await prisma.news.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      title: "New Art Gallery Opening",
      content:
        "Our new contemporary art gallery is now open to the public! Featuring works from local and international artists, this space showcases the evolution of cultural expression through modern art. Visit us during gallery hours to explore these incredible pieces.",
      eventDate: new Date("2025-03-01"),
      updatedAt: new Date(),
    },
  });

  console.log("📰 Created sample news:", news1.title, "and", news2.title);

  console.log("✅ Database has been successfully seeded!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
