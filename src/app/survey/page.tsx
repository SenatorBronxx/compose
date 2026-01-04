
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Label } from '@/components/ui/label';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


// Zod validation schema
const surveySchema = z.object({
  // Section 1: Commuting Habits
  commuteMethod: z.string({ required_error: 'Please select your commute method.' }),
  commuteDays: z.string({ required_error: 'Please select how many days you commute.' }),
  leaveTime: z.string({ required_error: 'Please select when you leave campus.' }),
  
  // Section 2: Current Transport Pain Points
  painPoints: z.array(z.string()).min(1, {
    message: 'Please select at least one pain point.',
  }),
  overcrowdingFrequency: z.string({
    required_error: 'Please select how often you experience overcrowding.',
  }),
  boardingStress: z.string({ required_error: 'Please select your stress level when boarding.' }),
  
  // Section 3: Interest in Transport App
  useApp: z.string({ required_error: 'Please select if you would use the app.' }),
  seatAvailabilityImportance: z.string({
    required_error: 'Please select importance of seat availability.',
  }),
  preBook: z.string({ required_error: 'Please select if you prefer pre-booking.' }),
  
  // Section 4: Features Prioritization
  features: z.array(z.string())
    .min(1, { message: 'Please select at least one feature.' })
    .max(3, { message: 'Please select up to 3 features only.' }),
  musicAppeal: z.string({ required_error: 'Please select music appeal level.' }),
  suggestMusic: z.string({ required_error: 'Please select if you want to suggest music.' }),
  
  // Section 5: Pricing & Payment
  tripPrice: z.string({ required_error: 'Please select your usual trip price.' }),
  useWallet: z.string({ required_error: 'Please select if you would use a wallet.' }),
  payForSeat: z.string({ required_error: 'Please select if you would pay extra for a seat.' }),
  
  // Section 6: Pilot Participation
  joinPilot: z.string({ required_error: 'Please select if you want to join the pilot.' }),
  earlyAccess: z.string({ required_error: 'Please select if you want early access.' }),
  recommend: z.string({ required_error: 'Please select if you would recommend the service.' }),
});

type SurveyFormData = z.infer<typeof surveySchema>;

// Checkbox items for pain points
const painPointItems = [
  { id: 'waiting', label: 'Long waiting times' },
  { id: 'overcrowding', label: 'Overcrowding' },
  { id: 'fares', label: 'Unpredictable fares' },
  { id: 'no-seat', label: 'No seat availability' },
  { id: 'boarding', label: 'Stressful boarding' },
  { id: 'safety', label: 'Safety concerns' },
  { id: 'comfort', label: 'Poor comfort' },
  { id: 'delay', label: 'Frequent delays' },
];

// Checkbox items for features
const featureItems = [
  { id: 'tracking', label: 'Live vehicle tracking' },
  { id: 'reservation', label: 'Seat reservation' },
  { id: 'cashless', label: 'Cashless payment (wallet)' },
  { id: 'route-preview', label: 'Route & stop preview' },
  { id: 'eta', label: 'Accurate estimated arrival times' },
  { id: 'music', label: 'Music during trips' },
  { id: 'verification', label: 'Safety & driver verification' },
  { id: 'alerts', label: 'Real-time alerts & notifications' },
];

