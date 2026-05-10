import { NetworkPage, getNetworkPageMetadata } from "@/components/NetworkPage";

export const metadata = getNetworkPageMetadata("bodas", "ubicaciones", "es");

export default function Page() {
  return <NetworkPage niche="bodas" type="ubicaciones" locale="es" />;
}
