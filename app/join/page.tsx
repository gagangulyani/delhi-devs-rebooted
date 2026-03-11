'use client';

import { Users, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const WHATSAPP_INVITE_LINK = "https://chat.whatsapp.com/GIkFkQl9ROz0VFzcbHxVnG";

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">Join Delhi Devs</h1>
          <p className="text-xl text-muted-foreground">
            Connect with fellow developers in Delhi
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-center">
            <h2 className="text-2xl font-semibold mb-4">Join Our WhatsApp Community</h2>
            <p className="text-muted-foreground mb-6">
              Connect with over 500+ developers in Delhi. Get event updates, 
              participate in discussions, and network with peers.
            </p>
            <a
              href={WHATSAPP_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join WhatsApp Group
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 border rounded-2xl">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Events</h3>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming meetups, workshops, and tech talks
              </p>
            </div>
            <div className="p-6 border rounded-2xl">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Network</h3>
              <p className="text-sm text-muted-foreground">
                Connect with developers, designers, and tech enthusiasts
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-muted-foreground mb-4">
              Want to get in touch directly?
            </p>
            <a
              href="mailto:gagan@delhidevs.com"
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              gagan@delhidevs.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
