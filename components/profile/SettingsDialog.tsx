import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { ProfileFormData } from "@/lib/profile/schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Key, Shield, Bell, Palette } from "lucide-react";

interface SettingsDialogProps {
  isOpen: boolean;
  user: SupabaseUser | null;
  form: UseFormReturn<ProfileFormData>;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (values: ProfileFormData) => void;
}

type SettingsSection = "profile" | "account" | "privacy" | "notifications" | "appearance";

export function SettingsDialog({
  isOpen,
  user,
  form,
  isLoading,
  onClose,
  onSubmit,
}: SettingsDialogProps) {
  const [section, setSection] = useState<SettingsSection>("profile");

  const sections = [
    { id: "profile" as const, icon: User, label: "Profile Information" },
    { id: "account" as const, icon: Key, label: "Account Settings" },
    { id: "privacy" as const, icon: Shield, label: "Privacy & Security" },
    { id: "notifications" as const, icon: Bell, label: "Notifications" },
    { id: "appearance" as const, icon: Palette, label: "Appearance" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden p-0 gap-0">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b">
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>
            Manage your account preferences and profile information
          </DialogDescription>
        </DialogHeader>
        
        {/* Mobile Section Selector */}
        <div className="md:hidden px-4 pt-4 border-b pb-4">
          <Select value={section} onValueChange={(value) => setSection(value as SettingsSection)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {sections.map((item) => {
                const Icon = item.icon;
                return (
                  <SelectItem key={item.id} value={item.id}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(85vh-8rem)] sm:h-[calc(80vh-8rem)]">
          {/* Settings Sidebar - Desktop Only */}
          <div className="hidden md:block md:w-64 border-r">
            <nav className="space-y-2 p-4">
              {sections.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      section === item.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            {section === "profile" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                      <FormField
                        control={form.control}
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
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself..."
                                className="min-h-[80px] sm:min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs sm:text-sm">
                              Brief description about yourself (max 500 characters)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
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
                          control={form.control}
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
                        control={form.control}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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

                      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            )}

            {section === "account" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Account Settings</h3>
                <div className="space-y-4">
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-sm sm:text-base">Email Address</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 break-all">{user?.email}</p>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">Change Email</Button>
                  </div>
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-sm sm:text-base">Password</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">Last changed 30 days ago</p>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">Change Password</Button>
                  </div>
                  <div className="p-3 sm:p-4 border rounded-lg border-destructive/20">
                    <h4 className="font-medium mb-2 text-destructive text-sm sm:text-base">Danger Zone</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive" size="sm" className="w-full sm:w-auto">Delete Account</Button>
                  </div>
                </div>
              </div>
            )}

            {section === "privacy" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Privacy & Security</h3>
                <div className="space-y-4">
                  <div className="flex items-start sm:items-center justify-between gap-4 p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Profile Visibility</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Make your profile visible to other community members
                      </p>
                    </div>
                    <Switch defaultChecked className="flex-shrink-0" />
                  </div>
                  <div className="flex items-start sm:items-center justify-between gap-4 p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Show Email</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Display your email address on your profile
                      </p>
                    </div>
                    <Switch className="flex-shrink-0" />
                  </div>
                  <div className="flex items-start sm:items-center justify-between gap-4 p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Two-Factor Authentication</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch className="flex-shrink-0" />
                  </div>
                </div>
              </div>
            )}

            {section === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-start sm:items-center justify-between gap-4 p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Email Notifications</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Receive email updates about events and community news
                      </p>
                    </div>
                    <Switch defaultChecked className="flex-shrink-0" />
                  </div>
                  <div className="flex items-start sm:items-center justify-between gap-4 p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Event Reminders</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Get reminded about upcoming events
                      </p>
                    </div>
                    <Switch defaultChecked className="flex-shrink-0" />
                  </div>
                  <div className="flex items-start sm:items-center justify-between gap-4 p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Project Updates</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Notifications about your project collaborations
                      </p>
                    </div>
                    <Switch defaultChecked className="flex-shrink-0" />
                  </div>
                </div>
              </div>
            )}

            {section === "appearance" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Appearance</h3>
                <div className="space-y-4">
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-sm sm:text-base">Theme</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Choose your preferred theme
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Light</Button>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Dark</Button>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">System</Button>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-sm sm:text-base">Language</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Select your preferred language
                    </p>
                    <select className="w-full p-2 border rounded-md text-sm">
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
  );
}