export default function StudentTransportSurvey() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const surveyHeaderImage = PlaceHolderImages.find((img) => img.id === "survey-page-header");

  // Initialize form
  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      painPoints: [],
      features: [],
      commuteMethod: '',
      commuteDays: '',
      leaveTime: '',
      overcrowdingFrequency: '',
      boardingStress: '',
      useApp: '',
      seatAvailabilityImportance: '',
      preBook: '',
      musicAppeal: '',
      suggestMusic: '',
      tripPrice: '',
      useWallet: '',
      payForSeat: '',
      joinPilot: '',
      earlyAccess: '',
      recommend: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: SurveyFormData) => {
    try {
      if (!firestore) {
        throw new Error("Firestore is not initialized");
      }
      const responsesCollection = collection(firestore, 'survey-responses');
      await addDocumentNonBlocking(responsesCollection, {
        ...data,
        submittedAt: serverTimestamp(),
      });
      toast({
        title: 'Thank you for your feedback!',
        description: 'Your responses have been recorded successfully.',
        variant: 'default',
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your survey. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
        {surveyHeaderImage && (
            <Image
                src={surveyHeaderImage.imageUrl}
                alt={surveyHeaderImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={surveyHeaderImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <ScrollAnimation>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
              Student Transport Experience Survey
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-primary-foreground/90">
              Help us understand your commuting challenges and preferences. 
              Your feedback will directly influence future transport improvements on campus.
            </p>
            <div className="mt-6 p-3 bg-card/20 rounded-lg border border-white/20 backdrop-blur-sm w-fit mx-auto">
              <p className="text-sm text-primary-foreground/90">
                All responses are anonymous
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            {/* Section 1: Commuting Habits */}
            <ScrollAnimation delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Section 1: Your Commuting Habits</CardTitle>
                  <CardDescription>
                    Tell us about your daily travel patterns and routines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  
                  {/* Question 1: How do you usually commute? */}
                  <FormField
                    control={form.control}
                    name="commuteMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          1. How do you usually commute to and from campus?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="trotro" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Trotro (Public minibus)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="ride-hailing" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Ride-hailing apps (Bolt, Uber, Yango)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="private-car" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Private car
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="walking" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Walking
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="bicycle" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bicycle
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Other
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 2: How many days per week? */}
                  <FormField
                    control={form.control}
                    name="commuteDays"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          2. How many days per week do you commute to campus?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-wrap gap-3"
                          >
                            <FormItem>
                               <RadioGroupItem value="1-2" id="d1-2" className="peer sr-only"/>
                               <Label htmlFor="d1-2" className="rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">1-2 days</Label>
                            </FormItem>
                             <FormItem>
                               <RadioGroupItem value="3-4" id="d3-4" className="peer sr-only"/>
                               <Label htmlFor="d3-4" className="rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">3-4 days</Label>
                            </FormItem>
                             <FormItem>
                               <RadioGroupItem value="5" id="d5" className="peer sr-only"/>
                               <Label htmlFor="d5" className="rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">5 days</Label>
                            </FormItem>
                             <FormItem>
                               <RadioGroupItem value="everyday" id="d-every" className="peer sr-only"/>
                               <Label htmlFor="d-every" className="rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">Everyday</Label>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 3: When do you leave campus? */}
                  <FormField
                    control={form.control}
                    name="leaveTime"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          3. What time do you usually leave campus?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3"
                          >
                           <FormItem>
                               <RadioGroupItem value="morning" id="t-morning" className="peer sr-only"/>
                               <Label htmlFor="t-morning" className="w-full text-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">Morning (6AM-12PM)</Label>
                            </FormItem>
                             <FormItem>
                               <RadioGroupItem value="afternoon" id="t-afternoon" className="peer sr-only"/>
                               <Label htmlFor="t-afternoon" className="w-full text-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">Afternoon (12PM-6PM)</Label>
                            </FormItem>
                             <FormItem>
                               <RadioGroupItem value="evening" id="t-evening" className="peer sr-only"/>
                               <Label htmlFor="t-evening" className="w-full text-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">Evening (6PM-10PM)</Label>
                            </FormItem>
                             <FormItem>
                               <RadioGroupItem value="late-night" id="t-late" className="peer sr-only"/>
                               <Label htmlFor="t-late" className="w-full text-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary px-4 py-2 cursor-pointer">Late night (10PM+)</Label>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Section 2: Current Transport Pain Points */}
            <ScrollAnimation delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Section 2: Current Transport Challenges</CardTitle>
                  <CardDescription>
                    What difficulties do you face with current transport options?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  
                  {/* Question 4: Pain Points Checkbox */}
                  <FormField
                    control={form.control}
                    name="painPoints"
                    render={() => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          4. What frustrates you most about current transport options? (Select all that apply)
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {painPointItems.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="painPoints"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 5: Overcrowding Frequency */}
                  <FormField
                    control={form.control}
                    name="overcrowdingFrequency"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          5. How often do you experience overcrowded vehicles?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="very-often" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Very often (almost every trip)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="often" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Often (most trips)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="sometimes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Sometimes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="rarely" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Rarely
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="never" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Never
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 6: Boarding Stress */}
                  <FormField
                    control={form.control}
                    name="boardingStress"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          6. How stressful is boarding transport for you?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="very-stressful" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Very stressful
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="somewhat-stressful" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Somewhat stressful
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="neutral" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Neutral
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="not-stressful" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Not stressful
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Section 3: Interest in Transport App */}
            <ScrollAnimation delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Section 3: Interest in Smart Transport Solution</CardTitle>
                  <CardDescription>
                    Would a modern transport app service appeal to you?
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  
                  {/* Question 7: Would you use the app? */}
                  <FormField
                    control={form.control}
                    name="useApp"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          7. Would you use a mobile app that shows nearby vehicles, routes, and available seats in real-time?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="definitely-yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Definitely yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="probably-yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Probably yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="not-sure" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Not sure
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="probably-no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Probably no
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="definitely-no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Definitely no
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 8: Seat Availability Importance */}
                  <FormField
                    control={form.control}
                    name="seatAvailabilityImportance"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          8. How important is knowing seat availability before boarding?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="extremely-important" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Extremely important
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="important" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Important
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="neutral" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Neutral
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="not-important" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Not important
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 9: Pre-booking preference */}
                  <FormField
                    control={form.control}
                    name="preBook"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          9. Would you prefer booking a seat a few minutes before the vehicle arrives?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="maybe" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Maybe, depending on the situation
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Section 4: Features Prioritization */}
            <ScrollAnimation delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Section 4: Features Prioritization</CardTitle>
                  <CardDescription>
                    Help us decide which features to build first
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  
                  {/* Question 10: Feature Preferences */}
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          10. Which transport app features interest you most? (Select up to 3)
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {featureItems.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="features"
                              render={({ field: checkboxField }) => {
                                const isChecked = checkboxField.value?.includes(item.id);
                                const isDisabled = !isChecked && checkboxField.value?.length >= 3;
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 has-[:disabled]:opacity-50"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                          const updatedValue = checked
                                            ? [...checkboxField.value, item.id]
                                            : checkboxField.value?.filter((v) => v !== item.id);
                                          checkboxField.onChange(updatedValue);
                                        }}
                                        disabled={isDisabled}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormDescription>
                          Selected: {field.value?.length || 0}/3 features
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 11: Music Appeal */}
                  <FormField
                    control={form.control}
                    name="musicAppeal"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          11. How appealing is background music during trips?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="very-appealing" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Very appealing - would make trips more enjoyable
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="appealing" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Appealing - would be a nice addition
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="neutral" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Neutral - doesn't matter either way
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="not-appealing" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Not appealing - prefer quiet trips
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 12: Music Suggestions */}
                  <FormField
                    control={form.control}
                    name="suggestMusic"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          12. Would you like to suggest music during trips?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes, definitely
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="sometimes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Sometimes, for certain trips
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No, I'd rather listen to my own music
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Section 5: Pricing & Payment */}
            <ScrollAnimation delay={0.5}>
              <Card>
                <CardHeader>
                  <CardTitle>Section 5: Pricing & Payment</CardTitle>
                  <CardDescription>
                    Your thoughts on costs and payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  
                  {/* Question 13: Trip Price */}
                  <FormField
                    control={form.control}
                    name="tripPrice"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          13. How much do you usually pay per trip currently?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="less-than-5" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Less than GH₵5
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="5-10" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                GH₵5 – GH₵10
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="10-15" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                GH₵10 – GH₵15
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="15-plus" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                GH₵15+
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 14: Wallet Usage */}
                  <FormField
                    control={form.control}
                    name="useWallet"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          14. Would you use a prepaid wallet/card for transport payments?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes, it's more convenient and secure
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="maybe" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Maybe, if there are benefits
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No, I prefer cash payments
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 15: Pay for Seat */}
                  <FormField
                    control={form.control}
                    name="payForSeat"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          15. Would you pay slightly more for guaranteed seating and less stress?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes, comfort and reliability are worth extra
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="maybe" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Maybe, depending on the price difference
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No, I prefer the lowest price possible
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Section 6: Pilot Participation */}
            <ScrollAnimation delay={0.6}>
              <Card>
                <CardHeader>
                  <CardTitle>Section 6: Pilot Program Participation</CardTitle>
                  <CardDescription>
                    Be among the first to experience the new service
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  
                  {/* Question 16: Join Pilot */}
                  <FormField
                    control={form.control}
                    name="joinPilot"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          16. Would you like to be part of the pilot program?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes, I want to be an early tester
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="maybe" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Maybe, I need more information
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No, I prefer to wait for the full release
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 17: Early Access */}
                  <FormField
                    control={form.control}
                    name="earlyAccess"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          17. Would you like early access when the app launches?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes, sign me up for early access
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No, I'll wait for general availability
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 18: Recommendation */}
                  <FormField
                    control={form.control}
                    name="recommend"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">
                          18. Would you recommend this service to friends if it works as described?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="definitely" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Definitely, I'd be excited to share it
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="probably" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Probably, if it solves my transport issues
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="not-sure" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Not sure, I'd need to try it first
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <RadioGroupItem value="probably-not" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Probably not
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Your Responses'
                )}
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                By submitting, you agree that your anonymous responses may be used for research and service improvement.
              </p>
            </div>
          </form>
        </Form>
    </div>
    </>
  );
}
