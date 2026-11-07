import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const email = args[0] || process.env.ADMIN_INITIAL_EMAIL || "admin@ahiencoffee.vn";
  const password = args[1] || process.env.ADMIN_INITIAL_PASSWORD || "AHienCoffee@1986";
  const name = args[2] || "Admin A Hiền";

  console.log("--------------------------------------------------");
  console.log(" A HIỀN COFFEE — ADMIN BOOTSTRAP INITIALIZER");
  console.log("--------------------------------------------------");
  console.log(`Email: ${email}`);
  console.log(`Name:  ${name}`);

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminAccount.upsert({
    where: { email: email.toLowerCase() },
    update: {
      passwordHash,
      name,
      isActive: true,
    },
    create: {
      email: email.toLowerCase(),
      name,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log(`[SUCCESS] Admin account established! ID: ${admin.id}`);
  console.log("--------------------------------------------------");
}

main()
  .catch((e) => {
    console.error("[ERROR] Failed to bootstrap admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

