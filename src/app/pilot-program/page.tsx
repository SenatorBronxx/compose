
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Calendar, Map, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const pollSchema = z.object({
    commuteMethod: z.string().optional(),
    commuteDays: z.string().optional(),
    leaveTime: z.string().optional(),
    frustrations: z.array(z.string()).optional(),
    overcrowdingFrequency: z.string().optional(),
    boardingStress: z.string().optional(),
    useApp: z.string().optional(),
    seatAvailabilityImportance: z.string().optional(),
    preBookSeat: z.string().optional(),
    features: z.array(z.string()).optional(),
    musicAppeal: z.string().optional(),
    suggestMusic: z.string().optional(),
    tripPrice: z.string().optional(),
    usePrepaidWallet: z.string().optional(),
    payForGuarantee: z.string().optional(),
    joinPilot: z.string().optional(),
    earlyAccess: z.string().optional(),
    recommend: z.string().optional(),
});

const pollSections = [
  {
    title: 'SECTION 1: COMMUTING HABITS (Demand Validation)',
    questions: [
      {
        id: 'commuteMethod',
        text: 'How do you usually commute to and from campus?',
        type: 'radio',
        options: ['Trotro', 'Ride-hailing (Bolt / Uber / Yango)', 'Private car', 'Walking', 'School shuttle', 'Other'],
      },
      {
        id: 'commuteDays',
        text: 'How many days per week do you commute to campus?',
        type: 'radio',
        options: ['1–2 days', '3–4 days', '5 days', 'Everyday'],
      },
      {
        id: 'leaveTime',
        text: 'What time do you usually leave campus?',
        type: 'radio',
        options: ['Morning', 'Afternoon', 'Evening', 'Late night'],
      },
    ],
  },
  {
    title: 'SECTION 2: CURRENT TRANSPORT PAIN POINTS',
    questions: [
      {
        id: 'frustrations',
        text: 'What frustrates you most about current transport options? (Select all that apply)',
        type: 'checkbox',
        options: ['Long waiting times', 'Overcrowding', 'Unpredictable fares', 'No seat availability', 'Stressful boarding', 'Safety concerns', 'Poor comfort'],
      },
      {
        id: 'overcrowdingFrequency',
        text: 'How often do you experience overcrowded vehicles?',
        type: 'radio',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely', 'Never'],
      },
      {
        id: 'boardingStress',
        text: 'Would you say boarding transport is stressful?',
        type: 'radio',
        options: ['Very stressful', 'Somewhat stressful', 'Neutral', 'Not stressful'],
      },
    ],
  },
  {
      title: 'SECTION 3: INTEREST IN ERITAS (Market Fit)',
      questions: [
          {
              id: 'useApp',
              text: 'Would you use a mobile app that shows nearby buses, routes, and available seats?',
              type: 'radio',
              options: ['Definitely yes', 'Probably yes', 'Not sure', 'Probably no', 'Definitely no']
          },
          {
              id: 'seatAvailabilityImportance',
              text: 'How important is knowing seat availability before boarding?',
              type: 'radio',
              options: ['Extremely important', 'Important', 'Neutral', 'Not important']
          },
          {
              id: 'preBookSeat',
              text: 'Would you prefer booking a seat a few minutes before the bus arrives?',
              type: 'radio',
              options: ['Yes', 'Maybe', 'No']
          }
      ]
  },
  {
      title: 'SECTION 4: FEATURES PRIORITIZATION',
      questions: [
          {
              id: 'features',
              text: 'Which ERITAS features interest you most? (Select up to 3)',
              type: 'checkbox',
              options: ['Live bus tracking', 'Seat reservation', 'Cashless payment (wallet)', 'Route & stop preview', 'Estimated arrival times', 'Music during trips', 'Safety & driver verification']
          },
          {
              id: 'musicAppeal',
              text: 'How appealing is music during bus trips?',
              type: 'radio',
              options: ['Very appealing', 'Appealing', 'Neutral', 'Not appealing']
          },
          {
              id: 'suggestMusic',
              text: 'Would you like to suggest music during trips?',
              type: 'radio',
              options: ['Yes', 'Sometimes', 'No']
          }
      ]
  },
  {
      title: 'SECTION 5: PRICING & PAYMENT INSIGHTS',
      questions: [
          {
              id: 'tripPrice',
              text: 'How much do you usually pay per trip?',
              type: 'radio',
              options: ['Less than GH₵5', 'GH₵5–10', 'GH₵10–15', 'GH₵15+']
          },
          {
              id: 'usePrepaidWallet',
              text: 'Would you use a prepaid wallet for transport?',
              type: 'radio',
              options: ['Yes', 'Maybe', 'No']
          },
          {
              id: 'payForGuarantee',
              text: 'Would you pay slightly more for guaranteed seating & less stress?',
              type: 'radio',
              options: ['Yes', 'Maybe', 'No']
          }
      ]
  },
  {
      title: 'SECTION 6: PILOT PARTICIPATION',
      questions: [
          {
              id: 'joinPilot',
              text: 'Would you like to be part of the ERITAS pilot program?',
              type: 'radio',
              options: ['Yes', 'Maybe', 'No']
          },
          {
              id: 'earlyAccess',
              text: 'Would you like early access when the app launches?',
              type: 'radio',
              options: ['Yes', 'No']
          },
          {
              id: 'recommend',
              text: 'Would you recommend ERITAS to friends if it works as described?',
              type: 'radio',
              options: ['Definitely', 'Probably', 'Not sure', 'Probably not']
          }
      ]
  }
];


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
    const { toast } = useToast();
    const pilotHeaderImage = PlaceHolderImages.find((img) => img.id === "pilot-program-header");

    const form = useForm<z.infer<typeof pollSchema>>({
        resolver: zodResolver(pollSchema),
        defaultValues: {
            frustrations: [],
            features: [],
        }
    });

    function onSubmit(values: z.infer<typeof pollSchema>) {
        console.log(values);
        toast({
            title: "Thank you for your feedback!",
            description: "Your responses have been recorded.",
        });
        form.reset();
    }

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
                <p className="text-lg md:text-xl text-primary-foreground/80">
                    Be a part of shaping the future of transportation on our campus.
                </p>
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

            <ScrollAnimation>
              <section className="bg-card rounded-lg p-8 md:p-12">
                  <h2 className="font-headline text-3xl font-bold text-center mb-4">Help Us Build a Better Transit</h2>
                  <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                      Your feedback is crucial. Please take a moment to answer the questions below.
                  </p>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                          {pollSections.map((section, sectionIndex) => (
                              <Card key={sectionIndex}>
                                  <CardHeader>
                                      <CardTitle>{section.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-8">
                                      {section.questions.map((q) => (
                                          <FormField
                                              key={q.id}
                                              control={form.control}
                                              name={q.id as any}
                                              render={({ field }) => (
                                                  <FormItem className="space-y-3">
                                                      <FormLabel className="font-semibold text-base">{q.text}</FormLabel>
                                                      {q.type === 'radio' ? (
                                                          <FormControl>
                                                              <RadioGroup
                                                                  onValueChange={field.onChange}
                                                                  defaultValue={field.value}
                                                                  className="flex flex-col space-y-1"
                                                              >
                                                                  {q.options.map((option, optionIndex) => (
                                                                      <FormItem key={optionIndex} className="flex items-center space-x-3 space-y-0">
                                                                          <FormControl>
                                                                              <RadioGroupItem value={option} />
                                                                          </FormControl>
                                                                          <FormLabel className="font-normal">{option}</FormLabel>
                                                                      </FormItem>
                                                                  ))}
                                                              </RadioGroup>
                                                          </FormControl>
                                                      ) : (
                                                          q.options.map((option, optionIndex) => (
                                                            <FormField
                                                                key={optionIndex}
                                                                control={form.control}
                                                                name={q.id as any}
                                                                render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                    key={option}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(option)}
                                                                            onCheckedChange={(checked) => {
                                                                                const currentValue = field.value || [];
                                                                                if (checked) {
                                                                                    field.onChange([...currentValue, option]);
                                                                                } else {
                                                                                    field.onChange(
                                                                                        currentValue.filter(
                                                                                            (value: string) => value !== option
                                                                                        )
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {option}
                                                                    </FormLabel>
                                                                    </FormItem>
                                                                );
                                                                }}
                                                            />
                                                            ))
                                                      )}
                                                      <FormMessage />
                                                  </FormItem>
                                              )}
                                          />
                                      ))}
                                  </CardContent>
                              </Card>
                          ))}
                           <Button type="submit" size="lg" className="w-full">
                              Submit Poll
                          </Button>
                      </form>
                  </Form>
              </section>
            </ScrollAnimation>
        </div>
    </>
  );
}

    