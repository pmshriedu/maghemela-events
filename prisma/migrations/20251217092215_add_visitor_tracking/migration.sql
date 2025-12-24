-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "location" TEXT,
    "purpose" TEXT,
    "source" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "userAgent" TEXT,
    "referrer" TEXT,
    "screenResolution" TEXT,
    "timezone" TEXT,
    "language" TEXT,
    "ipAddress" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
