'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Rocket, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

const WHATSAPP_INVITE_LINK = "https://chat.whatsapp.com/GIkFkQl9ROz0VFzcbHxVnG";

interface FormValues {
  name: string;
  mobile: string;
  linkedin: string;
}

export function CallToAction() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormValues>({ name: "", mobile: "", linkedin: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("whatsapp_join_requests").insert([formData]);

    if (!error) {
      window.open(WHATSAPP_INVITE_LINK, "_blank");
      setModalOpen(false);
      setFormData({ name: "", mobile: "", linkedin: "" });
    }

    setIsSubmitting(false);
  }

  return (
    <section id="join" className="py-24 relative">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Join Delhi Devs Rebooted
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with developers building products.
          </p>

          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">300+</div>
              <div className="text-sm text-muted-foreground">WhatsApp members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2</div>
              <div className="text-sm text-muted-foreground">Meetups hosted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Building</div>
              <div className="text-sm text-muted-foreground">in public</div>
            </div>
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold glow-orange-hover transition-all duration-300"
          >
            Join on WhatsApp
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-muted-foreground">
            Built by developers in Delhi NCR
          </p>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Delhi Devs</DialogTitle>
            <DialogDescription>
              Fill in your details to get the WhatsApp invite link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="10-digit Indian mobile number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="linkedin.com/in/yourname"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Get WhatsApp Link"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}