const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const results = [];

const filePath = path.join(__dirname, "data", "CrimesAgainstPersonsLawsDataset.csv");

// helper to convert text → slug
const toSlug = (text) =>
    text
        ?.toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
        results.push({
            id: results.length + 1,
            title: row.Title,
            category: toSlug(row.LawType),
            categoryName: row.LawType,
            description: row.Description,
            section: `IPC Section ${row.Section}`,
        });
    })
    .on("end", () => {
        const fileContent = `export const lawData = ${JSON.stringify(results, null, 2)};`;

        fs.writeFileSync("lawData.js", fileContent);
        console.log("✅ lawData.js created with correct categories");
    });