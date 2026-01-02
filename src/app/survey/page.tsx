
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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

const surveySchema = z.object({
  // Section 1
  commuteMethod: z.string({ required_error: 'Please select an option.' }),
  commuteDays: z.string({ required_error: 'Please select an option.' }),
  leaveTime: z.string({ required_error: 'Please select an option.' }),
  // Section 2
  painPoints: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  overcrowdingFrequency: z.string({
    required_error: 'Please select an option.',
  }),
  boardingStress: z.string({ required_error: 'Please select an option.' }),
  // Section 3
  useApp: z.string({ required_error: 'Please select an option.' }),
  seatAvailabilityImportance: z.string({
    required_error: 'Please select an option.',
  }),
  preBook: z.string({ required_error: 'Please select an option.' }),
  // Section 4
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }).refine((value) => value.length <= 3, {
    message: 'You can select a maximum of 3 features.'
  }),
  musicAppeal: z.string({ required_error: 'Please select an option.' }),
  suggestMusic: z.string({ required_error: 'Please select an option.' }),
  // Section 5
  tripPrice: z.string({ required_error: 'Please select an option.' }),
  useWallet: z.string({ required_error: 'Please select an option.' }),
  payForSeat: z.string({ required_error: 'Please select an option.' }),
  // Section 6
  joinPilot: z.string({ required_error: 'Please select an option.' }),
  earlyAccess: z.string({ required_error: 'Please select an option.' }),
  recommend: z.string({ required_error: 'Please select an option.' }),
});

const painPointItems = [
    { id: 'waiting', label: 'Long waiting times' },
    { id: 'overcrowding', label: 'Overcrowding' },
    { id: 'fares', label: 'Unpredictable fares' },
    { id: 'no-seat', label: 'No seat availability' },
    { id: 'boarding', label: 'Stressful boarding' },
    { id: 'safety', label: 'Safety concerns' },
    { id: 'comfort', label: 'Poor comfort' },
]

const featureItems = [
    { id: 'tracking', label: 'Live bus tracking' },
    { id: 'reservation', label: 'Seat reservation' },
    { id: 'cashless', label: 'Cashless payment (wallet)' },
    { id: 'route-preview', label: 'Route & stop preview' },
    { id: 'eta', label: 'Estimated arrival times' },
    { id: 'music', label: 'Music during trips' },
    { id: 'verification', label: 'Safety & driver verification' },
]

