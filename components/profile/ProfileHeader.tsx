import React from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserProfile } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Mail, Github, Linkedin, Twitter, Globe } from "lucide-react";

interface ProfileHeaderProps {
  user: SupabaseUser | null;
  profile: UserProfile | null;
}

export const ProfileHeader = React.memo(function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="text-lg">
              {profile?.display_name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || user?.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold">
              {profile?.display_name ||
                user?.email?.split("@")[0] ||
                "Your Name"}
            </h1>
            {profile?.job_title && (
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {profile.job_title}
                {profile.company && (
                  <span className="font-medium">
                    at {profile.company}
                  </span>
                )}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {profile?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              )}
              {user?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {profile?.bio && (
          <p className="mt-6 text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>
        )}

        {/* Social Links */}
        {(profile?.github_url ||
          profile?.linkedin_url ||
          profile?.twitter_url ||
          profile?.website_url) && (
          <div className="flex flex-wrap gap-2 mt-6">
            {profile?.github_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
            {profile?.linkedin_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            )}
            {profile?.twitter_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </Button>
            )}
            {profile?.website_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={profile.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});
