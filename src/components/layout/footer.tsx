import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/drivers", label: "Drivers" },
    { href: "/pilot-program", label: "Pilot" },
    { href: "/contact", label: "Contact" },
  ];

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
]


export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="https://img.sanishtech.com/u/a26c366da4c6547e1d08ef12436d9afe.png" alt="ERITAS Logo" width={40} height={40} />
            </Link>
            <p className="text-sm text-muted-foreground">The future of university transit.</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                    <a href={social.href} aria-label={social.name}>
                        <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                    </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ERITAS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
