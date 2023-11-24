import * as dotenv from "dotenv";
dotenv.config();

import algoliasearch from "algoliasearch";
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_API_KEY
);

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const filenames = fs.readdirSync(path.join("./src/content/champions")).filter(filename => filename.endsWith('.yaml'));
let data = filenames.map((filename) => {
  try {
    const yamlContent = fs.readFileSync(
      "./src/content/champions/" + filename, 'utf8'
    );
    const data = yaml.load(yamlContent);
    const url = filename.replace(/\.yaml$/, "");
    if (!data?.activities || !data?.social.github) return null;
    return {
      url,
      objectID: url,
      ...data,
      image: `${`https://github.com/${data.social.github}.png`}`,
    };
  } catch (e) {
    console.log("Error: ", filename);
    console.log(e.message);
  }
});

data = data.filter((item) => item !== null);

const index = client.initIndex("Champions");

index
  .replaceAllObjects(data)
  .then(({ objectIDs }) => {
    console.log("Algolia: All records have been imported");
  })
  .catch((err) => {
    console.error(err);
  });
