'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  event_date: z.string(),
  end_date: z.string().optional(),
  location: z.string().min(3, "Location is required"),
  location_type: z.enum(["physical", "virtual", "hybrid"]),
  event_link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  max_attendees: z.number().min(1).optional(),
  tags: z.string(),
});

export type EventFormData = z.infer<typeof eventSchema>;

const locationTypes = [
  { value: "physical", label: "In-Person" },
  { value: "virtual", label: "Virtual" },
  { value: "hybrid", label: "Hybrid" },
];

interface CreateEventFormProps {
  form: UseFormReturn<EventFormData>;
  onSubmit: (values: EventFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function CreateEventForm({ form, onSubmit, onCancel, isLoading }: CreateEventFormProps) {
  const glassPanelClass = "rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl transition-all duration-200";

  return (
    <Card className={`${glassPanelClass} overflow-hidden`}>
      <CardHeader className="space-y-2 border-b border-white/10 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl">
        <CardTitle className="text-2xl font-light">Create Event</CardTitle>
        <CardDescription className="text-sm">Share what you're hosting with the community</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Event Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Delhi Devs React Workshop" 
                      className="rounded-xl border-border/50 bg-background/50 backdrop-blur"
                      {...field} 
                    />
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
                  <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your event, what attendees will learn, and what to expect..."
                      className="min-h-[100px] rounded-xl border-border/50 bg-background/50 backdrop-blur resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="event_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Start Date & Time</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        className="rounded-xl border-border/50 bg-background/50 backdrop-blur"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">End Date & Time</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        className="rounded-xl border-border/50 bg-background/50 backdrop-blur"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Event Type</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-xl border border-border/50 bg-background/50 backdrop-blur px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        {locationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Max Attendees</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="50" 
                        className="rounded-xl border-border/50 bg-background/50 backdrop-blur"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
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
                  <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Location / Venue</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Connaught Place, New Delhi" 
                      className="rounded-xl border-border/50 bg-background/50 backdrop-blur"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="event_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Event Link</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://zoom.us/meeting/..." 
                      className="rounded-xl border-border/50 bg-background/50 backdrop-blur"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tags</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="React, JavaScript, Workshop" 
                      className="rounded-xl border-border/50 bg-background/50 backdrop-blur"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="rounded-full"
                size="lg"
              >
                {isLoading ? "Creating..." : "Create Event"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-full"
                size="lg"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { eventSchema };
