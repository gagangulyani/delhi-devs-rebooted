import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "@/lib/profile/schemas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { X } from "lucide-react";

interface AddProjectDialogProps {
  isOpen: boolean;
  form: UseFormReturn<ProjectFormData>;
  techInput: string;
  technologies: string[];
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (values: ProjectFormData) => void;
  onTechInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTechKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTechnology: (tech: string) => void;
}

export function AddProjectDialog({
  isOpen,
  form,
  techInput,
  technologies,
  isLoading,
  onClose,
  onSubmit,
  onTechInputChange,
  onTechKeyDown,
  onRemoveTechnology,
}: AddProjectDialogProps) {
  if (!isOpen) return null;

  const tagColor = "bg-gradient-to-br from-orange-800 via-orange-700 to-orange-600 text-white border border-orange-600 hover:from-orange-700 hover:to-orange-600 shadow-lg";

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>Share your project with the community</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies</FormLabel>
                    <FormControl>
                      <div className="space-y-2 relative">
                        {technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/50 min-h-[2.5rem]">
                            {technologies.map((tech, index) => (
                              <Badge key={index} className={`flex items-center gap-1 ${tagColor}`}>
                                {tech}
                                <button
                                  type="button"
                                  onClick={() => onRemoveTechnology(tech)}      
                                  className="ml-1 hover:bg-black/20 dark:hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="relative">
                          <Input
                            placeholder="Type technology name"
                            value={techInput}
                            onChange={onTechInputChange}
                            onKeyDown={onTechKeyDown}
                            className={technologies.length > 0 ? "mt-2" : ""}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Press comma or Enter to add technology.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="github_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/username/project (required)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="live_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://myproject.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="looking_for_collaborators"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Looking for collaborators
                      </FormLabel>
                      <FormDescription>
                        Let others know if you're open to new team members
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Project"}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
