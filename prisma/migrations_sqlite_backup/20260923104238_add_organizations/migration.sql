-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "risk" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "legalRegistration" INTEGER NOT NULL,
    "digitalFootprint" INTEGER NOT NULL,
    "offerContent" INTEGER NOT NULL,
    "contactVerifiability" INTEGER NOT NULL,
    "complaintHistory" INTEGER NOT NULL,
    "complaints" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
