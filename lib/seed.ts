import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import { paintersImages, paintingsImages } from "./data";
import { Query } from "react-native-appwrite"; 

const COLLECTIONS = {
  PAINTER: config.paintersCollectionId,
  GALLERY: config.galleriesCollectionId,
  PAINTING: config.paintingsCollectionId,
};

const paintingsTypes = [
  "Abstract",
  "Geometric",
  "Minimalist",
  "Surrealist",
  "Hyperrealism",
  "Impressionist",
  "Cubist",
  "Others",
];


function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number
): T[] {
  if (minItems > maxItems) {
    throw new Error("minItems cannot be greater than maxItems");
  }
  if (minItems < 0 || maxItems > array.length) {
    throw new Error(
      "minItems or maxItems are out of valid range for the array"
    );
  }

  // Generate a random size for the subset within the range [minItems, maxItems]
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

  // Create a copy of the array to avoid modifying the original
  const arrayCopy = [...array];

  // Shuffle the array copy using Fisher-Yates algorithm
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  // Return the first `subsetSize` elements of the shuffled array
  return arrayCopy.slice(0, subsetSize);
}

async function seed() {
  try {
    // Clear existing data from all collections
    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
      const documents = await databases.listDocuments(
        config.databaseId!,
        collectionId!
      );
      for (const doc of documents.documents) {
        await databases.deleteDocument(
          config.databaseId!,
          collectionId!,
          doc.$id
        );
      }
    }

    console.log("Cleared all existing data.");

    // Seed Painters
    const painters = [];
    for (let i = 1; i <= 5; i++) {
      const agent = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PAINTER!,
        ID.unique(),
        {
          name: `Painter ${i}`,
          email: `painter${i}@example.com`,
          avatar:
            paintersImages[Math.floor(Math.random() * paintersImages.length)],
        }
      );
      painters.push(agent);
    }
    console.log(`Seeded ${painters.length} painters.`);

    // Track used images, names, and prices to ensure uniqueness
    const usedImages = new Set<string>();
    const usedNames = new Set<string>();
    const usedPrices = new Set<number>();

    // Seed Paintings
    for (let i = 1; i <= 20; i++) {
      let image: string;
      let name: string;
      let price: number;

      // Generate unique image, name, and price
      do {
        image =
          paintingsImages.length - 1 >= i
            ? paintingsImages[i]
            : paintingsImages[Math.floor(Math.random() * paintingsImages.length)];
      } while (usedImages.has(image));

      do {
        name = `Painting ${i}`;
      } while (usedNames.has(name));

      do {
        price = Math.floor(Math.random() * 300) + 100;
      } while (usedPrices.has(price));

      // Mark the image, name, and price as used
      usedImages.add(image);
      usedNames.add(name);
      usedPrices.add(price);

      const assignedPainter =
        painters[Math.floor(Math.random() * painters.length)];

      const painting = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PAINTING!,
        ID.unique(),
        {
          name: name,
          type: paintingsTypes[
            Math.floor(Math.random() * paintingsTypes.length)
          ],
          description: `This is the description for ${name}.`,
          price: price,
          rating: Math.floor(Math.random() * 5) + 1,
          image: image,
          painter: assignedPainter.$id,
        }
      );

      console.log(`Seeded painting: ${painting.name}`);
    }

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;
