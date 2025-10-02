import { Project } from "@/types/profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { Plus, Code } from "lucide-react";
import { isFeatureEnabled } from "@/constants/features";

interface ProjectsListProps {
  projects: Project[];
  isOwnProfile: boolean;
  profileName?: string;
  onAddProject?: () => void;
  onDeleteProject?: (projectId: string) => void;
}

export function ProjectsList({
  projects,
  isOwnProfile,
  profileName,
  onAddProject,
  onDeleteProject,
}: ProjectsListProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {isOwnProfile ? "Your Projects" : `${profileName || "User"}'s Projects`}
          </CardTitle>
          <CardDescription>
            {isOwnProfile 
              ? "Showcase your work and find collaborators" 
              : "Projects shared by this community member"
            }
          </CardDescription>
        </div>
        {isOwnProfile && onAddProject && isFeatureEnabled('projects') && (
          <Button onClick={onAddProject} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">
              {isOwnProfile ? "No projects yet" : "No projects shared yet"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {isOwnProfile 
                ? "Share your projects to connect with other developers and find potential collaborators"
                : "This community member hasn't shared any projects yet"
              }
            </p>
            {isOwnProfile && onAddProject && isFeatureEnabled('projects') && (
              <Button onClick={onAddProject} size="lg">
                Add Your First Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isOwnProfile={isOwnProfile}
                onDelete={onDeleteProject}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
