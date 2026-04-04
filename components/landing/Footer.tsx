import { Linkedin, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-foreground">Delhi Devs Rebooted</span>
            <span className="text-muted-foreground">© 2025</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://twitter.com/delhidevs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter/X"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/company/delhi-devs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/gagangulyani/delhi-devs-rebooted" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}