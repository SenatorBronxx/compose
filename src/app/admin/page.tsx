"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BarChart, CreditCard, LayoutDashboard, Truck, Users } from "lucide-react";
import Image from "next/image";
import { Bar, CartesianGrid, XAxis, YAxis, BarChart as RechartsBarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", rides: 186 },
    { month: "February", rides: 305 },
    { month: "March", rides: 237 },
    { month: "April", rides: 73 },
    { month: "May", rides: 209 },
    { month: "June", rides: 214 },
  ]
  
const chartConfig = {
    rides: {
      label: "Rides",
      color: "hsl(var(--primary))",
    },
}

const kpis = [
    {
        icon: <Truck className="h-6 w-6 text-muted-foreground" />,
        title: "Active Vehicles",
        value: "25",
        description: "Vehicles currently in operation",
    },
    {
        icon: <Users className="h-6 w-6 text-muted-foreground" />,
        title: "Active Riders",
        value: "1,204",
        description: "Users who booked a ride this month",
    },
    {
        icon: <BarChart className="h-6 w-6 text-muted-foreground" />,
        title: "Total Rides Today",
        value: "482",
        description: "Completed rides since midnight",
    },
    {
        icon: <CreditCard className="h-6 w-6 text-muted-foreground" />,
        title: "Revenue (MTD)",
        value: "$12,450",
        description: "Total transaction volume this month",
    },
]

export default function AdminPage() {
    const dashboardImage = PlaceHolderImages.find((img) => img.id === "dashboard-mockup");

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Operations Dashboard</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          A high-level overview of the ERITAS smart transit system.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpis.map((kpi) => (
             <Card key={kpi.title}>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
               {kpi.icon}
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{kpi.value}</div>
               <p className="text-xs text-muted-foreground">
                 {kpi.description}
               </p>
             </CardContent>
           </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ridership Analytics</CardTitle>
                    <CardDescription>Monthly ride volume for the current semester.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <RechartsBarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="rides" fill="var(--color-rides)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><LayoutDashboard /> System Overview</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground">The admin panel provides tools for:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                        <li>Real-time fleet tracking and management.</li>
                        <li>Driver onboarding and credential verification.</li>
                        <li>Secure payment processing and reporting.</li>
                        <li>Ridership analytics and demand forecasting.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </section>
      
      {dashboardImage && (
        <section className="mt-12">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">Fleet Management Interface</h2>
            <Card>
                <CardContent className="p-0">
                    <Image
                        src={dashboardImage.imageUrl}
                        alt={dashboardImage.description}
                        width={1200}
                        height={750}
                        className="rounded-lg object-cover w-full"
                        data-ai-hint={dashboardImage.imageHint}
                    />
                </CardContent>
            </Card>
        </section>
      )}
    </div>
  );
}
