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
      question: "What are the vehicle requirements?",
      answer: "Vehicles must be 4-door, in good condition, and pass a basic inspection. Specific model year requirements may apply."
    },
    {
      question: "How are drivers paid?",
      answer: "Earnings are calculated based on time and distance for each trip. Payments are deposited directly into your bank account on a weekly basis."
    },
    {
      question: "Can I set my own hours?",
      answer: "Yes, absolutely. As an ERITAS driver, you have the flexibility to drive whenever it fits your schedule. Just log into the app and start accepting rides."
    },
    {
      question: "Is there insurance coverage?",
      answer: "ERITAS provides commercial auto insurance that covers you from the moment you accept a ride request until the ride ends."
    }
  ]

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
