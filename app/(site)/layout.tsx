import { DemoBanner } from "@/components/site/demo-banner";
import { DesignSwitcher } from "@/components/site/design-switcher";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { RevealObserver } from "@/components/reveal-observer";
import { getSiteContent, isPromoActive } from "@/lib/db";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();
  const promoActive = isPromoActive(content);

  return (
    <>
      <DemoBanner />
      <Header promoActive={promoActive} kidsActive={content.kids.enabled} settings={content.settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={content.settings} footerText={content.texts.footerText} promoActive={promoActive} kidsActive={content.kids.enabled} />
      <RevealObserver />
      <DesignSwitcher />
    </>
  );
}
