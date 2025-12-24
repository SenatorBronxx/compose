import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Eye, Heart, Rocket, ShieldCheck } from "lucide-react";
import Image from "next/image";

const values = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in transit technology.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Safety",
      description: "The well-being of our passengers and drivers is our highest priority.",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Sustainability",
      description: "We're committed to building a greener future with efficient, eco-friendly transit.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community",
      description: "We strive to connect campuses and build stronger, more accessible communities.",
    },
  ];

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === "about-page-image");
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <ScrollAnimation>
        <header className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">About ERITAS</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing mobility to create smarter, more connected communities.
          </p>
        </header>
      </ScrollAnimation>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <ScrollAnimation className="space-y-6">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-muted-foreground text-lg">
              To provide safe, efficient, and sustainable transportation solutions that enhance the daily lives of students and faculty, transforming the university campus experience.
            </p>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold mb-4 text-accent">Our Vision</h2>
            <p className="text-muted-foreground text-lg">
              To be the leading smart transit platform for communities worldwide, creating a future where mobility is seamless, intelligent, and accessible to all.
            </p>
          </div>
        </ScrollAnimation>
        {aboutImage && (
            <ScrollAnimation delay={0.1}>
              <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                      src={aboutImage.imageUrl}
                      alt={aboutImage.description}
                      width={1000}
                      height={600}
                      className="object-cover w-full h-full"
                      data-ai-hint={aboutImage.imageHint}
                  />
              </div>
            </ScrollAnimation>
        )}
      </section>

      <section className="mb-24">
        <ScrollAnimation>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
        </ScrollAnimation>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ScrollAnimation key={value.title} delay={index * 0.1}>
              <Card className="text-center border-t-4 border-primary/50 hover:border-primary transition-all duration-300 h-full">
                <CardHeader>
                  <div className="mx-auto text-primary mb-4">{value.icon}</div>
                  <CardTitle className="font-headline">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      <ScrollAnimation>
        <section className="bg-card rounded-lg p-8 md:p-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">Why ERITAS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-2">Data-Driven</h3>
                  <p className="text-muted-foreground">Our platform uses real-time data to optimize routes, reduce wait times, and improve service reliability.</p>
              </div>
              <div>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-2">User-Centric</h3>
                  <p className="text-muted-foreground">From our intuitive app to our responsive support, we put the needs of our riders and drivers first.</p>
              </div>
              <div>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-2">Future-Ready</h3>
                  <p className="text-muted-foreground">We're building a scalable platform that can grow with the needs of the campus and integrate future mobility innovations.</p>
              </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
