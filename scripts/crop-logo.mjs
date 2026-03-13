import sharp from 'sharp'
import { readFileSync } from 'fs'

const input = '/vercel/share/v0-project/public/images/replai-logo.png'

const metadata = await sharp(input).metadata()
const { width, height } = metadata
console.log(`Original size: ${width}x${height}`)

// The sheet is ~1400x600. The logotype (icon + "Replai" text) is on the right half.
// Crop: start at 52% x, top ~15%, width ~46%, height ~60% to avoid captions.
const cropLeft = Math.round(width * 0.51)
const cropTop = Math.round(height * 0.12)
const cropWidth = Math.round(width * 0.46)
const cropHeight = Math.round(height * 0.58)

await sharp(input)
  .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
  .png()
  .toFile('/vercel/share/v0-project/public/images/replai-logotype.png')

console.log(`Cropped logotype saved: ${cropLeft},${cropTop} ${cropWidth}x${cropHeight}`)
