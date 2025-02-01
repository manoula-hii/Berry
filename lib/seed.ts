import { ID, Models } from "react-native-appwrite";
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

const paintingNames = [
  "The Naturals",
  "Moon Lake",
  "Love",
  "Memory",
  "Happiness",
  "The Kiss",
  "Heartless",
  "The Last Hug",
  "Subbnautica",
  "The Night Supper",
  "WinterWood",
  "The Garden of Candy",
  "Hunt The Flamme",
  "Festina",
  "Wicked Deep",
  "Night Circus",
  "Powerless",
  "Divine Rivals",
  "Free The Stars",
  "The Balade",
  "Thinking",
  "The Little Boy",
  "The Painter",
  "The Persistence of Happiness",
  "Horizon",
];

const painterNames = [
  "Lynn Garber",
  "Kerry Barnes",
  "Lily Roberts",
  "Martin Black",
  "Veronika Gounelle",
  "Carol Brown",
  "Kai Meyer",
  "Laurent Ross",
  "Ivan Doyle",
  "Scott Eden",
  "Amelie Nesbo",
];

function getRandomPainterName(): string {
  return painterNames[Math.floor(Math.random() * painterNames.length)];
}

function getRandomPaintingName(): string {
  return paintingNames[Math.floor(Math.random() * paintingNames.length)];
}

interface Props {
  item: Models.Document & { painter: string }; 
  onPress?: () => void;
}

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

  
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

  
  const arrayCopy = [...array];

  
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  
  return arrayCopy.slice(0, subsetSize);
}

async function seed() {
  try {
    // Clear existing data (unchanged)
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

    // Track used painter names
    const usedPainterNames = new Set<string>();

    // Seed Painters
    const painters = [];
    for (let i = 1; i <= 11; i++) {
      let name: string;

      // Ensure the painter name is unique
      do {
        name = getRandomPainterName(); // Assign a random name
      } while (usedPainterNames.has(name)); // Check if the name is already used

      // Mark the name as used
      usedPainterNames.add(name);

     

      const agent = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PAINTER!,
        ID.unique(),
        {
          name: name,
          email: `painter${i}@example.com`,
          avatar:
            paintersImages[Math.floor(Math.random() * paintersImages.length)],
        }
      );
      painters.push(agent);
    }
    console.log(`Seeded ${painters.length} painters.`);

    // Rest of the code for seeding paintings (unchanged)
    const usedImages = new Set<string>();
    const usedNames = new Set<string>();
    const usedPrices = new Set<number>();

    for (let i = 1; i <= 25; i++) {
      let image: string;
      let name: string;
      let price: number;
      let painter:string;

      // Generate unique image, name, and price
      do {
        image =
          paintingsImages.length - 1 >= i
            ? paintingsImages[i]
            : paintingsImages[Math.floor(Math.random() * paintingsImages.length)];
      } while (usedImages.has(image));

      do {
        name = getRandomPaintingName(); // Use the random name generator
      } while (usedNames.has(name));

      do {
        price = Math.floor(Math.random() * 300) + 100;
      } while (usedPrices.has(price));

      // Mark the image, name, and price as used
      usedImages.add(image);
      usedNames.add(name);
      usedPrices.add(price);

      const assignedPainter = painters.length
  ? painters[Math.floor(Math.random() * painters.length)]
  : null;

  if (!assignedPainter || typeof assignedPainter.$id !== "string" || assignedPainter.$id.length > 36) {
    console.error("Invalid painter ID:", assignedPainter);
    continue; // Skip this iteration if invalid
  }
    
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
          rating: parseFloat((Math.random() * 5).toFixed(1)),
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
