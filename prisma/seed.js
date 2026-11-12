import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const databaseUrl = "file:./dev.db";

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

const organizations = [
  {
    id: "ORG001",
    name: "TechNova Solutions Pvt. Ltd.",
    location: "Chandigarh, India",
    registrationNumber: "U72900PB2021PTC054321",
    gstin: "Available",
    website: "https://technova.example.com",
    score: 88,
    status: "Verified",
    risk: "Low Risk",
    riskLevel: "Verified / Low Risk",
    legalRegistration: 23,
    digitalFootprint: 18,
    offerContent: 18,
    contactVerifiability: 14,
    complaintHistory: 15,
    complaints: 1,
    description:
      "Demo organization record used for testing the Internship Verification Platform.",
  },
  {
    id: "ORG002",
    name: "QuickSkill Technologies",
    location: "Delhi, India",
    registrationNumber: "Not Available",
    gstin: "Not Available",
    website: "https://quickskill.example.com",
    score: 62,
    status: "Under Review",
    risk: "Medium Risk",
    riskLevel: "Medium Risk",
    legalRegistration: 14,
    digitalFootprint: 14,
    offerContent: 13,
    contactVerifiability: 11,
    complaintHistory: 10,
    complaints: 4,
    description:
      "Demo organization record used for testing the Internship Verification Platform.",
  },
  {
    id: "ORG003",
    name: "Digital Work Hub",
    location: "Mumbai, India",
    registrationNumber: "Not Available",
    gstin: "Not Available",
    website: "https://digitalworkhub.example.com",
    score: 35,
    status: "Warning",
    risk: "High Risk",
    riskLevel: "High Risk",
    legalRegistration: 8,
    digitalFootprint: 8,
    offerContent: 7,
    contactVerifiability: 6,
    complaintHistory: 6,
    complaints: 12,
    description:
      "Demo organization record used for testing the Internship Verification Platform.",
  },
];

async function main() {
  console.log("Checking Organization table...");

  const countBefore = await prisma.organization.count();

  console.log("Existing organizations:", countBefore);

  for (const organization of organizations) {
    await prisma.organization.upsert({
      where: {
        id: organization.id,
      },
      update: organization,
      create: organization,
    });

    console.log(`Saved: ${organization.id}`);
  }

  const countAfter = await prisma.organization.count();

  console.log("Total organizations:", countAfter);
  console.log("Organizations inserted successfully.");
}

main()
  .catch((error) => {
    console.error("SEED ERROR:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });