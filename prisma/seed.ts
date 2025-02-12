import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const jobCategories = [
    {
      category: "Software & IT",
      subcategories: [
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile App Developer",
        "UI/UX Designer",
        "Data Scientist",
        "Cybersecurity Analyst",
        "DevOps Engineer",
        "Cloud Engineer",
        "AI/ML Engineer",
        "Blockchain Developer",
      ],
    },
    {
      category: "Marketing & Sales",
      subcategories: [
        "Digital Marketing Specialist",
        "SEO Specialist",
        "Social Media Manager",
        "Content Writer",
        "Sales Representative",
        "Business Development Manager",
        "Affiliate Marketing Manager",
        "PPC Specialist",
      ],
    },
    {
      category: "Finance & Accounting",
      subcategories: [
        "Financial Analyst",
        "Accountant",
        "Auditor",
        "Investment Banker",
        "Tax Consultant",
        "Payroll Specialist",
        "Risk Manager",
        "Bookkeeper",
      ],
    },
    {
      category: "Healthcare & Medical",
      subcategories: [
        "Doctor",
        "Nurse",
        "Pharmacist",
        "Medical Lab Technician",
        "Dentist",
        "Physiotherapist",
        "Psychologist",
        "Veterinarian",
      ],
    },
    {
      category: "Education & Training",
      subcategories: [
        "Teacher",
        "Professor",
        "Corporate Trainer",
        "Instructional Designer",
        "E-learning Developer",
        "Librarian",
      ],
    },
    {
      category: "Engineering",
      subcategories: [
        "Mechanical Engineer",
        "Civil Engineer",
        "Electrical Engineer",
        "Chemical Engineer",
        "Biomedical Engineer",
        "Robotics Engineer",
      ],
    },
    {
      category: "Design & Creative",
      subcategories: [
        "Graphic Designer",
        "Product Designer",
        "Interior Designer",
        "Fashion Designer",
        "Video Editor",
        "Animator",
      ],
    },
    {
      category: "Customer Support",
      subcategories: [
        "Customer Service Representative",
        "Technical Support",
        "Help Desk Analyst",
        "Call Center Agent",
        "Client Relations Manager",
      ],
    },
    {
      category: "Legal & Compliance",
      subcategories: [
        "Lawyer",
        "Paralegal",
        "Legal Advisor",
        "Compliance Officer",
        "Contract Manager",
      ],
    },
    {
      category: "Manufacturing & Logistics",
      subcategories: [
        "Warehouse Manager",
        "Logistics Coordinator",
        "Supply Chain Analyst",
        "Production Supervisor",
        "Quality Control Inspector",
      ],
    },
    {
      category: "Human Resources",
      subcategories: [
        "HR Manager",
        "Recruiter",
        "Payroll Specialist",
        "Talent Acquisition Specialist",
        "Employee Relations Manager",
      ],
    },
    {
      category: "Writing & Translation",
      subcategories: [
        "Content Writer",
        "Copywriter",
        "Technical Writer",
        "Editor",
        "Translator",
      ],
    },
  ];

  // insert data into database
  for (const category of jobCategories) {
    const createdCategory = await prisma.jobCategory.upsert({
      where: {
        name: category.category,
      },
      update: {},
      create: { name: category.category },
    });

    for (const subcategory of category.subcategories) {
      await prisma.subCategory.upsert({
        where: { name: subcategory },
        update: {},
        create: { name: subcategory, jobCategoryId: createdCategory.id },
      });
    }
  }

  console.log("✅ Default categories and subcategories initialized!");

  // add admin user
  const adminEmail = "info.jobverse@gmail.com";
  const adminUser = await prisma.user.upsert({
    where: {
      email: adminEmail,
    },
    update: {},
    create: {
      email: adminEmail,
      name: "JV Admin",
      emailVerified: new Date(),
      image: null,
      password: "$2a$10$AhFIeOAf7iQM/8.QtaI0PuQ2uRb/BtWNKvFadJM7OrPNvhREEAyym",
      userType: "ADMIN",
    },
  });

  await prisma.admin.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      user: {
        connect: {
          id: adminUser.id,
        },
      },
    },
  });
  console.log("✅ Created admin with default email and password");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
