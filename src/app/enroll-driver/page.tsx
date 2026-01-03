
'use client';

import { Bus, Check, Flag, MapPin, Music, Ticket, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { cn } from '@/lib/utils';
import Link from 'next/link';


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
                Take the first step towards a flexible and rewarding driving career.
              </p>
            </header>
          </ScrollAnimation>
    
          <ScrollAnimation delay={0.1}>
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-6">Registration Has Not Yet Started</h2>
                <p className="text-muted-foreground mb-8">
                    We are not yet accepting driver applications, but please check back soon for updates!
                </p>
                <Button asChild size="lg">
                    <Link href="/">
                        <Home className="mr-2 h-5 w-5" />
                        Return to Homepage
                    </Link>
                </Button>
            </div>
          </ScrollAnimation>
        </div>
    </div>
  );
}
