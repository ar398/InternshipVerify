const organizations = [
  {
    id: "ORG001",
    name: "TechNova Solutions Pvt. Ltd.",
    registrationNumber: "U72900PB2021PTC054321",
    gstin: "03AABCT1234F1Z5",
    website: "https://technova.example.com",
    location: "Chandigarh, India",

    score: 88,
    riskLevel: "Verified / Low Risk",

    legalRegistration: 23,
    digitalFootprint: 18,
    offerContent: 18,
    contactVerifiability: 14,
    complaintHistory: 15,

    complaints: 1,

    description:
      "Technology company providing software development and internship opportunities for students.",

    verified: true,
  },

  {
    id: "ORG002",
    name: "QuickSkill Technologies",
    registrationNumber: "Not Available",
    gstin: "Not Available",
    website: "https://quickskill.example.com",
    location: "Delhi, India",

    score: 62,
    riskLevel: "Medium Risk",

    legalRegistration: 15,
    digitalFootprint: 13,
    offerContent: 14,
    contactVerifiability: 10,
    complaintHistory: 10,

    complaints: 4,

    description:
      "Organization offering short-term technology internships and online training programs.",

    verified: false,
  },

  {
    id: "ORG003",
    name: "Digital Work Hub",
    registrationNumber: "Not Available",
    gstin: "Not Available",
    website: "https://digitalwork.example.com",
    location: "Mumbai, India",

    score: 35,
    riskLevel: "High Risk",

    legalRegistration: 8,
    digitalFootprint: 7,
    offerContent: 8,
    contactVerifiability: 6,
    complaintHistory: 6,

    complaints: 12,

    description:
      "Online organization advertising work-from-home internships and data-entry opportunities.",

    verified: false,
  },
];

export default organizations;