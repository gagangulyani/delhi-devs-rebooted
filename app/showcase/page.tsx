import { Metadata } from "next";
import { Github, ExternalLink, Layers, Plus } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import {
  getAllShowcaseProjects,
  categoryLabels,
  type ShowcaseProject,
} from "@/lib/db/showcase";

export const metadata: Metadata = {
  title: "Community Showcase",
  description:
    "Projects built by Delhi Devs community members. Explore, get inspired, and submit your own.",
};

export default async function ShowcasePage() {
  const projects = await getAllShowcaseProjects();

  const grouped = projects.reduce(
    (acc, project) => {
      if (!acc[project.category]) acc[project.category] = [];
      acc[project.category].push(project);
      return acc;
    },
    {} as Record<string, ShowcaseProject[]>
  );

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
                <Layers className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Community Showcase
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real projects built by Delhi Devs members. From side projects to production
              apps — this is what our community ships.
            </p>

            <div className="mt-6">
              <Button asChild>
                <a
                  href="https://github.com/gagangulyani/delhi-devs-rebooted/issues/new?template=showcase-project.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Plus className="h-4 w-4 mr-2" /> Submit Your Project
                </a>
              </Button>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([category, categoryProjects]) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {categoryLabels[category] ?? category}
                  </h2>
                  <Badge variant="secondary">{categoryProjects.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* How to add */}
        <div className="mt-16 border border-border rounded-2xl p-8 bg-card/60">
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Built something cool?
          </h3>
          <p className="text-muted-foreground mb-4">
            Submit your project by opening a GitHub issue and we&apos;ll add it to the
            showcase. Include the project name, description, tech stack, and GitHub link.
          </p>
          <Button asChild variant="outline">
            <a
              href="https://github.com/gagangulyani/delhi-devs-rebooted/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" /> Open an Issue
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: ShowcaseProject }) {
  return (
    <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300 hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          {project.featured && (
            <Badge className="shrink-0 bg-primary/10 text-primary border-primary/30">
              Featured
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          by{" "}
          <a
            href={`https://github.com/${project.author_github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors font-medium"
          >
            {project.author}
          </a>
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
            <Github className="h-3.5 w-3.5 mr-1.5" /> Code
          </a>
        </Button>
        {project.live_url && (
          <Button asChild size="sm" className="flex-1">
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Live
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
      <Layers className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">No projects yet</h3>
      <p className="text-muted-foreground mb-6">
        Be the first to showcase your project to the Delhi Devs community!
      </p>
      <Button asChild>
        <a
          href="https://github.com/gagangulyani/delhi-devs-rebooted/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Plus className="h-4 w-4 mr-2" /> Submit Your Project
        </a>
      </Button>
    </div>
  );
}
