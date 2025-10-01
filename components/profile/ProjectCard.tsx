import { Project } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Trash2, Users } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isOwnProfile: boolean;
  onDelete?: (projectId: string) => void;
}

export function ProjectCard({ project, isOwnProfile, onDelete }: ProjectCardProps) {
  const tagColor = "bg-gradient-to-br from-orange-800 via-orange-700 to-orange-600 text-white border border-orange-600 hover:from-orange-700 hover:to-orange-600 shadow-lg";

  return (
    <Card className="relative">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {project.description}
            </p>
            {project.technologies && (
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} className={`text-xs ${tagColor}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {isOwnProfile && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(project.id)}
              className="text-destructive hover:text-destructive ml-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {project.github_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
          )}
          {project.live_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live
              </a>
            </Button>
          )}
          {project.looking_for_collaborators && (
            <Badge variant="default" className="ml-auto">
              <Users className="h-3 w-3 mr-1" />
              Seeking Collaborators
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
