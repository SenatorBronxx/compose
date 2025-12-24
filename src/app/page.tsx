import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Bus, Shield, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Bus className="h-10 w-10" />,
    title: "Efficient Routes",
    description: "Optimized routes ensure you get to your destination faster.",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Seamless Booking",
    description: "Book your ride in seconds with our intuitive mobile app.",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Safety First",
    description: "Trained drivers and real-time tracking for your peace of mind.",
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: "Download the App",
    description: "Get the ERITAS app from the App Store or Google Play.",
  },
  {
    step: 2,
    title: "Set Your Destination",
    description: "Enter where you're going and see your route options.",
  },
  {
    step: 3,
    title: "Book Your Ride",
    description: "Confirm your pickup and track your vehicle in real-time.",
  },
  {
    step: 4,
    title: "Enjoy the Journey",
    description: "Sit back, relax, and enjoy a comfortable, smart ride.",
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4">
            The Future of Reliable Transit Is Here
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            ERITAS provides smart, on-demand transportation for the modern campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/pilot-program">Join Pilot</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/mobile-app">Download App</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            Smarter Travel, Better Campus Life
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center group hover:border-primary transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline pt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howItWorksSteps.map((step) => (
                <div key={step.step} className="text-center relative">
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Join the ERITAS Pilot Program
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Be among the first to experience the future of campus transit. Help us shape the service.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            <Link href="/pilot-program">
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
