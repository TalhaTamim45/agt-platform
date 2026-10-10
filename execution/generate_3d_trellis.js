import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * 2D to 3D Generation Tool using Microsoft TRELLIS (Free Open-Source Zero-Budget Engine)
 * Layer 3 Execution Script for AGT Platform
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download file from ${url}: ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  console.log(`[EXECUTION] Downloaded ${destPath} (${(fs.statSync(destPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

async function run() {
  const args = process.argv.slice(2);
  const getArg = (flag, defaultVal) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultVal;
  };

  const inputPath = getArg('--input', path.resolve(__dirname, '../.tmp/stainless-bottle-300ml.jpeg'));
  const outputGlb = getArg('--output', path.resolve(__dirname, '../public/models/stainless-bottle-300ml.glb'));
  const outputManifest = getArg('--manifest', path.resolve(__dirname, '../public/models/stainless-bottle-300ml.json'));
  const productId = getArg('--id', 'stainless-bottle-300ml');
  const productName = getArg('--name', 'Stainless Bottle 300ml');
  const category = getArg('--category', 'Drinkware');
  const decimationTarget = parseInt(getArg('--decimation', '150000'), 10);
  const textureSize = parseInt(getArg('--texture-size', '1024'), 10);

  if (!fs.existsSync(inputPath)) {
    console.error(`[ERROR] Input file does not exist: ${inputPath}`);
    process.exit(1);
  }

  // Ensure output directories exist
  fs.mkdirSync(path.dirname(outputGlb), { recursive: true });
  fs.mkdirSync(path.dirname(outputManifest), { recursive: true });

  console.log('====================================================');
  console.log('AGT 2D-TO-3D PIPELINE: ZERO-BUDGET TRELLIS GENERATOR');
  console.log('====================================================');
  console.log(`Product ID:       ${productId}`);
  console.log(`Product Name:     ${productName}`);
  console.log(`Input Image:      ${inputPath}`);
  console.log(`Output GLB:       ${outputGlb}`);
  console.log(`Decimation Target:${decimationTarget} faces`);
  console.log(`Texture Size:     ${textureSize}px`);
  console.log('----------------------------------------------------');

  // Read .env if present
  const envFile = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envFile)) {
    const lines = fs.readFileSync(envFile, 'utf-8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length) {
        process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
      }
    }
  }

  // Extract all available tokens from CLI and .env
  const tokenList = [];
  const cliToken = getArg('--token');
  if (cliToken) tokenList.push(cliToken);
  if (process.env.HF_TOKENS) {
    tokenList.push(...process.env.HF_TOKENS.split(',').map(t => t.trim()).filter(Boolean));
  }
  for (const key of Object.keys(process.env)) {
    if (key.startsWith('HF_TOKEN') && key !== 'HF_TOKENS' && process.env[key]) {
      tokenList.push(process.env[key].trim());
    }
  }
  const uniqueTokens = Array.from(new Set(tokenList.filter(Boolean)));
  if (uniqueTokens.length === 0) uniqueTokens.push(null); // anonymous fallback

  console.log(`[AUTH] Loaded ${uniqueTokens.filter(Boolean).length} Hugging Face token(s) for pooling.`);

  const { Client, handle_file } = await import('@gradio/client');
  const SPACE_URL = 'https://microsoft-trellis-2.hf.space';

  let currentTokenIdx = 0;
  let lastError = null;

  while (currentTokenIdx < uniqueTokens.length) {
    const activeToken = uniqueTokens[currentTokenIdx];
    currentTokenIdx++;

    try {
      console.log(`[1/4] Connecting to Hugging Face Space: ${SPACE_URL}...`);
      if (activeToken) {
        console.log(`      Using token #${currentTokenIdx} for dedicated ZeroGPU quota.`);
      } else {
        console.log(`      No token provided (running in anonymous free mode).`);
      }

      const app = await Client.connect(SPACE_URL, activeToken ? { token: activeToken } : {});
      console.log('[1/4] Connected successfully.');

      console.log(`[2/4] Preprocessing input image (Background Removal & Alpha Mask)...`);
      const preprocessRes = await app.predict('/preprocess_image', {
        input: handle_file(inputPath),
      });

      const preprocessedData = preprocessRes.data[0];
      console.log(`[2/4] Preprocessing completed. Masked image: ${preprocessedData.url || preprocessedData.path}`);

      console.log(`[3/4] Running TRELLIS 3D Generation (Sparse Structure -> Shape -> Material)...`);
      console.log(`      This typically takes 20-45 seconds on GPU...`);
      const startTime = Date.now();

      const gen3dRes = await app.predict('/image_to_3d', {
        image: preprocessedData,
        seed: 0,
        resolution: '1024',
        ss_guidance_strength: 7.5,
        ss_guidance_rescale: 0.7,
        ss_sampling_steps: 12,
        ss_rescale_t: 5,
        shape_slat_guidance_strength: 7.5,
        shape_slat_guidance_rescale: 0.5,
        shape_slat_sampling_steps: 12,
        shape_slat_rescale_t: 3,
        tex_slat_guidance_strength: 1,
        tex_slat_guidance_rescale: 0,
        tex_slat_sampling_steps: 12,
        tex_slat_rescale_t: 3,
      });

      const genElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`[3/4] 3D Generation completed in ${genElapsed}s!`);

      console.log(`[4/4] Extracting GLB mesh (Decimation: ${decimationTarget}, Texture: ${textureSize})...`);
      const extractStartTime = Date.now();
      
      const extractRes = await app.predict('/extract_glb', [
        null,
        decimationTarget,
        textureSize,
      ]);

      const extractElapsed = ((Date.now() - extractStartTime) / 1000).toFixed(1);
      console.log(`[4/4] GLB extraction completed in ${extractElapsed}s!`);

      const glbItem = extractRes.data[0] || extractRes.data[1];
      const glbUrl = glbItem?.url || (glbItem?.path ? `${SPACE_URL}/gradio_api/file=${glbItem.path}` : null);

      if (!glbUrl) {
        throw new Error('Could not find download URL in extraction response: ' + JSON.stringify(extractRes.data));
      }

      console.log(`[EXECUTION] Downloading GLB from: ${glbUrl}`);
      await downloadFile(glbUrl, outputGlb);
      break; // Success! Exit token retry loop.
    } catch (err) {
      lastError = err;
      if (err.message && err.message.includes('ZeroGPU quota')) {
        console.warn(`[TOKEN ROTATION] Token #${currentTokenIdx} ZeroGPU quota reached.`);
        if (currentTokenIdx < uniqueTokens.length) {
          console.log(`[TOKEN ROTATION] Rotating to next token in pool...`);
          continue;
        }
      }
      throw err;
    }
  }

  const stats = fs.statSync(outputGlb);
  const sizeMb = (stats.size / 1024 / 1024).toFixed(2);

  const materialPreset = getArg('--preset', 'metal').toLowerCase();

  const MATERIAL_PRESETS = {
    metal: {
      type: 'MeshStandardMaterial',
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.2,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
    },
    silicone: {
      type: 'MeshPhysicalMaterial',
      metalness: 0.05,
      roughness: 0.72,
      clearcoat: 0.0,
      transmission: 0.15,
      emissive: '#fef08a',
      emissiveIntensity: 0.25,
      envMapIntensity: 0.85,
    },
    plastic: {
      type: 'MeshStandardMaterial',
      metalness: 0.1,
      roughness: 0.45,
      clearcoat: 0.15,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.0,
    },
    glass: {
      type: 'MeshPhysicalMaterial',
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.92,
      ior: 1.52,
      envMapIntensity: 1.8,
    },
    cardboard: {
      type: 'MeshStandardMaterial',
      metalness: 0.0,
      roughness: 0.88,
      clearcoat: 0.0,
      envMapIntensity: 0.7,
    },
  };

  const selectedMaterial = MATERIAL_PRESETS[materialPreset] || MATERIAL_PRESETS.metal;

  // Generate WebGL JSON Manifest for React Three Fiber Canvas
  const manifest = {
    id: productId,
    name: productName,
    category: category,
    preset: materialPreset,
    model: {
      url: `/models/${path.basename(outputGlb)}`,
      fileSize: `${sizeMb} MB`,
      format: 'glb',
      generator: 'Microsoft TRELLIS.2-4B (Free HF Space)',
      decimationTarget: decimationTarget,
      textureResolution: `${textureSize}x${textureSize}`,
      generatedAt: new Date().toISOString(),
    },
    physics: {
      antiGravity: true,
      levitationAmplitude: 0.14,
      levitationFrequency: 0.75,
      rotationSpeed: {
        x: 0.003,
        y: 0.006,
        z: 0.002,
      },
      damping: 0.95,
      collisionRadius: 0.65,
    },
    materials: selectedMaterial,
    lighting: {
      rimLightColor: materialPreset === 'silicone' ? '#fde047' : '#38bdf8',
      keyLightIntensity: 1.8,
      fillLightIntensity: 0.8,
    },
    camera: {
      initialPosition: [0, 0, 2.5],
      target: [0, 0, 0],
      fov: 45,
    },
  };

  fs.writeFileSync(outputManifest, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`[EXECUTION] Manifest generated: ${outputManifest}`);
  console.log('====================================================');
  console.log('SUCCESS: First 3D asset generated at $0.00 cost!');
  console.log('====================================================');
  process.exit(0);
}

run().catch((err) => {
  console.error('[ERROR DETAILS]', err.message || err);
  if (err.message && err.message.includes('ZeroGPU quota')) {
    console.error('\n====================================================');
    console.error('ZERO-GPU QUOTA NOTICE');
    console.error('====================================================');
    console.error('The daily ZeroGPU quota for this Hugging Face account has been reached.');
    console.error('Free tier accounts get ~5 minutes (300s) of GPU time per 24 hours.');
    console.error('====================================================\n');
  } else {
    console.error('[FATAL ERROR]', err);
  }
  process.exit(1);
});
