import { NetworkPage, getNetworkPageMetadata } from "@/components/NetworkPage";

export const metadata = getNetworkPageMetadata("bodas", "servicios", "es");

export default function Page() {
  return <NetworkPage niche="bodas" type="servicios" locale="es" />;
}
