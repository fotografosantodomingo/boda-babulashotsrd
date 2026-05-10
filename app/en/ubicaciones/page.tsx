import { NetworkPage, getNetworkPageMetadata } from "@/components/NetworkPage";

export const metadata = getNetworkPageMetadata("bodas", "ubicaciones", "en");

export default function Page() {
  return <NetworkPage niche="bodas" type="ubicaciones" locale="en" />;
}
