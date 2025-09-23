import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const communityLinks = [
    { label: "Join Us", href: "/join", isInternal: true },
    { label: "Code of Conduct", href: "/code-of-conduct", isInternal: true },
    { label: "Events", href: "#", isInternal: false },
    { label: "Resources", href: "#", isInternal: false },
  ];

  const connectLinks = [
    { label: "Discord", href: "#", isInternal: false },
    { label: "Telegram", href: "#", isInternal: false },
    { label: "WhatsApp", href: "#", isInternal: false },
    { label: "Member Portal", href: "/auth", isInternal: true },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Code of Conduct", href: "/code-of-conduct", isInternal: true },
  ];

  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/delhi-devs-rebooted.png"
                alt="Delhi Devs Rebooted"
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-foreground">
                Delhi Devs Rebooted
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Connecting passionate developers across Delhi NCR. Building
              tomorrow's technology through collaboration, learning, and
              community.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Community</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  {link.isInternal ? (
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {connectLinks.map((link, index) => (
                <li key={index}>
                  {link.isInternal ? (
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm text-center md:text-left mb-4 md:mb-0">
            <p>
              &copy; 2025 Delhi Devs Rebooted. Building the future of tech in
              Delhi NCR.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {footerLinks.map((link, index) => (
              <div key={index}>
                {link.isInternal ? (
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}