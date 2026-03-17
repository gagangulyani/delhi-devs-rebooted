import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitBranch, Bug, Lightbulb, Code2, ExternalLink, CheckCircle2 } from "lucide-react";
import { BackButton } from "@/components/BackButton";

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-6">
            <BackButton fallbackUrl="/" />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">Contribute</h1>
            <p className="text-xl text-muted-foreground">
              Help build Delhi Devs Rebooted. Open source, community driven.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <GitBranch className="h-6 w-6 text-primary" />
                <CardTitle>Get Started</CardTitle>
              </div>
              <CardDescription>
                The Delhi Devs Rebooted website is open source. Here&apos;s how you can contribute.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium">Fork the Repository</h4>
                  <p className="text-sm text-muted-foreground">
                    Head over to{" "}
                    <a 
                      href="https://github.com/gagangulyani/delhi-devs-rebooted" 
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub <ExternalLink className="h-3 w-3 inline" />
                    </a>{" "}
                    and fork the repository to your own account.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium">Clone Locally</h4>
                  <code className="block bg-muted p-2 rounded text-sm mt-1 overflow-x-auto">
                    git clone https://github.com/[your-username]/delhi-devs-rebooted.git
                  </code>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium">Create a Branch</h4>
                  <code className="block bg-muted p-2 rounded text-sm mt-1">
                    git checkout -b feature/your-feature-name
                  </code>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium">Make Changes & Push</h4>
                  <p className="text-sm text-muted-foreground">
                    Make your changes, commit with clear messages, and push to your fork.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium">Open a Pull Request</h4>
                  <p className="text-sm text-muted-foreground">
                    Submit a PR describing your changes. We&apos;ll review and merge if everything looks good.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Bug className="h-6 w-6 text-orange-500" />
                <CardTitle>Report Issues</CardTitle>
              </div>
              <CardDescription>
                Found a bug? Something not working as expected? Let us know.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Open an issue on GitHub with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>Clear description of the problem</li>
                <li>Steps to reproduce</li>
                <li>Expected vs actual behavior</li>
                <li>Screenshots if applicable</li>
                <li>Browser/device information if relevant</li>
              </ul>
              <Button asChild variant="outline" className="mt-4">
                <a 
                  href="https://github.com/gagangulyani/delhi-devs-rebooted/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open an Issue <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                <CardTitle>Suggest Features</CardTitle>
              </div>
              <CardDescription>
                Have an idea to improve the website? We&apos;d love to hear it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Feature requests are welcome. When suggesting:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>Describe the feature clearly</li>
                <li>Explain the use case and who benefits</li>
                <li>Share any mockups or examples if you have them</li>
                <li>Be open to discussion and feedback</li>
              </ul>
              <Button asChild variant="outline" className="mt-4">
                <a 
                  href="https://github.com/gagangulyani/delhi-devs-rebooted/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Suggest a Feature <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Good First Issues</CardTitle>
              <CardDescription>
                New to contributing? Look for issues labeled &quot;good first issue&quot; to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                These are smaller tasks designed for first-time contributors. Great way to get familiar 
                with the codebase and contribution process.
              </p>
              <Button asChild>
                <a 
                  href="https://github.com/gagangulyani/delhi-devs-rebooted/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find Good First Issues <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contribution Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Code Style</h4>
                <p className="text-sm text-muted-foreground">
                  Follow the existing code style. Run the linter before submitting:{" "}
                  <code className="bg-muted px-1 rounded">bun run lint</code> or{" "}
                  <code className="bg-muted px-1 rounded">npm run lint</code>
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Commit Messages</h4>
                <p className="text-sm text-muted-foreground">
                  Write clear, descriptive commit messages. Reference issue numbers when applicable.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Testing</h4>
                <p className="text-sm text-muted-foreground">
                  Test your changes locally before submitting. Make sure existing functionality still works.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Be Respectful</h4>
                <p className="text-sm text-muted-foreground">
                  Follow our{" "}
                  <Link href="/code-of-conduct" className="text-primary hover:underline">
                    Code of Conduct
                  </Link>
                  . Be kind, patient, and constructive in all interactions.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Contribute?</h3>
            <p className="text-muted-foreground mb-6">
              Every contribution matters. Whether it&apos;s fixing a typo, adding a feature, 
              or reporting a bug, you&apos;re helping build something for the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a 
                  href="https://github.com/gagangulyani/delhi-devs-rebooted" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repository <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}