import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '..', 'public', 'design');
const outputDir = path.join(__dirname, '..', 'public', 'design', 'optimized');

// Tailles pour les différents breakpoints
const sizes = [400, 800, 1200, 1600];

// Extensions d'images supportées
const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

async function optimizeImage(inputPath, outputPath, width) {
  try {
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Erreur lors de l'optimisation de ${inputPath}:`, error);
    return false;
  }
}

async function processImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (!supportedExtensions.includes(ext)) return;

  const basename = path.basename(filename, ext);
  const inputPath = path.join(inputDir, filename);

  console.log(`Traitement de ${filename}...`);

  // Créer le dossier de sortie si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const srcset = [];

  // Générer les différentes tailles
  for (const size of sizes) {
    const outputFilename = `${basename}-${size}w.webp`;
    const outputPath = path.join(outputDir, outputFilename);

    const success = await optimizeImage(inputPath, outputPath, size);
    if (success) {
      srcset.push(`${outputFilename} ${size}w`);
    }
  }

  // Générer aussi la version originale optimisée
  const originalOutput = path.join(outputDir, `${basename}.webp`);
  const originalSuccess = await optimizeImage(inputPath, originalOutput, null);
  if (originalSuccess) {
    srcset.unshift(`${basename}.webp`);
  }

  return {
    original: filename,
    webp: `${basename}.webp`,
    srcset: srcset.join(', ')
  };
}

async function main() {
  try {
    // Vérifier que le dossier existe
    if (!fs.existsSync(inputDir)) {
      console.error(`Le dossier ${inputDir} n'existe pas`);
      return;
    }

    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return supportedExtensions.includes(ext);
    });

    console.log(`Trouvé ${imageFiles.length} images à optimiser`);

    const results = [];

    for (const file of imageFiles) {
      const result = await processImage(file);
      if (result) {
        results.push(result);
      }
    }

    // Générer le fichier de mapping
    const mappingPath = path.join(outputDir, 'image-mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2));

    console.log(`Optimisation terminée ! ${results.length} images traitées.`);
    console.log(`Fichier de mapping créé : ${mappingPath}`);

  } catch (error) {
    console.error('Erreur lors du traitement :', error);
  }
}

main();