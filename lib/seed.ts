import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import { paintersImages, galleryImages, paintingsImages } from "./data";

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

    // Seed Agents
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

    // Seed Galleries
    const galleries = [];
    for (const image of galleryImages) {
      const gallery = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.GALLERY!,
        ID.unique(),
        { image }
      );
      galleries.push(gallery);
    }

    console.log(`Seeded ${galleries.length} galleries.`);

    // Seed Properties
    for (let i = 1; i <= 20; i++) {
      const assignedPainter = painters[Math.floor(Math.random() * painters.length)];

      const assignedGalleries = getRandomSubset(galleries, 3, 8); // 3 to 8 galleries

      const image =
        paintingsImages.length - 1 >= i
          ? paintingsImages[i]
          : paintingsImages[Math.floor(Math.random() * paintingsImages.length)];

      const painting = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PAINTING!,
        ID.unique(),
        {
          name: `Painting ${i}`,
          type: paintingsTypes[
            Math.floor(Math.random() * paintingsTypes.length)
          ],
          description: `This is the description for Painting ${i}.`,
          price: Math.floor(Math.random() * 9000) + 1000,
          rating: Math.floor(Math.random() * 5) + 1,
          image: image,
          painter: assignedPainter.$id,
          gallery: assignedGalleries.map((gallery) => gallery.$id),
        }
      );

      console.log(`Seeded property: ${painting.name}`);
    }

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;
