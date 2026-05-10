import { NetworkPage, getNetworkPageMetadata } from "@/components/NetworkPage";

export const metadata = getNetworkPageMetadata("bodas", "precios", "es");

export default function Page() {
  return <NetworkPage niche="bodas" type="precios" locale="es" />;
}
