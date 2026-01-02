
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, Map, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const timelinePhases = [
    {
        phase: 1,
        title: "Initial Rollout",
        description: "Limited service on core campus routes to gather initial feedback and test system stability.",
    },
    {
        phase: 2,
        title: "Service Expansion",
        description: "Adding more vehicles and expanding routes to include residential areas and popular off-campus spots.",
    },
    {
        phase: 3,
        title: "Full Campus Integration",
        description: "Full on-demand service available to all students and faculty across the entire campus.",
    },
];

export default function PilotProgramPage() {
    const pilotHeaderImage = PlaceHolderImages.find((img) => img.id === "pilot-program-header");

  return (
    <>
        <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
            {pilotHeaderImage && (
            <Image
                src={pilotHeaderImage.imageUrl}
                alt={pilotHeaderImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={pilotHeaderImage.imageHint}
            />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 p-4 max-w-4xl mx-auto">
              <ScrollAnimation>
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                    The Dynamic Change of University Transit Starts Here
                </h1>
              </ScrollAnimation>
              <ScrollAnimation delay={0.1}>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                    Be a part of shaping the future of transportation on our campus.
                </p>
              </ScrollAnimation>
              <ScrollAnimation delay={0.2}>
                <Button asChild size="lg">
                  <Link href="/survey">Take the Survey</Link>
                </Button>
              </ScrollAnimation>
            </div>
        </section>
        <div className="container mx-auto px-4 py-16 md:py-24">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 -mt-8">
                <ScrollAnimation>
                    <div>
                        <h2 className="font-headline text-3xl font-bold mb-6">Purpose of the Pilot</h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            The ERITAS pilot program is a collaborative effort with the university to introduce a modern, on-demand transit solution. Our goal is to test, refine, and perfect our service to meet the unique needs of our campus community.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            By participating, you'll provide valuable feedback that directly influences the system's development, from route efficiency to app features.
                        </p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation delay={0.1}>
                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl flex items-center gap-2"><Users /> Target Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-lg">
                                This pilot will initially be open to all <span className="font-semibold text-primary">students and faculty members</span> of the university. We will be looking for frequent commuters to test our service, which will operate from designated pick-up points to the university premises.
                            </p>
                        </CardContent>
                    </Card>
                </ScrollAnimation>
            </section>

            <section className="mb-24">
              <ScrollAnimation>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-2"><Map/> Routes & Operations</h2>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground">
                            During the initial phase, ERITAS will operate on a set of core routes connecting key academic buildings, libraries, and student centers. As the pilot progresses, we will introduce on-demand service zones, allowing you to book rides to and from more locations within the campus boundaries.
                        </p>
                    </CardContent>
                </Card>
                </ScrollAnimation>
            </section>

            <section className="mb-24">
                <ScrollAnimation>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-2"><Calendar/> Timeline & Phases</h2>
                </ScrollAnimation>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {timelinePhases.map((phase, index) => (
                        <ScrollAnimation key={phase.phase} delay={index * 0.1}>
                          <Card className="flex flex-col h-full">
                              <CardHeader>
                                  <div className="flex justify-between items-center mb-2">
                                      <CardTitle className="font-headline text-xl">Phase {phase.phase}: {phase.title}</CardTitle>
                                  </div>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                  <p className="text-muted-foreground">{phase.description}</p>
                              </CardContent>
                          </Card>
                        </ScrollAnimation>
                    ))}
                </div>
            </section>

        </div>
    </>
  );
}
