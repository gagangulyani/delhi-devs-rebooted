'use client';

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rocket, Calendar } from "lucide-react";
import Link from "next/link";
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

export function HeroSection() {
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20 lg:py-0">
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Stop Planning.
                <span className="text-primary block">Start Shipping.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Join 300+ Delhi developers who build in public, share knowledge, and launch together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start pt-4 animate-fade-in-up delay-200">
              <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-semibold glow-orange-hover transition-all duration-300"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Join on WhatsApp
              </Button>
              <Link href="#meetups">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-base border-border text-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  See Meetups
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px]">
              <Image
                src="/delhi-devs-rebooted.png"
                alt="Delhi Devs Rebooted"
                className="object-contain"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
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
    </section>
  );
}