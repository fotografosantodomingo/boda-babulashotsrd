import { NetworkPage, getNetworkPageMetadata } from "@/components/NetworkPage";

export const metadata = getNetworkPageMetadata("bodas", "servicios", "en");

export default function Page() {
  return <NetworkPage niche="bodas" type="servicios" locale="en" />;
}
