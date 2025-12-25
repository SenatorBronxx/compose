
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Bus, Check, Flag, MapPin, Music, Ticket } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';

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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { cn } from '@/lib/utils';
import { useFirestore } from '@/firebase';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  licenseNumber: z.string().min(1, {
    message: 'License number is required.',
  }),
  ghanaCardNumber: z.string().min(1, {
    message: 'Ghana Card number is required.',
  }),
  certificate: z.any().optional(),
});

const backgroundIcons = [
    { icon: Music, className: "top-[15%] left-[20%]" },
    { icon: Flag, className: "top-[25%] left-[5%]" },
    { icon: MapPin, className: "top-[40%] left-[25%]" },
    { icon: Bus, className: "top-[10%] left-[45%]" },
    { icon: Check, className: "top-[30%] left-[50%]" },
    { icon: Ticket, className: "top-[50%] left-[10%]" },
    { icon: Bus, className: "top-[5%] right-[20%]" },
    { icon: Music, className: "top-[20%] right-[10%]" },
    { icon: MapPin, className: "top-[35%] right-[25%]" },
    { icon: Flag, className: "top-[55%] right-[5%]" },
    { icon: Ticket, className: "top-[70%] right-[20%]" },
    { icon: Check, className: "top-[85%] right-[15%]" },
    { icon: Bus, className: "bottom-[5%] left-[40%]" },
    { icon: Music, className: "bottom-[15%] left-[15%]" },
    { icon: MapPin, className: "bottom-[20%] right-[30%]" },
    { icon: Flag, className: "bottom-[10%] right-[50%]" },
];

export default function EnrollDriverPage() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      licenseNumber: '',
      ghanaCardNumber: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Database not available. Please try again later.',
        });
        return;
    }
    
    try {
        const { certificate, ...applicationData } = values;
        // In a real application, you would handle file uploads separately, e.g., to Firebase Storage
        await addDoc(collection(firestore, 'driver-applications'), applicationData);

        toast({
            title: 'Application Submitted!',
            description: 'Thank you for your interest. We will review your application and get back to you soon.',
        });
        form.reset();
    } catch (error) {
        console.error("Error submitting application:", error);
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Could not submit your application. Please try again.',
        });
    }
  }

  return (
    <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
            {backgroundIcons.map((item, index) => {
                const Icon = item.icon;
                return (
                    <Icon
                        key={index}
                        className={cn(
                            "absolute text-foreground/50 transform -translate-x-1/2 -translate-y-1/2",
                            "h-12 w-12 md:h-16 md:w-16",
                            item.className
                        )}
                    />
                );
            })}
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <ScrollAnimation>
            <header className="text-center mb-16">
              <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
                Enroll as an ERITAS Driver
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Take the first step towards a flexible and rewarding driving career. Fill out the form below to get started.
              </p>
            </header>
          </ScrollAnimation>
    
          <ScrollAnimation delay={0.1}>
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver's License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="B1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ghanaCardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghana Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="GHA-123456789-0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="certificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary School Certificate</FormLabel>
                        <FormControl>
                          <Input type="file" {...form.register('certificate')} />
                        </FormControl>
                        <FormDescription>
                          This is optional. Please upload a PDF, PNG, or JPG file.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </Form>
            </div>
          </ScrollAnimation>
        </div>
    </div>
  );
}
