import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { HowItWorks } from "@/components/site/how-it-works";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { Faq } from "@/components/site/faq";
import { CtaBanner } from "@/components/site/cta-banner";
import { Footer } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Services />
        <WhyUs />
        <CtaBanner />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
