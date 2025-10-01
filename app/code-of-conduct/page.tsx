import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Users, Heart, Code, MessageCircle } from "lucide-react";
import { BackButton } from "@/components/BackButton";

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <BackButton fallbackUrl="/" />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">Code of Conduct</h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to building an inclusive developer community in Delhi NCR
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Our Pledge */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                <CardTitle>Our Pledge</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We as members, contributors, and leaders pledge to make participation in Delhi Devs Rebooted 
                a harassment-free experience for everyone, regardless of age, body size, visible or invisible 
                disability, ethnicity, sex characteristics, gender identity and expression, level of experience, 
                education, socio-economic status, nationality, personal appearance, race, religion, or sexual 
                identity and orientation.
              </p>
              <p>
                We pledge to act and interact in ways that contribute to an open, welcoming, diverse, 
                inclusive, and healthy community focused on connecting developers across Delhi NCR.
              </p>
            </CardContent>
          </Card>

          {/* Our Standards */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-500" />
                <CardTitle>Our Standards</CardTitle>
              </div>
              <CardDescription>
                Examples of behavior that contributes to a positive environment include:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Demonstrating empathy and kindness toward other people</li>
                <li>Being respectful of differing opinions, viewpoints, and experiences</li>
                <li>Giving and gracefully accepting constructive feedback</li>
                <li>Accepting responsibility and apologizing to those affected by our mistakes</li>
                <li>Focusing on what is best not just for us as individuals, but for the overall community</li>
                <li>Sharing knowledge and helping fellow developers grow</li>
                <li>Promoting collaboration and networking opportunities within Delhi NCR</li>
              </ul>
            </CardContent>
          </Card>

          {/* Unacceptable Behavior */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-orange-500" />
                <CardTitle>Unacceptable Behavior</CardTitle>
              </div>
              <CardDescription>
                Examples of unacceptable behavior include:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>The use of sexualized language or imagery, and sexual attention or advances of any kind</li>
                <li>Trolling, insulting or derogatory comments, and personal or political attacks</li>
                <li>Public or private harassment</li>
                <li>Publishing others' private information without their explicit permission</li>
                <li>Spam, self-promotion without community value, or excessive off-topic discussions</li>
                <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
              </ul>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-green-500" />
                <CardTitle>Delhi Devs Rebooted Community Guidelines</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">🤝 Networking & Collaboration</h4>
                <p className="text-sm text-muted-foreground">
                  We encourage meaningful connections between developers across Delhi NCR. 
                  Share opportunities, collaborate on projects, and help each other grow professionally.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">💻 Technical Discussions</h4>
                <p className="text-sm text-muted-foreground">
                  Keep technical discussions constructive and helpful. When asking for help, provide context. 
                  When helping others, be patient and educational.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">🎯 Stay On Topic</h4>
                <p className="text-sm text-muted-foreground">
                  While we welcome diverse discussions, please keep conversations relevant to technology, 
                  development, and professional growth within the Delhi NCR tech ecosystem.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">📢 Event & Opportunity Sharing</h4>
                <p className="text-sm text-muted-foreground">
                  Share tech events, job opportunities, and learning resources relevant to our community. 
                  Ensure shared opportunities are legitimate and valuable to fellow developers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement */}
          <Card>
            <CardHeader>
              <CardTitle>Enforcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Community leaders are responsible for clarifying and enforcing our standards of acceptable 
                behavior and will take appropriate and fair corrective action in response to any behavior 
                that they deem inappropriate, threatening, offensive, or harmful.
              </p>
              <p>
                Community leaders have the right and responsibility to remove, edit, or reject comments, 
                commits, code, wiki edits, issues, and other contributions that are not aligned to this 
                Code of Conduct, and will communicate reasons for moderation decisions when appropriate.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Reporting Issues:</strong> If you experience or witness unacceptable behavior, 
                  please contact the community administrators immediately. All reports will be handled 
                  with discretion and confidentiality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Attribution */}
          <Card>
            <CardHeader>
              <CardTitle>Attribution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This Code of Conduct is adapted from the{" "}
                <a 
                  href="https://www.contributor-covenant.org/" 
                  className="text-primary hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Contributor Covenant
                </a>, version 2.0, available at{" "}
                <a 
                  href="https://www.contributor-covenant.org/version/2/0/code_of_conduct.html" 
                  className="text-primary hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://www.contributor-covenant.org/version/2/0/code_of_conduct.html
                </a>.
              </p>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center pt-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
            <p className="text-muted-foreground mb-6">
              By joining Delhi Devs Rebooted, you agree to follow this Code of Conduct and help us build 
              an amazing developer community in Delhi NCR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button size="lg" className="w-full sm:w-auto">
                  Apply for Membership
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}