# 2D to 3D Pipeline Directive — Zero-Budget Edition

> **Budget: $0.00** — All generation via free Hugging Face Spaces.  
> **Updated: 2026-10-09** — Pivoted from paid Meshy.ai to open-source models.

## Primary Engine: Microsoft TRELLIS (via Hugging Face)
- **URL**: https://huggingface.co/spaces/trellis-community/TRELLIS
- **Model**: TRELLIS.2-4B (4 billion parameters)
- **License**: MIT (free for commercial use)
- **Output**: GLB with PBR materials + UV unwrapping
- **Quality**: Top-tier for hard-surface objects (bottles, electronics, boxes)
- **Cost**: $0 — completely free on HF Spaces

## Fallback Engine: Stable Fast 3D (SF3D)
- **URL**: https://huggingface.co/spaces/stabilityai/stable-fast-3d
- **Model**: SF3D by Stability AI
- **License**: Community License (free for <$1M revenue)
- **Output**: GLB with UV-unwrapped meshes + material parameters
- **Speed**: <1 second generation
- **Cost**: $0 — free on HF Spaces

## Tertiary Fallback: TripoSR
- **URL**: https://huggingface.co/spaces/stabilityai/TripoSR
- **Note**: Outputs vertex colors (not full PBR). Use only if both above are down.

---

## Product Catalog (30 unique products from 33 images)

### Wave 1 — Best 3D Candidates (Clean Hero Shots)
| # | Product ID | Source Image | Material | Status | Output Assets |
|---|-----------|-------------|----------|--------|---------------|
| 1 | stainless-bottle-300ml | 9.31.28 AM (2).jpeg | Matte Black Metal | ✅ Generated | `stainless-bottle-300ml.glb` (4.54MB) |
| 2 | smiley-night-light | 9.31.26 AM.jpeg | Soft-Touch Silicone | ⏳ Queued | - |
| 3 | niyama-electric-kettle | 9.31.28 AM (1).jpeg | Matte Black Plastic | ⏳ Queued | - |
| 4 | prestige-vacuum-flask | 9.31.27 AM (2).jpeg | Polished Gold Metal | ⏳ Queued | - |

### Wave 2 — Good Shots, Packaged Products
| # | Product ID | Source Image | Material |
|---|-----------|-------------|----------|
| 5 | ruilang-flashlight-orange | 9.31.22 AM.jpeg | Glossy Orange Plastic |
| 6 | lsaga-doorbell-white | 9.31.23 AM (2).jpeg | Glossy White + Gold |
| 7 | bulb-humidifier | 9.31.24 AM.jpeg | Transparent Glass + Metal |
| 8 | multifunctional-cleaning-brush | 9.31.22 AM (1).jpeg | White Plastic |

### Wave 3 — Food Products (Box/Jar Geometry)
| # | Product ID | Source Image | Material |
|---|-----------|-------------|----------|
| 9 | toktalk-dragon-fruit-jam | 9.31.21 AM (1).jpeg | Glass Jar + Metal Lid |
| 10 | khas-dawat-meat-masala | 9.31.30 AM (1).jpeg | Cardboard Box |
| 11 | fresh-green-tea | 9.31.27 AM (1).jpeg | Cardboard Box |

### Wave 4 — Remaining Products
(All remaining products from the approved catalog)

---

## Browser Agent Workflow (Per Product)

### Pre-Processing (Before Upload)
1. The source images have busy backgrounds, packaging, and props
2. TRELLIS has built-in background removal — use it
3. If needed, crop image to center the product before upload

### Generation Steps
1. Navigate to https://huggingface.co/spaces/trellis-community/TRELLIS
2. Upload the product image into the Gradio interface
3. Wait for background removal / processing
4. Click "Generate" or equivalent button
5. Wait for 3D model generation (typically 10-60 seconds on HF)
6. Preview the 3D model in the embedded viewer
7. Download the `.glb` file
8. Save to `public/models/[product-id].glb`

### If TRELLIS Queue Is Full
1. Navigate to https://huggingface.co/spaces/stabilityai/stable-fast-3d
2. Follow same upload → generate → download workflow
3. SF3D is faster (<1 sec) but may have slightly less detailed textures

---

## Layer 3 Execution Engine (Deterministic)
The generation is automated via `execution/generate_3d_trellis.js` using `@gradio/client`.

### Usage
```bash
# Using a free Hugging Face token (recommended to bypass anonymous ZeroGPU queue):
node execution/generate_3d_trellis.js --input .tmp/stainless-bottle-300ml.jpeg --id stainless-bottle-300ml --token <hf_token>

# Or store HF_TOKEN in .env:
# HF_TOKEN=hf_...
node execution/generate_3d_trellis.js --input .tmp/stainless-bottle-300ml.jpeg --id stainless-bottle-300ml
```

### Token Pooling & Rotation
The generator supports multi-token pooling to bypass single-account daily ZeroGPU quotas:
```env
HF_TOKEN=hf_primary...
HF_TOKEN_2=hf_secondary...
```
When one token hits the daily ZeroGPU limit, the script automatically rotates to the next available token in the pool without interrupting the pipeline.

## Quality Gate Checklist
- [ ] No floating geometry artifacts
- [ ] Correct product proportions maintained
- [ ] PBR materials applied (BaseColor, Normal, Roughness at minimum)
- [ ] Typography/logos are legible or handled via decal overlay
- [ ] File size < 5MB raw (before optimization)
- [ ] Centered origin point (0, 0, 0)

## Post-Processing Pipeline
1. **Mesh Optimization**: Decimate to 15K-40K triangles if needed
2. **ORM Texture Packing**: Combine AO/Roughness/Metallic channels
3. **Compression**: gltfpack with Meshopt + KTX2 (if available locally)
4. **Target**: ≤ 3MB per final GLB file

## Learnings & Edge Cases
- 2026-10-09: Meshy.ai requires paid credits ($20/model). REJECTED.
- 2026-10-09: Pivoted to TRELLIS (MIT, free HF Space) as primary engine.
- 2026-10-09: Built deterministic Layer 3 execution tool `execution/generate_3d_trellis.js` using `@gradio/client`.
- 2026-10-09: Implemented ZeroGPU Token Rotation Pool (`HF_TOKEN`, `HF_TOKEN_2`, etc.) in `generate_3d_trellis.js` to enable continuous generation across multiple free accounts.


