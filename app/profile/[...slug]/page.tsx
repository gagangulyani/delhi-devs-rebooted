"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/contexts/LoadingContext";
import { Button } from "@/components/ui/button";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { BackButton } from "@/components/BackButton";

// Import refactored components
import {
  ProfileHeader,
  StatsCards,
  ProfileActionButtons,
  ProjectsList,
  RecentActivity,
  AddProjectDialog,
  SettingsDialog,
} from "@/components/profile";
import { ProfilePageSkeleton } from "@/components/skeletons";

// Import types
import { UserProfile, Project, ProfileStats } from "@/types/profile";
import {
  profileSchema,
  projectSchema,
  ProfileFormData,
  ProjectFormData,
} from "@/lib/profile/schemas";

interface ProfilePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
    useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string[];
  } | null>(null);

  const { showLoader, hideLoader, isLoading } = useLoading();
  const { toast } = useToast();
  const router = useRouter();

  // Resolve params on mount
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  // Determine if viewing own profile
  const slug = resolvedParams?.slug?.[0] || "me";
  const isViewingOwnProfile = slug === "me";

  const profileForm = useForm<ProfileFormData>({
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

  const projectForm = useForm<ProjectFormData>({
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

  // Technology tag handlers
  const handleTechInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTechInput(value);

    if (value.includes(",")) {
      const newTech = value.replace(",", "").trim();
      if (newTech && !technologies.includes(newTech)) {
        setTechnologies([...technologies, newTech]);
        setTechInput("");
        const currentTechs = projectForm.getValues("technologies");
        const updatedTechs = currentTechs
          ? `${currentTechs},${newTech}`
          : newTech;
        projectForm.setValue("technologies", updatedTechs);
      } else {
        setTechInput("");
      }
    }
  };

  const removeTechnology = (techToRemove: string) => {
    const updatedTechs = technologies.filter((tech) => tech !== techToRemove);
    setTechnologies(updatedTechs);
    projectForm.setValue("technologies", updatedTechs.join(","));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && techInput === "" && technologies.length > 0) {
      const lastTech = technologies[technologies.length - 1];
      removeTechnology(lastTech);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = techInput.trim();
      if (trimmedInput && !technologies.includes(trimmedInput)) {
        setTechnologies([...technologies, trimmedInput]);
        setTechInput("");
        const currentTechs = projectForm.getValues("technologies");
        const updatedTechs = currentTechs
          ? `${currentTechs},${trimmedInput}`
          : trimmedInput;
        projectForm.setValue("technologies", updatedTechs);
      }
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
        description:
          "A modern, responsive website for the Delhi Devs community built with Next.js, TypeScript, and Tailwind CSS. Features include event listings, member profiles, and blog posts.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
        github_url: "https://github.com/delhi-devs/community-website",
        live_url: "https://delhi-devs.com",
        looking_for_collaborators: true,
        created_at: "2025-09-15T10:00:00Z",
      },
      {
        id: "2",
        title: "React Native Meetup App",
        description:
          "A mobile app for organizing and managing tech meetups in Delhi NCR. Built with React Native and Expo, featuring real-time updates and community engagement features.",
        technologies: ["React Native", "Expo", "Firebase", "Node.js"],
        github_url: "https://github.com/delhi-devs/meetup-app",
        looking_for_collaborators: true,
        created_at: "2025-08-20T14:30:00Z",
      },
      {
        id: "3",
        title: "Open Source Contribution Tracker",
        description:
          "A dashboard to track and visualize open source contributions across different platforms. Helps developers showcase their impact in the open source community.",
        technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
        github_url: "https://github.com/delhi-devs/contrib-tracker",
        live_url: "https://contrib-tracker.delhi-devs.com",
        looking_for_collaborators: false,
        created_at: "2025-07-10T09:15:00Z",
      },
      {
        id: "4",
        title: "AI-Powered Code Review Tool",
        description:
          "An intelligent code review assistant that uses machine learning to suggest improvements and catch potential bugs. Currently in early development phase.",
        technologies: ["Python", "TensorFlow", "FastAPI", "React"],
        github_url: "https://github.com/delhi-devs/ai-code-review",
        looking_for_collaborators: true,
        created_at: "2025-09-01T16:45:00Z",
      },
    ];
    setProjects(mockProjects);
  }, []);

  const handleCloseSettings = useCallback(() => {
    const profileFormValues = profileForm.getValues();
    const hasProfileChanges = Object.keys(profileFormValues).some((key) => {
      const currentValue =
        profileFormValues[key as keyof typeof profileFormValues];
      const defaultValue =
        profileForm.formState.defaultValues?.[
          key as keyof typeof profileForm.formState.defaultValues
        ];
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

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const mockUser = {
          id: "mock-user-id",
          email: "gagan@example.com",
          user_metadata: {
            display_name: "Gagan Deep Singh",
          },
          app_metadata: {},
          aud: "authenticated",
          created_at: new Date().toISOString(),
        } as SupabaseUser;

        setUser(mockUser);
        await fetchProfile(mockUser.id);
        await fetchProjects(mockUser.id);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        hideLoader();
      }
    };

    fetchUserAndProfile();
  }, [hideLoader, fetchProfile, fetchProjects]);

  const onProfileSubmit = async (values: ProfileFormData) => {
    if (!user) return;

    showLoader("Saving profile...");
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
      await fetchProfile(user.id);
    }
    hideLoader();
  };

  const onProjectSubmit = async (values: ProjectFormData) => {
    if (!user) return;

    showLoader("Adding project...");
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
      await fetchProjects(user.id);
    }
    hideLoader();
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

  // Mock stats
  const stats: ProfileStats = {
    totalBlogs: 12,
    totalEvents: 8,
    totalAttendees: 246,
    totalViews: 3542,
  };

  if (isLoading || !resolvedParams) {
    return <ProfilePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton fallbackUrl="/" />
          {isViewingOwnProfile && (
            <Dialog
              open={showSettings}
              onOpenChange={(open) => {
                if (!open) {
                  handleCloseSettings();
                } else {
                  setShowSettings(true);
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </DialogTrigger>
              <SettingsDialog
                isOpen={showSettings}
                user={user}
                form={profileForm}
                isLoading={isLoading}
                onClose={handleCloseSettings}
                onSubmit={onProfileSubmit}
              />
            </Dialog>
          )}
        </div>

        {/* Unsaved Changes Dialog */}
        <AlertDialog
          open={showUnsavedChangesDialog}
          onOpenChange={setShowUnsavedChangesDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes in your profile. Are you sure you want
                to discard them?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setShowUnsavedChangesDialog(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDiscardChanges}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Discard Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Profile Header */}
        <ProfileHeader user={user} profile={profile} />

        {/* Stats - Only for own profile */}
        {isViewingOwnProfile && <StatsCards stats={stats} />}

        {/* Action Buttons - Only for own profile */}
        {isViewingOwnProfile && <ProfileActionButtons />}

        {/* Projects Section */}
        <ProjectsList
          projects={projects}
          isOwnProfile={isViewingOwnProfile}
          profileName={profile?.display_name}
          onAddProject={
            isViewingOwnProfile ? () => setShowAddProject(true) : undefined
          }
          onDeleteProject={isViewingOwnProfile ? deleteProject : undefined}
        />

        {/* Recent Activity */}
        <RecentActivity />

        {/* Add Project Dialog */}
        <AddProjectDialog
          isOpen={showAddProject}
          form={projectForm}
          techInput={techInput}
          technologies={technologies}
          isLoading={isLoading}
          onClose={() => {
            setShowAddProject(false);
            setTechnologies([]);
            setTechInput("");
            projectForm.reset();
          }}
          onSubmit={onProjectSubmit}
          onTechInputChange={handleTechInputChange}
          onTechKeyDown={handleTechKeyDown}
          onRemoveTechnology={removeTechnology}
        />
      </div>
    </div>
  );
}
