import { Metadata } from "next";
import { GitCommit, Star, BookOpen, Users, Trophy, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contributors",
  description: "Meet the people who help build Delhi Devs Rebooted — our open-source contributors.",
};

interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
}

interface ContributorWithStats extends GitHubContributor {
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
}

async function getContributors(): Promise<ContributorWithStats[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/gagangulyani/delhi-devs-rebooted/contributors",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const contributors: GitHubContributor[] = await res.json();

    const withStats = await Promise.all(
      contributors.map(async (c) => {
        try {
          const userRes = await fetch(`https://api.github.com/users/${c.login}`, {
            next: { revalidate: 3600 },
          });
          if (!userRes.ok) return { ...c, name: null, bio: null, public_repos: 0, followers: 0 };
          const user: GitHubUser = await userRes.json();
          return {
            ...c,
            name: user.name,
            bio: user.bio,
            public_repos: user.public_repos,
            followers: user.followers,
          };
        } catch {
          return { ...c, name: null, bio: null, public_repos: 0, followers: 0 };
        }
      })
    );

    return withStats.sort((a, b) => b.contributions - a.contributions);
  } catch {
    return [];
  }
}

const rankColors = [
  "from-yellow-400 to-amber-500",   // 1st
  "from-slate-300 to-slate-400",    // 2nd
  "from-orange-400 to-amber-600",   // 3rd
];

const rankLabels = ["🥇", "🥈", "🥉"];

export default async function ContributorsPage() {
  const contributors = await getContributors();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-6">
            <BackButton fallbackUrl="/" />
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">Contributors</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The amazing people who help build Delhi Devs Rebooted. Every commit counts.
            </p>
          </div>
        </div>

        {contributors.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Could not load contributors at this time. Check back later.</p>
            <Button asChild variant="outline" className="mt-4">
              <a
                href="https://github.com/gagangulyani/delhi-devs-rebooted/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        ) : (
          <>
            {/* Top 3 podium */}
            {contributors.length >= 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {contributors.slice(0, 3).map((contributor, i) => (
                  <a
                    key={contributor.login}
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className={`relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] ${i === 0 ? "border-yellow-400/60 sm:order-2" : i === 1 ? "border-slate-300/60 sm:order-1" : "border-orange-400/60 sm:order-3"}`}>
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${rankColors[i]}`} />
                      <CardContent className="pt-6 pb-4 text-center">
                        <div className="text-2xl mb-2">{rankLabels[i]}</div>
                        <div className="relative w-16 h-16 mx-auto mb-3">
                          <Image
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            fill
                            className="rounded-full object-cover ring-2 ring-border"
                          />
                        </div>
                        <p className="font-bold text-foreground truncate">{contributor.name || contributor.login}</p>
                        <p className="text-xs text-muted-foreground mb-3">@{contributor.login}</p>
                        <div className="flex items-center justify-center gap-1 text-primary font-semibold">
                          <GitCommit className="h-4 w-4" />
                          <span>{contributor.contributions} commits</span>
                        </div>
                        {contributor.bio && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{contributor.bio}</p>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            )}

            {/* Full leaderboard */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground mb-4">All Contributors</h2>
              {contributors.map((contributor, index) => (
                <a
                  key={contributor.login}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card className="hover:shadow-md transition-all duration-200 group-hover:border-primary/40">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-8 text-center font-bold text-muted-foreground text-sm shrink-0">
                          {index < 3 ? rankLabels[index] : `#${index + 1}`}
                        </div>

                        {/* Avatar */}
                        <div className="relative w-10 h-10 shrink-0">
                          <Image
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-foreground truncate">
                              {contributor.name || contributor.login}
                            </p>
                            <span className="text-xs text-muted-foreground">@{contributor.login}</span>
                          </div>
                          {contributor.bio && (
                            <p className="text-sm text-muted-foreground truncate">{contributor.bio}</p>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="hidden sm:flex items-center gap-4 shrink-0 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>{contributor.public_repos}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>{contributor.followers}</span>
                          </div>
                        </div>

                        {/* Commits badge */}
                        <Badge variant="secondary" className="shrink-0 flex items-center gap-1">
                          <GitCommit className="h-3 w-3" />
                          {contributor.contributions}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12 py-8 border-t border-border">
              <p className="text-muted-foreground mb-4">
                Want to see your name here?{" "}
                <Link href="/contribute" className="text-primary hover:underline font-medium">
                  Contribute to the project
                </Link>
                .
              </p>
              <Button asChild variant="outline">
                <a
                  href="https://github.com/gagangulyani/delhi-devs-rebooted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repository on GitHub <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
