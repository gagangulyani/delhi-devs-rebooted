import { Metadata } from "next";
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  MapPin,
  Users,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { communityMembers, openToLabels } from "@/data/members";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Community Members",
  description:
    "Meet the developers of Delhi Devs Rebooted. Explore member profiles and connect with the community.",
};

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-6">
            <BackButton fallbackUrl="/" />
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Community Members
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Developers, designers, and makers from Delhi NCR and beyond.
              Connect, collaborate, and build together.
            </p>
            <div className="mt-6">
              <Button asChild>
                <a
                  href="https://github.com/gagangulyani/delhi-devs-rebooted/edit/main/data/members.ts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Your Profile
                </a>
              </Button>
            </div>
          </div>
        </div>

        {communityMembers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {/* How to add yourself */}
        <div className="mt-16 border border-border rounded-2xl p-8 bg-card/60">
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Want your profile here?
          </h3>
          <p className="text-muted-foreground mb-4">
            Add yourself by editing{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
              data/members.ts
            </code>{" "}
            and opening a pull request. Your profile will go live once merged.
          </p>
          <Button asChild variant="outline">
            <a
              href="https://github.com/gagangulyani/delhi-devs-rebooted"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" /> Open a PR on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: (typeof communityMembers)[0] }) {
  const avatarUrl = member.githubUsername
    ? `https://github.com/${member.githubUsername}.png`
    : null;

  return (
    <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300 hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative w-14 h-14 shrink-0">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={member.name}
                fill
                className="rounded-full object-cover ring-2 ring-border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-border">
                <span className="text-xl font-bold text-primary">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Name & title */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground leading-tight">
                {member.name}
              </h3>
              {member.featured && (
                <Badge className="text-xs bg-primary/10 text-primary border-primary/30">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-tight mt-0.5">
              {member.title}
            </p>
            {member.location && (
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {member.location}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

        {/* Skills */}
        {member.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {member.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Open to */}
        {member.openTo.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {member.openTo.map((status) => (
              <Badge
                key={status}
                className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"
              >
                {openToLabels[status]}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-border flex gap-2 flex-wrap">
        {member.githubUsername && (
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a
              href={`https://github.com/${member.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
        )}
        {member.linkedinUrl && (
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </Button>
        )}
        {member.twitterHandle && (
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a
              href={`https://twitter.com/${member.twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-3.5 w-3.5" />
              Twitter
            </a>
          </Button>
        )}
        {member.portfolioUrl && (
          <Button asChild size="sm" className="gap-1.5">
            <a href={member.portfolioUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Portfolio
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <Users className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No profiles yet
      </h3>
      <p className="text-muted-foreground mb-6">
        Be the first to add your profile to the Delhi Devs member directory!
      </p>
      <Button asChild>
        <a
          href="https://github.com/gagangulyani/delhi-devs-rebooted"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Your Profile
        </a>
      </Button>
    </div>
  );
}
