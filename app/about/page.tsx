'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, CalendarDays, Sparkles, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </Link>

        {/* Hero */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="relative w-full md:w-56 h-36 md:h-40 rounded-xl overflow-hidden border">
            <Image
              src="/delhi-devs-community.png"
              alt="Delhi Devs Community"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Delhi Devs</h1>
            <p className="mt-2 text-muted-foreground">
              A welcoming, tech-agnostic community for developers across Delhi NCR —
              connect, learn, and build together.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/events">
                <Button size="sm" className="gap-2"><CalendarDays className="h-4 w-4"/> See Events</Button>
              </Link>
              <Link href="/join">
                <Button size="sm" variant="outline" className="gap-2"><Users className="h-4 w-4"/> Join Community</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How it started</CardTitle>
              <CardDescription>Grassroots, genuine, people-first</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Delhi Devs was started by <span className="text-foreground font-medium">Gagan Deep Singh</span> (Gagan Gulyani)
                during his master’s — driven by a simple idea: bring together the many
                talented builders across Delhi and make it easy to connect.
              </p>
              <p>
                As a full‑stack developer (JavaScript/TypeScript, React, Node.js, Python),
                Gagan pairs hands‑on industry experience with a passion for community.
                The goal has always been practical: create a friendly space where
                developers of all levels can meet, learn, and collaborate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>The reboot</CardTitle>
              <CardDescription>Fresh energy, same mission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                In <span className="text-foreground font-medium">August 2025</span>, Delhi Devs returned with
                “Delhi Devs Rebooted Meetup #1”. Interest was strong with 100+ registrations —
                a clear signal that the city’s developer community is eager to connect.
              </p>
              <p>
                That kickoff formed a core of early members and set the tone: small, high‑signal
                gatherings that grow steadily, driven by real connections.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Principles */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What we believe</CardTitle>
            <CardDescription>Simple principles that compound over time</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="p-3 rounded-lg border">
              <div className="font-medium mb-1 flex items-center gap-2"><Sparkles className="h-4 w-4"/> Quality over hype</div>
              <p className="text-muted-foreground">Learnings you can apply, not just noise. Hands‑on, practical, useful.</p>
            </div>
            <div className="p-3 rounded-lg border">
              <div className="font-medium mb-1 flex items-center gap-2"><Users className="h-4 w-4"/> Community over numbers</div>
              <p className="text-muted-foreground">Real connections, respectful culture, and space for everyone to grow.</p>
            </div>
            <div className="p-3 rounded-lg border">
              <div className="font-medium mb-1 flex items-center gap-2"><MapPin className="h-4 w-4"/> Delhi‑NCR first</div>
              <p className="text-muted-foreground">Rooted in a thriving tech hub with thousands of startups and global teams.</p>
            </div>
          </CardContent>
        </Card>

        {/* Context */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>The Delhi tech ecosystem</CardTitle>
            <CardDescription>Big, diverse, and full of opportunity</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              Delhi NCR is home to a vibrant tech scene with thousands of startups and major
              technology companies. Delhi Devs is intentionally tech‑agnostic — a friendly
              home for developers across stacks, roles, and experience levels.
            </p>
            <p>
              The aim is simple: help you find your people, discover new ideas, and ship more
              together — one meetup, project, or conversation at a time.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-8 flex flex-col md:flex-row gap-3">
          <Link href="/join" className="flex-1">
            <Button className="w-full">Join the Community</Button>
          </Link>
          <Link href="/events" className="flex-1">
            <Button variant="outline" className="w-full">Explore Events</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
