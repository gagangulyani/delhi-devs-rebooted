import { ArrowRight, Github, ExternalLink, Layers } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeaturedProjects } from "@/data/showcase-projects";

export function ShowcasePreview() {
  const featured = getFeaturedProjects();

  if (featured.length === 0) return null;

  return (
    <section className="py-20 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full inline-flex">
              <Layers className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built by the Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From side projects to production apps — see what Delhi Devs members are
            shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col h-full group hover:shadow-lg transition-all duration-300 hover:border-primary/40"
            >
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
                <p className="text-sm text-muted-foreground">by {project.author}</p>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-border flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5 mr-1.5" /> Code
                  </a>
                </Button>
                {project.liveUrl && (
                  <Button asChild size="sm" className="flex-1">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Live
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/showcase">
            <Button size="lg" variant="outline" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
