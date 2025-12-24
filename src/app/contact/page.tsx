"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export default function ContactPage() {
  const { toast } = useToast();
  const contactImage = PlaceHolderImages.find((img) => img.id === "contact-page-image");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions or want to get involved? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-card p-8 rounded-lg">
          <h2 className="font-headline text-2xl font-bold mb-6">Send us a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us how we can help..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </div>

        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold">Contact Information</h3>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary"/>
                    <span>pilot-program@eritas.co</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary"/>
                    <span>Main University Campus Hub</span>
                </div>
                
                <h3 className="font-headline text-2xl font-bold pt-6">Follow Us</h3>
                <div className="flex space-x-2">
                    {socialLinks.map((social) => (
                        <Button key={social.name} variant="outline" size="icon" asChild>
                            <a href={social.href} aria-label={social.name}>
                                <social.icon className="h-5 w-5" />
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
             {contactImage && (
                 <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                    <Image
                        src={contactImage.imageUrl}
                        alt={contactImage.description}
                        width={800}
                        height={600}
                        className="object-cover w-full"
                        data-ai-hint={contactImage.imageHint}
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
