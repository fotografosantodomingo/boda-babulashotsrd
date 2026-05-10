import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "public/images/fotografo-de-boda-playa-punta-cana.webp");
const out = path.join(root, "public/images/social-card-1200x630.webp");

await sharp(src)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .webp({ quality: 78 })
  .toFile(out);

console.log("Wrote", out);
