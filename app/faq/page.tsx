import { NetworkPage, getNetworkPageMetadata } from "@/components/NetworkPage";

export const metadata = getNetworkPageMetadata("bodas", "faq", "es");

export default function Page() {
  return <NetworkPage niche="bodas" type="faq" locale="es" />;
}
