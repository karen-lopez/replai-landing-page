import sharp from 'sharp'

const input = '/vercel/share/v0-project/public/images/replai-logo.png'

const metadata = await sharp(input).metadata()
const { width, height } = metadata
console.log(`Original size: ${width}x${height}`)

// The sheet has: big icon on the left half, small icon + "Replai" wordmark on the right half.
// Crop the right half logotype (icon + text), avoiding the caption text at the bottom.
const cropLeft = Math.round(width * 0.51)
const cropTop = Math.round(height * 0.05)
const cropWidth = Math.round(width * 0.47)
const cropHeight = Math.round(height * 0.62)

await sharp(input)
  .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
  .png()
  .toFile('/vercel/share/v0-project/public/images/replai-logotype.png')

console.log(`Saved logotype: x=${cropLeft} y=${cropTop} ${cropWidth}x${cropHeight}`)