export default function SurveyPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
        painPoints: [],
        features: [],
    },
  });

  function onSubmit(data: z.infer<typeof surveySchema>) {
    console.log(data);
    toast({
      title: 'Survey Submitted!',
      description: 'Thank you for your valuable feedback.',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <ScrollAnimation>
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Student Transport Survey</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us improve your commute! Your feedback will shape the future of transport at our university.
          </p>
        </header>
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            {/* Section 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Section 1: Commuting Habits</CardTitle>
                <CardDescription>Tell us about your current travel patterns.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="commuteMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How do you usually commute to and from campus?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="trotro" /></FormControl>
                            <FormLabel className="font-normal">Trotro</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="ride-hailing" /></FormControl>
                            <FormLabel className="font-normal">Ride-hailing (Bolt / Uber / Yango)</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="private-car" /></FormControl>
                            <FormLabel className="font-normal">Private car</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="walking" /></FormControl>
                            <FormLabel className="font-normal">Walking</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="school-shuttle" /></FormControl>
                            <FormLabel className="font-normal">School shuttle</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="other" /></FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="commuteDays"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How many days per week do you commute to campus?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="1-2" /></FormControl>
                            <FormLabel className="font-normal">1-2 days</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="3-4" /></FormControl>
                            <FormLabel className="font-normal">3-4 days</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="5" /></FormControl>
                            <FormLabel className="font-normal">5 days</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="everyday" /></FormControl>
                            <FormLabel className="font-normal">Everyday</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="leaveTime"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>What time do you usually leave campus?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="morning" /></FormControl>
                            <FormLabel className="font-normal">Morning</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="afternoon" /></FormControl>
                            <FormLabel className="font-normal">Afternoon</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="evening" /></FormControl>
                            <FormLabel className="font-normal">Evening</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="late-night" /></FormControl>
                            <FormLabel className="font-normal">Late night</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Section 2: Current Transport Pain Points</CardTitle>
                <CardDescription>What are the biggest challenges you face?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <FormField
                  control={form.control}
                  name="painPoints"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">What frustrates you most about current transport options? (Select all that apply)</FormLabel>
                      </div>
                      {painPointItems.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="painPoints"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
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
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="overcrowdingFrequency"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How often do you experience overcrowded vehicles?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="very-often" /></FormControl>
                            <FormLabel className="font-normal">Very often</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="often" /></FormControl>
                            <FormLabel className="font-normal">Often</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="sometimes" /></FormControl>
                            <FormLabel className="font-normal">Sometimes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="rarely" /></FormControl>
                            <FormLabel className="font-normal">Rarely</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="never" /></FormControl>
                            <FormLabel className="font-normal">Never</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="boardingStress"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Would you say boarding transport is stressful?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="very-stressful" /></FormControl>
                            <FormLabel className="font-normal">Very stressful</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="somewhat-stressful" /></FormControl>
                            <FormLabel className="font-normal">Somewhat stressful</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="neutral" /></FormControl>
                            <FormLabel className="font-normal">Neutral</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="not-stressful" /></FormControl>
                            <FormLabel className="font-normal">Not stressful</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            {/* Section 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Section 3: Interest in ERITAS (Market Fit)</CardTitle>
                <CardDescription>Would a service like ERITAS appeal to you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <FormField
                  control={form.control}
                  name="useApp"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Would you use a mobile app that shows nearby buses, routes, and available seats?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="definitely-yes" /></FormControl>
                            <FormLabel className="font-normal">Definitely yes</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="probably-yes" /></FormControl>
                            <FormLabel className="font-normal">Probably yes</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="not-sure" /></FormControl>
                            <FormLabel className="font-normal">Not sure</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="probably-no" /></FormControl>
                            <FormLabel className="font-normal">Probably no</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="definitely-no" /></FormControl>
                            <FormLabel className="font-normal">Definitely no</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="seatAvailabilityImportance"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>How important is knowing seat availability before boarding?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="extremely-important" /></FormControl>
                            <FormLabel className="font-normal">Extremely important</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="important" /></FormControl>
                            <FormLabel className="font-normal">Important</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="neutral" /></FormControl>
                            <FormLabel className="font-normal">Neutral</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="not-important" /></FormControl>
                            <FormLabel className="font-normal">Not important</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="preBook"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Would you prefer booking a seat a few minutes before the bus arrives?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="yes" /></FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="maybe" /></FormControl>
                            <FormLabel className="font-normal">Maybe</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="no" /></FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

             {/* Section 4 */}
            <Card>
                <CardHeader>
                    <CardTitle>Section 4: Features Prioritization</CardTitle>
                    <CardDescription>Help us decide what to build first.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <FormField
                        control={form.control}
                        name="features"
                        render={() => (
                            <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Which ERITAS features interest you most? (Select up to 3)</FormLabel>
                            </div>
                            {featureItems.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="features"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
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
                                    )
                                }}
                                />
                            ))}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="musicAppeal"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>How appealing is music during bus trips?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="very-appealing" /></FormControl>
                                    <FormLabel className="font-normal">Very appealing</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="appealing" /></FormControl>
                                    <FormLabel className="font-normal">Appealing</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="neutral" /></FormControl>
                                    <FormLabel className="font-normal">Neutral</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="not-appealing" /></FormControl>
                                    <FormLabel className="font-normal">Not appealing</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="suggestMusic"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Would you like to suggest music during trips?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="sometimes" /></FormControl>
                                    <FormLabel className="font-normal">Sometimes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </CardContent>
            </Card>

            {/* Section 5 */}
            <Card>
                <CardHeader>
                    <CardTitle>Section 5: Pricing & Payment Insights</CardTitle>
                    <CardDescription>Your thoughts on cost and payments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     <FormField
                        control={form.control}
                        name="tripPrice"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>How much do you usually pay per trip?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="less-than-5" /></FormControl>
                                    <FormLabel className="font-normal">Less than GH₵5</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="5-10" /></FormControl>
                                    <FormLabel className="font-normal">GH₵5–10</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="10-15" /></FormControl>
                                    <FormLabel className="font-normal">GH₵10–15</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="15-plus" /></FormControl>
                                    <FormLabel className="font-normal">GH₵15+</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="useWallet"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Would you use a prepaid wallet for transport?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="maybe" /></FormControl>
                                    <FormLabel className="font-normal">Maybe</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="payForSeat"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Would you pay slightly more for guaranteed seating & less stress?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="maybe" /></FormControl>
                                    <FormLabel className="font-normal">Maybe</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </CardContent>
            </Card>

            {/* Section 6 */}
            <Card>
                <CardHeader>
                    <CardTitle>Section 6: Pilot Participation</CardTitle>
                    <CardDescription>Let us know if you want to be an early adopter.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     <FormField
                        control={form.control}
                        name="joinPilot"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Would you like to be part of the ERITAS pilot program?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="maybe" /></FormControl>
                                    <FormLabel className="font-normal">Maybe</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="earlyAccess"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Would you like early access when the app launches?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="recommend"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Would you recommend ERITAS to friends if it works as described?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="definitely" /></FormControl>
                                    <FormLabel className="font-normal">Definitely</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="probably" /></FormControl>
                                    <FormLabel className="font-normal">Probably</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="not-sure" /></FormControl>
                                    <FormLabel className="font-normal">Not sure</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="probably-not" /></FormControl>
                                    <FormLabel className="font-normal">Probably not</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </CardContent>
            </Card>


            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </Button>
          </form>
        </Form>
      </ScrollAnimation>
    </div>
  );
}
