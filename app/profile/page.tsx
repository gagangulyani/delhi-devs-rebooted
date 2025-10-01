"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  FileText,
  Calendar,
  Users,
  Eye,
  Settings,
  PenTool,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Code,
  Star,
  User,
  Shield,
  Bell,
  Palette,
  Key,
  X,
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

const profileSchema = z.object({
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z.string().optional(),
  job_title: z.string().optional(),
  company: z.string().optional(),
  github_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  linkedin_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  twitter_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  website_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.string(),
  github_url: z
    .string()
    .min(1, "GitHub URL is required")
    .url("Must be a valid GitHub URL")
    .refine((url) => url.includes('github.com'), "Must be a GitHub URL"),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  looking_for_collaborators: z.boolean(),
});

type ProfileData = z.infer<typeof profileSchema>;
type ProjectData = z.infer<typeof projectSchema>;

interface UserProfile {
  id: string;
  display_name: string;
  bio?: string;
  location?: string;
  job_title?: string;
  company?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  avatar_url?: string;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  looking_for_collaborators: boolean;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsSection, setSettingsSection] = useState("profile");
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const technologySuggestions = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin",
    "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte", "Ember.js", "Backbone.js",
    "Node.js", "Express.js", "Django", "Flask", "FastAPI", "Spring Boot", "Ruby on Rails",
    "Laravel", "Symfony", "ASP.NET", "NestJS", "GraphQL", "REST API", "WebSocket",
    "HTML", "CSS", "Sass", "SCSS", "Tailwind CSS", "Bootstrap", "Material-UI", "Chakra UI",
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase", "Supabase", "Prisma",
    "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "Heroku",
    "Git", "GitHub", "GitLab", "Bitbucket", "Webpack", "Vite", "Parcel", "Babel",
    "Jest", "Cypress", "Playwright", "Selenium", "Mocha", "Chai", "Testing Library",
    "Figma", "Adobe XD", "Sketch", "InVision", "Zeplin", "Storybook",
    "Linux", "macOS", "Windows", "Ubuntu", "CentOS", "Debian", "Arch Linux",
    "Apache", "Nginx", "IIS", "Caddy", "Traefik", "HAProxy",
    "Elasticsearch", "Logstash", "Kibana", "Prometheus", "Grafana", "Datadog",
    "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Jupyter", "MLflow",
    "Unity", "Unreal Engine", "Godot", "GameMaker", "Phaser.js", "Three.js",
    "Electron", "React Native", "Flutter", "Ionic", "Cordova", "Capacitor",
    "Stripe", "PayPal", "Braintree", "Square", "Auth0", "Firebase Auth", "JWT",
    "Socket.io", "Pusher", "Ably", "Twilio", "SendGrid", "Mailgun", "Postmark"
  ];
  const tagColors = [
    "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800",
    "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800",
    "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800",
    "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:hover:bg-pink-800",
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800",
    "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800",
    "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800",
    "bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:hover:bg-teal-800",
  ];
  const router = useRouter();

  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: "",
      bio: "",
      location: "",
      job_title: "",
      company: "",
      github_url: "",
      linkedin_url: "",
      twitter_url: "",
      website_url: "",
    },
  });

  const projectForm = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      github_url: "",
      live_url: "",
      looking_for_collaborators: false,
    },
  });

  // Handle technology tag input
  const handleTechInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTechInput(value);

    // Filter suggestions based on input
    if (value.trim()) {
      const filtered = technologySuggestions.filter(tech =>
        tech.toLowerCase().includes(value.toLowerCase()) &&
        !technologies.includes(tech)
      );
      setFilteredSuggestions(filtered.slice(0, 7)); // Limit to 7 to leave room for "Add" option
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    // Check for comma to create tag
    if (value.includes(',')) {
      const newTech = value.replace(',', '').trim();
      if (newTech && !technologies.includes(newTech)) {
        setTechnologies([...technologies, newTech]);
        setTechInput("");
        setShowSuggestions(false);
        // Update form value
        const currentTechs = projectForm.getValues("technologies");
        const updatedTechs = currentTechs ? `${currentTechs},${newTech}` : newTech;
        projectForm.setValue("technologies", updatedTechs);
      } else {
        setTechInput("");
      }
    }
  };

  const selectSuggestion = (suggestion: string) => {
    if (!technologies.includes(suggestion)) {
      setTechnologies([...technologies, suggestion]);
      setTechInput("");
      setShowSuggestions(false);
      // Update form value
      const currentTechs = projectForm.getValues("technologies");
      const updatedTechs = currentTechs ? `${currentTechs},${suggestion}` : suggestion;
      projectForm.setValue("technologies", updatedTechs);
    }
  };

  const removeTechnology = (techToRemove: string) => {
    const updatedTechs = technologies.filter(tech => tech !== techToRemove);
    setTechnologies(updatedTechs);
    // Update form value
    projectForm.setValue("technologies", updatedTechs.join(','));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && techInput === '' && technologies.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      const lastTech = technologies[technologies.length - 1];
      removeTechnology(lastTech);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // Create tag from current input if it's not empty and not already added
      const trimmedInput = techInput.trim();
      if (trimmedInput && !technologies.includes(trimmedInput)) {
        setTechnologies([...technologies, trimmedInput]);
        setTechInput("");
        setShowSuggestions(false);
        // Update form value
        const currentTechs = projectForm.getValues("technologies");
        const updatedTechs = currentTechs ? `${currentTechs},${trimmedInput}` : trimmedInput;
        projectForm.setValue("technologies", updatedTechs);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const fetchProfile = useCallback(
    async (userId: string) => {
      // Mock profile data for demonstration
      const mockProfile = {
        id: userId,
        display_name: "Gagan Deep Singh",
        bio: "Full-stack developer passionate about building communities and open-source projects. Founder of Delhi Devs, focused on creating inclusive spaces for developers in Delhi NCR. Love working with React, Node.js, and Python.",
        location: "Delhi, India",
        job_title: "Software Engineer",
        company: "Tech Startup",
        github_url: "https://github.com/gagangulyani",
        linkedin_url: "https://linkedin.com/in/gagangulyani",
        twitter_url: "https://twitter.com/gagangulyani",
        website_url: "https://gagangulyani.com",
        avatar_url: "",
        created_at: "2025-08-01T10:00:00Z",
      };
      setProfile(mockProfile);
      profileForm.reset(mockProfile);
    },
    [profileForm]
  );

  const fetchProjects = useCallback(async (userId: string) => {
    // Mock project data for demonstration
    const mockProjects: Project[] = [
      {
        id: "1",
        title: "Delhi Devs Community Website",
        description: "A modern, responsive website for the Delhi Devs community built with Next.js, TypeScript, and Tailwind CSS. Features include event listings, member profiles, and blog posts.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
        github_url: "https://github.com/delhi-devs/community-website",
        live_url: "https://delhi-devs.com",
        looking_for_collaborators: true,
        created_at: "2025-09-15T10:00:00Z",
      },
      {
        id: "2",
        title: "React Native Meetup App",
        description: "A mobile app for organizing and managing tech meetups in Delhi NCR. Built with React Native and Expo, featuring real-time updates and community engagement features.",
        technologies: ["React Native", "Expo", "Firebase", "Node.js"],
        github_url: "https://github.com/delhi-devs/meetup-app",
        live_url: null,
        looking_for_collaborators: true,
        created_at: "2025-08-20T14:30:00Z",
      },
      {
        id: "3",
        title: "Open Source Contribution Tracker",
        description: "A dashboard to track and visualize open source contributions across different platforms. Helps developers showcase their impact in the open source community.",
        technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
        github_url: "https://github.com/delhi-devs/contrib-tracker",
        live_url: "https://contrib-tracker.delhi-devs.com",
        looking_for_collaborators: false,
        created_at: "2025-07-10T09:15:00Z",
      },
      {
        id: "4",
        title: "AI-Powered Code Review Tool",
        description: "An intelligent code review assistant that uses machine learning to suggest improvements and catch potential bugs. Currently in early development phase.",
        technologies: ["Python", "TensorFlow", "FastAPI", "React"],
        github_url: "https://github.com/delhi-devs/ai-code-review",
        live_url: null,
        looking_for_collaborators: true,
        created_at: "2025-09-01T16:45:00Z",
      },
    ];
    setProjects(mockProjects);
  }, []);

  const handleCloseSettings = useCallback(() => {
    // Check if profile form has unsaved changes
    const profileFormValues = profileForm.getValues();
    const hasProfileChanges = Object.keys(profileFormValues).some(key => {
      const currentValue = profileFormValues[key as keyof typeof profileFormValues];
      const defaultValue = profileForm.formState.defaultValues?.[key as keyof typeof profileForm.formState.defaultValues];
      return currentValue !== defaultValue;
    });

    if (hasProfileChanges) {
      setPendingAction(() => () => {
        setShowSettings(false);
        profileForm.reset();
      });
      setShowUnsavedChangesDialog(true);
    } else {
      setShowSettings(false);
    }
  }, [profileForm]);

  const handleDiscardChanges = () => {
    if (pendingAction) {
      pendingAction();
    }
    setShowUnsavedChangesDialog(false);
    setPendingAction(null);
  };

  const handleCancelDiscard = () => {
    setShowUnsavedChangesDialog(false);
    setPendingAction(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSettings) {
        e.preventDefault();
        handleCloseSettings();
      }
    };

    if (showSettings) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSettings, handleCloseSettings]);

  const onProfileSubmit = async (values: ProfileData) => {
    if (!user) return;

    setIsLoading(true);
    const { error } = await supabase.from("user_profiles").upsert({
      id: user.id,
      ...values,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
      setIsEditing(false);
      await fetchProfile(user.id);
    }
    setIsLoading(false);
  };

  const onProjectSubmit = async (values: ProjectData) => {
    if (!user) return;

    setIsLoading(true);
    const { error } = await supabase.from("user_projects").insert({
      user_id: user.id,
      ...values,
      technologies: technologies,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your project has been added.",
      });
      setShowAddProject(false);
      projectForm.reset();
      setTechnologies([]);
      setTechInput("");
      setShowSuggestions(false);
      setFilteredSuggestions([]);
      await fetchProjects(user.id);
    }
    setIsLoading(false);
  };

  const deleteProject = async (projectId: string) => {
    const { error } = await supabase
      .from("user_projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Project has been deleted.",
      });
      await fetchProjects(user!.id);
    }
  };

  // Mock stats for demonstration
  const stats = {
    totalBlogs: 12,
    totalEvents: 8,
    totalAttendees: 246,
    totalViews: 3542,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <Dialog open={showSettings} onOpenChange={(open) => {
            if (!open) {
              handleCloseSettings();
            } else {
              setShowSettings(true);
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Account Settings</DialogTitle>
                <DialogDescription>
                  Manage your account preferences and profile information
                </DialogDescription>
              </DialogHeader>
              <div className="flex h-[600px]">
                {/* Settings Sidebar */}
                <div className="w-64 border-r pr-6">
                  <nav className="space-y-2">
                    <button
                      onClick={() => setSettingsSection("profile")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        settingsSection === "profile"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      Profile Information
                    </button>
                    <button
                      onClick={() => setSettingsSection("account")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        settingsSection === "account"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Key className="h-4 w-4" />
                      Account Settings
                    </button>
                    <button
                      onClick={() => setSettingsSection("privacy")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        settingsSection === "privacy"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                      Privacy & Security
                    </button>
                    <button
                      onClick={() => setSettingsSection("notifications")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        settingsSection === "notifications"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Bell className="h-4 w-4" />
                      Notifications
                    </button>
                    <button
                      onClick={() => setSettingsSection("appearance")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        settingsSection === "appearance"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Palette className="h-4 w-4" />
                      Appearance
                    </button>
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1 pl-6 overflow-y-auto">
                  {settingsSection === "profile" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                        <Form {...profileForm}>
                          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                            <FormField
                              control={profileForm.control}
                              name="display_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Display Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your display name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={profileForm.control}
                              name="bio"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bio</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Tell us about yourself..."
                                      className="min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Brief description about yourself (max 500 characters)
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={profileForm.control}
                                name="job_title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Software Engineer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={profileForm.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Company Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={profileForm.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Delhi, India" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="space-y-4">
                              <h4 className="text-sm font-medium">Social Links</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={profileForm.control}
                                  name="github_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>GitHub</FormLabel>
                                      <FormControl>
                                        <Input placeholder="https://github.com/username" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={profileForm.control}
                                  name="linkedin_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>LinkedIn</FormLabel>
                                      <FormControl>
                                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={profileForm.control}
                                  name="twitter_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Twitter</FormLabel>
                                      <FormControl>
                                        <Input placeholder="https://twitter.com/username" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={profileForm.control}
                                  name="website_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Website</FormLabel>
                                      <FormControl>
                                        <Input placeholder="https://yourwebsite.com" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>

                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
                  )}

                  {settingsSection === "account" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Account Settings</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Email Address</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {user?.email}
                          </p>
                          <Button variant="outline" size="sm">
                            Change Email
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Password</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Last changed 30 days ago
                          </p>
                          <Button variant="outline" size="sm">
                            Change Password
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg border-destructive/20">
                          <h4 className="font-medium mb-2 text-destructive">Danger Zone</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Permanently delete your account and all associated data
                          </p>
                          <Button variant="destructive" size="sm">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {settingsSection === "privacy" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Privacy & Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Profile Visibility</h4>
                            <p className="text-sm text-muted-foreground">
                              Make your profile visible to other community members
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Show Email</h4>
                            <p className="text-sm text-muted-foreground">
                              Display your email address on your profile
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  )}

                  {settingsSection === "notifications" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive email updates about events and community news
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Event Reminders</h4>
                            <p className="text-sm text-muted-foreground">
                              Get reminded about upcoming events
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Project Updates</h4>
                            <p className="text-sm text-muted-foreground">
                              Notifications about your project collaborations
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  )}

                  {settingsSection === "appearance" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Appearance</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Theme</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Choose your preferred theme
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Light</Button>
                            <Button variant="outline" size="sm">Dark</Button>
                            <Button variant="outline" size="sm">System</Button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Language</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Select your preferred language
                          </p>
                          <select className="w-full p-2 border rounded-md">
                            <option>English</option>
                            <option>Hindi</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Unsaved Changes Confirmation Dialog */}
        <AlertDialog open={showUnsavedChangesDialog} onOpenChange={setShowUnsavedChangesDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes in your profile. Are you sure you want to discard them?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDiscard}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDiscardChanges} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Discard Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Profile Header */}
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
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
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
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
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
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
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
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">{stats.totalBlogs}</div>
                <div className="text-sm text-muted-foreground">Total Blogs</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">{stats.totalEvents}</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">{stats.totalAttendees}</div>
                <div className="text-sm text-muted-foreground">Total Attendees</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">{stats.totalViews}</div>
                <div className="text-sm text-muted-foreground">Blog Views</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button size="lg" className="flex-1 gap-2">
            <PenTool className="h-5 w-5" />
            Write New Blog
          </Button>
          <Button size="lg" variant="outline" className="flex-1 gap-2">
            <Calendar className="h-5 w-5" />
            Host New Event
          </Button>
        </div>

        {/* Projects Section */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Your Projects
              </CardTitle>
              <CardDescription>Showcase your work and find collaborators</CardDescription>
            </div>
            <Button onClick={() => setShowAddProject(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Share your projects to connect with other developers and find potential collaborators
                </p>
                <Button onClick={() => setShowAddProject(true)} size="lg">
                  Add Your First Project
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                  <Card key={project.id} className="relative">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                            {project.description}
                          </p>
                          {project.technologies && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project.technologies.map((tech, index) => (
                                <Badge key={tech} className={`text-xs ${tagColors[index % tagColors.length]}`}>
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProject(project.id)}
                          className="text-destructive hover:text-destructive ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest contributions and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Joined Delhi Devs Community</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Attended Meetup #1</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground">More activity coming soon...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Project Modal */}
        {showAddProject && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddProject(false);
              setTechnologies([]);
              setTechInput("");
              setShowSuggestions(false);
              setFilteredSuggestions([]);
              projectForm.reset();
            }}
          >
            <Card
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Add New Project</CardTitle>
                  <CardDescription>Share your project with the community</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddProject(false);
                    setTechnologies([]);
                    setTechInput("");
                    setShowSuggestions(false);
                    setFilteredSuggestions([]);
                    projectForm.reset();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Form {...projectForm}>
                  <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="space-y-6">
                    <FormField
                      control={projectForm.control}
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
                      control={projectForm.control}
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
                      control={projectForm.control}
                      name="technologies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technologies</FormLabel>
                          <FormControl>
                            <div className="space-y-2 relative">
                              {/* Display technology tags */}
                              {technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/50 min-h-[2.5rem]">
                                  {technologies.map((tech, index) => (
                                    <Badge key={index} className={`flex items-center gap-1 ${tagColors[index % tagColors.length]}`}>
                                      {tech}
                                      <button
                                        type="button"
                                        onClick={() => removeTechnology(tech)}
                                        className="ml-1 hover:bg-black/20 dark:hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {/* Input field with suggestions */}
                              <div className="relative">
                                <Input
                                  placeholder={technologies.length === 0 ? "React, Node.js, TypeScript" : "Add another technology..."}
                                  value={techInput}
                                  onChange={handleTechInputChange}
                                  onKeyDown={handleTechKeyDown}
                                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                  onFocus={() => {
                                    if (techInput.trim()) {
                                      const filtered = technologySuggestions.filter(tech =>
                                        tech.toLowerCase().includes(techInput.toLowerCase()) &&
                                        !technologies.includes(tech)
                                      );
                                      setFilteredSuggestions(filtered.slice(0, 8));
                                      setShowSuggestions(true);
                                    }
                                  }}
                                  className={technologies.length > 0 ? "mt-2" : ""}
                                />
                                {/* Suggestions dropdown */}
                                {showSuggestions && (
                                  <div className="absolute top-full left-0 right-0 z-10 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                                    {filteredSuggestions.map((suggestion, index) => (
                                      <button
                                        key={suggestion}
                                        type="button"
                                        onClick={() => selectSuggestion(suggestion)}
                                        className="w-full text-left px-3 py-2 hover:bg-muted transition-colors first:rounded-t-md"
                                      >
                                        <span className="flex items-center gap-2">
                                          <span className={`w-3 h-3 rounded-full ${tagColors[index % tagColors.length].split(' ')[0].replace('bg-', 'bg-')}`}></span>
                                          {suggestion}
                                        </span>
                                      </button>
                                    ))}
                                    {/* Add custom technology option */}
                                    {techInput.trim() && !technologySuggestions.some(tech =>
                                      tech.toLowerCase() === techInput.toLowerCase().trim()
                                    ) && !technologies.includes(techInput.trim()) && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const trimmedInput = techInput.trim();
                                          if (trimmedInput && !technologies.includes(trimmedInput)) {
                                            setTechnologies([...technologies, trimmedInput]);
                                            setTechInput("");
                                            setShowSuggestions(false);
                                            // Update form value
                                            const currentTechs = projectForm.getValues("technologies");
                                            const updatedTechs = currentTechs ? `${currentTechs},${trimmedInput}` : trimmedInput;
                                            projectForm.setValue("technologies", updatedTechs);
                                          }
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-muted transition-colors border-t last:rounded-b-md text-muted-foreground"
                                      >
                                        <span className="flex items-center gap-2">
                                          <Plus className="w-3 h-3" />
                                          Add "{techInput.trim()}"
                                        </span>
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Type a technology and press comma (,) or Enter to add it as a tag, or select from suggestions. If the technology doesn't exist, you'll see an "Add" option.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={projectForm.control}
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
                        control={projectForm.control}
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
                      control={projectForm.control}
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
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddProject(false);
                          setTechnologies([]);
                          setTechInput("");
                          setShowSuggestions(false);
                          setFilteredSuggestions([]);
                          projectForm.reset();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
