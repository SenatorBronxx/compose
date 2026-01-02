
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bell, Car, Check, CheckCircle, Flag, Map, MapPin, Music, Star, Ticket, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const passengerFeatures = [
    { icon: <Map className="h-6 w-6" />, text: "Real-Time Tracking" },
    { icon: <CheckCircle className="h-6 w-6" />, text: "Effortless Booking" },
    { icon: <CreditCard className="h-6 w-6" />, text: "Cashless Payments" },
    { icon: <Bell className="h-6 w-6" />, text: "Ride Notifications" },
    { icon: <Star className="h-6 w-6" />, text: "Driver Ratings" },
    { icon: <User className="h-6 w-6" />, text: "Profile Management" },
];
  
const driverFeatures = [
    { icon: <Car className="h-6 w-6" />, text: "Accept Ride Requests" },
    { icon: <Map className="h-6 w-6" />, text: "Turn-by-Turn Navigation" },
    { icon: <DollarSign className="h-6 w-6" />, text: "Earnings Tracker" },
    { icon: <BarChart className="h-6 w-6" />, text: "Performance Analytics" },
    { icon: <Clock className="h-6 w-6" />, text: "Flexible Hours" },
    { icon: <HelpCircle className="h-6 w-6" />, text: "24/7 Support" },
];

const backgroundIcons = [
    { icon: Music, className: "top-[15%] left-[20%]" },
    { icon: Flag, className: "top-[25%] left-[5%]" },
    { icon: MapPin, className: "top-[40%] left-[25%]" },
    { icon: Car, className: "top-[10%] left-[45%]" },
    { icon: Check, className: "top-[30%] left-[50%]" },
    { icon: Ticket, className: "top-[50%] left-[10%]" },
    { icon: Car, className: "top-[5%] right-[20%]" },
    { icon: Music, className: "top-[20%] right-[10%]" },
    { icon: MapPin, className: "top-[35%] right-[25%]" },
    { icon: Flag, className: "top-[55%] right-[5%]" },
    { icon: Ticket, className: "top-[70%] right-[20%]" },
    { icon: Check, className: "top-[85%] right-[15%]" },
    { icon: Car, className: "bottom-[5%] left-[40%]" },
    { icon: Music, className: "bottom-[15%] left-[15%]" },
    { icon: MapPin, className: "bottom-[20%] right-[30%]" },
    { icon: Flag, className: "bottom-[10%] right-[50%]" },
];

function CreditCard({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    )
}

function DollarSign({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
}

function BarChart({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
    )
}

function Clock({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    )
}

function HelpCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
    )
}
  
export default function MobileAppPage() {
    const passengerAppImage = PlaceHolderImages.find((img) => img.id === "passenger-app-mockup");
    const driverAppImage = PlaceHolderImages.find((img) => img.id === "driver-app-mockup");

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
            <header className="text-center mb-12">
              <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">The ERITAS App</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                One platform, two experiences. Powerful tools for both passengers and drivers, right at your fingertips.
              </p>
            </header>
          </ScrollAnimation>
    
          <ScrollAnimation>
            <div className="bg-accent text-accent-foreground rounded-lg p-6 md:p-8 text-center mb-16">
                <h2 className="font-headline text-3xl font-bold mb-2">Coming Soon!</h2>
                <p className="text-lg">Our mobile apps are under development and will be launching with our pilot program.</p>
            </div>
          </ScrollAnimation>
    
    
          <ScrollAnimation>
            <Tabs defaultValue="passenger" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="passenger">Passenger App</TabsTrigger>
                <TabsTrigger value="driver">Driver App</TabsTrigger>
              </TabsList>
              <TabsContent value="passenger">
                  <Card className="mt-6 border-0 shadow-none bg-transparent">
                      <CardContent className="p-0 md:p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                              {passengerAppImage && (
                                  <ScrollAnimation className="flex justify-center">
                                      <Image
                                          src={passengerAppImage.imageUrl}
                                          alt={passengerAppImage.description}
                                          width={300}
                                          height={600}
                                          className="object-contain"
                                          data-ai-hint={passengerAppImage.imageHint}
                                      />
                                  </ScrollAnimation>
                              )}
                              <ScrollAnimation className="lg:col-span-2" delay={0.1}>
                                  <h2 className="font-headline text-3xl font-bold mb-4">Travel Smarter</h2>
                                  <p className="text-muted-foreground text-lg mb-8">
                                      Our passenger app is designed for convenience, safety, and a seamless travel experience from start to finish.
                                  </p>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                      {passengerFeatures.map((feature, index) => (
                                          <div key={index} className="flex items-center gap-3">
                                              <div className="text-primary">{feature.icon}</div>
                                              <span className="font-medium">{feature.text}</span>
                                          </div>
                                      ))}
                                  </div>
                              </ScrollAnimation>
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="driver">
                  <Card className="mt-6 border-0 shadow-none bg-transparent">
                      <CardContent className="p-0 md:p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                               {driverAppImage && (
                                  <ScrollAnimation className="flex justify-center lg:order-last">
                                      <Image
                                          src={driverAppImage.imageUrl}
                                          alt={driverAppImage.description}
                                          width={300}
                                          height={600}
                                          className="object-contain"
                                          data-ai-hint={driverAppImage.imageHint}
                                      />
                                  </ScrollAnimation>
                              )}
                              <ScrollAnimation className="lg:col-span-2" delay={0.1}>
                                  <h2 className="font-headline text-3xl font-bold mb-4">Earn on Your Terms</h2>
                                  <p className="text-muted-foreground text-lg mb-8">
                                      The driver app provides all the tools you need to manage your rides, track earnings, and get support.
                                  </p>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                      {driverFeatures.map((feature, index) => (
                                          <div key={index} className="flex items-center gap-3">
                                              <div className="text-primary">{feature.icon}</div>
                                              <span className="font-medium">{feature.text}</span>
                                          </div>
                                      ))}
                                  </div>
                              </ScrollAnimation>
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>
            </Tabs>
          </ScrollAnimation>
        </div>
    </div>
  );
}
