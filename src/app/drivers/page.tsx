import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Award, CheckCircle, ClipboardList, HelpCircle } from "lucide-react";
import Link from "next/link";

const requirements = [
    "Valid driver's license",
    "Clean driving record",
    "Pass a background check",
    "University affiliation (student, staff)",
    "Customer service oriented",
  ];

const onboardingSteps = [
    {
      step: 1,
      title: "Submit Application",
      description: "Fill out our online application form with your details.",
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Upload your driver's license and other required documents.",
    },
    {
      step: 3,
      title: "Complete Training",
      description: "Go through our online training modules on safety and app usage.",
    },
    {
      step: 4,
      title: "Start Driving",
      description: "Once approved, you'll receive your credentials and can start accepting rides.",
    },
];

const faqs = [
    {
        question: "What is ERITAS?",
        answer: "ERITAS is a smart bus transport system that modernizes Ghana’s trotro experience using technology. It helps drivers get organized trips, guaranteed passengers, digital payments, and better daily earnings."
    },
    {
        question: "Who can register as an ERITAS driver?",
        answer: "Only verified drivers approved by ERITAS can operate on the platform. You must: Have a valid driver’s license, Be assigned to an ERITAS-registered bus, Complete ERITAS onboarding, and Receive a driver registration code from ERITAS."
    },
    {
        question: "Why do I need a registration code to sign up?",
        answer: "The registration code links you to a specific bus, confirms you are the rightful driver, and automatically loads your bus details (plate number, seats, route). This prevents fraud and ensures accountability."
    },
    {
        question: "Do I need my own bus to join ERITAS?",
        answer: "Not necessarily. Some buses are company-managed, and some are owner-partner buses. You will only drive buses officially registered with ERITAS."
    },
    {
        question: "How do I get paid?",
        answer: "Drivers are paid through the ERITAS Pay wallet with weekly or daily settlements, depending on the policy. Passengers pay digitally, reducing cash handling and disputes."
    },
    {
        question: "Do passengers still pay with cash?",
        answer: "During the pilot, payments will be mostly digital, though limited cash (logged by the app) will be allowed. The long-term goal is a fully cashless system."
    },
    {
        question: "How does boarding work?",
        answer: "Passengers reserve seats via the app and are verified upon boarding. The driver app shows who has booked, available seats, and the total number of passengers onboard."
    },
    {
        question: "What happens if a passenger books but doesn’t show up?",
        answer: "There’s a grace period, after which the seat is released. This ensures no delay to your trip."
    },
    {
        question: "Will the app distract me while driving?",
        answer: "No. The driver app is designed to be minimal, voice-assisted, and hands-free during driving. Most actions happen before or after trips."
    }
];


export default function DriversPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <ScrollAnimation>
        <header className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Drive with ERITAS</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn flexibly, be your own boss, and help your campus community get around.
          </p>
        </header>
      </ScrollAnimation>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <ScrollAnimation>
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6">Why Drive for ERITAS?</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Flexible Schedule:</span> Drive when you want, where you want.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Weekly Pay:</span> Get your earnings deposited directly into your account every week.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Community Focused:</span> Be a key part of helping your fellow students and faculty navigate campus.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span><span className="font-semibold">24/7 Support:</span> Our team is always available to help you on the road.</span>
              </li>
            </ul>
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <Card className="bg-card">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2"><ClipboardList/> Driver Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3">
                      {requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-3 text-muted-foreground">
                              <Award className="h-5 w-5 text-accent"/>
                              <span>{req}</span>
                          </li>
                      ))}
                  </ul>
              </CardContent>
          </Card>
        </ScrollAnimation>
      </section>

      <section className="mb-24">
        <ScrollAnimation>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Easy Onboarding Process</h2>
        </ScrollAnimation>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {onboardingSteps.map((step, index) => (
              <ScrollAnimation key={step.step} delay={index * 0.1}>
                <div className="text-center relative">
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <ScrollAnimation>
        <section className="bg-accent text-accent-foreground rounded-lg p-8 md:p-12 text-center mb-24">
          <h2 className="font-headline text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our team of drivers and start earning on your terms.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <Link href="/contact">Apply Now</Link>
          </Button>
        </section>
      </ScrollAnimation>

      <section>
        <ScrollAnimation>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3"><HelpCircle/> Frequently Asked Questions</h2>
        </ScrollAnimation>
        <ScrollAnimation>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqs.map((faq, i) => (
                   <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="font-headline text-lg text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">
                       {faq.answer}
                      </AccordionContent>
                  </AccordionItem>
              ))}
          </Accordion>
        </ScrollAnimation>
      </section>

    </div>
  );
}
