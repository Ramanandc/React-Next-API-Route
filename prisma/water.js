const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const scrapeLakeLevels = async () => {
  const url = "https://cmwssb.tn.gov.in/lake-level";

  try {
    // Fetch the HTML from the website
    const { data: html } = await axios.get(url);

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Define an array to hold the scraped data
    const lakeData = [];

    // Analyze the table structure on the website and scrape data
    $("table tr").each((index, row) => {
      if (index === 0) return; // Skip the header row

      const columns = $(row).find("td");

      // Extract the required data fields
      const date = $(columns[0]).text().trim();
      const reservoirName = $(columns[1]).text().trim();
      const level = $(columns[2]).text().trim();
      const capacity = $(columns[3]).text().trim();
      const inflow = $(columns[4]).text().trim();
      const outflow = $(columns[5]).text().trim();

      // Push the data to the array
      lakeData.push({ date, reservoirName, level, capacity, inflow, outflow });
    });

    // Save the data to a JSON file
    fs.writeFileSync("lake_data.json", JSON.stringify(lakeData, null, 2));

    console.log("Data scraped and saved to lake_data.json");
  } catch (error) {
    console.error("Error scraping the lake levels:", error);
  }
};

scrapeLakeLevels();