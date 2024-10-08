const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client'); // Correctly importing PrismaClient
require('dotenv').config({
  path: '../.env'
});

const prisma = new PrismaClient(); // Initializing the PrismaClient

const schemeIds = [
  "118483", "127042", "125354", "122639", "115132", "135781"
];

async function updateLatestNavs() {
  for (const schemeId of schemeIds) {
    try {
      const fetch = (await import('node-fetch')).default; // Dynamic import for node-fetch
      const response = await fetch(`https://api.mfapi.in/mf/${schemeId}/latest`);
      const data = await response.json();

      if (data.status === "SUCCESS" && data.data.length > 0) {

        const { scheme_name, scheme_code } = data.meta;
        const { nav, date } = data.data[0];

        console.log(`Updating NAV for scheme ${scheme_code} (${scheme_name}) to ${nav} on ${date}`);

        // Delete existing NAVs for the current schemeId
        await prisma.mutualFundNav.deleteMany({
          where: {
            schemeId: schemeId // Filter to delete only for the current schemeId
          }
        });

        // Insert the new NAV
        await prisma.mutualFundNav.create({
          data: {
            id: schemeId, // Make sure id is correctly handled
            schemeId: schemeId,
            schemeName: scheme_name,
            latestNav: parseFloat(nav),
            date: new Date(date)
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching NAV for scheme ${schemeId}:`, error);
    }
  }
}

// Run the function daily at midnight
cron.schedule('* * * * *', () => {
  console.log("Fetching latest NAVs...");
  updateLatestNavs();
})
