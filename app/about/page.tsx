'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, CalendarDays, Sparkles, MapPin, ExternalLink } from 'lucide-react'
import { BackButton } from '@/components/BackButton'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <BackButton fallbackUrl="/" />
        </div>

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
              A welcoming, tech-agnostic community for developers across Delhi NCR. 
              Connect, learn, and build together.
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
              <CardTitle>The Origin</CardTitle>
              <CardDescription>From a coffee break to a community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Delhi Devs traces its roots to a casual coffee break at <span className="text-foreground font-medium">HTM (HackTheMountains)</span>. 
                <span className="text-foreground font-medium">Chaitanya Chawla</span> sparked the idea for a WhatsApp group to connect Delhi-NCR developers.
              </p>
              <p>
                <span className="text-foreground font-medium">Gagan Deep Singh</span>, <span className="text-foreground font-medium">Simarpreet Singh</span>, 
                <span className="text-foreground font-medium"> Vani Chitkara</span>, <span className="text-foreground font-medium">Shivam Bhasin</span>, <span className="text-foreground font-medium">Nishant Mishra</span> and others were there when Gagan created 
                the group on the spot.
              </p>
              <p>
                What started as an impromptu idea quickly took off. The group became the go-to hub 
                for sharing community events, tech conferences, job postings, and dev tips. Word 
                spread to colleges across Delhi-NCR, scaling to <span className="text-foreground font-medium">1600 active members</span>: students, 
                freelancers, and pros coordinating meetups, debugging code, and discovering local 
                hackathons together.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>The Reboot</CardTitle>
              <CardDescription>Fresh energy, same mission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Like many organic communities, the original group eventually dissolved. The spark 
                faded, but the need didn&apos;t.
              </p>
              <p>
                Delhi Devs Rebooted launched in May 2025. With the help of community people and connections, Gagan (as Head of Community) reframed it 
                to provide space for people to connect, collaborate, and help each other: tech support, 
                job postings, and <span className="text-foreground font-medium">networking</span>. Events came later, and the focus remains on networking 
                over technical sessions. <span className="text-foreground font-medium">Quality over quantity</span>.
              </p>
              <p>
                In August 2025, Delhi Devs Rebooted 
                Meetup #1 drew <span className="text-foreground font-medium">100+ registrations</span>. A clear signal that Delhi&apos;s developer community 
                was eager to reconnect. That kickoff formed a core of early members and set the tone: 
                small, high-signal gatherings that grow steadily, driven by real connections.
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
              <p className="text-muted-foreground">Learnings you can apply, not just noise. Hands on, practical, useful.</p>
            </div>
            <div className="p-3 rounded-lg border">
              <div className="font-medium mb-1 flex items-center gap-2"><Users className="h-4 w-4"/> Community over numbers</div>
              <p className="text-muted-foreground">Real connections, respectful culture, and space for everyone to grow.</p>
            </div>
            <div className="p-3 rounded-lg border">
              <div className="font-medium mb-1 flex items-center gap-2"><MapPin className="h-4 w-4"/> Delhi NCR first</div>
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
              technology companies. Delhi Devs is intentionally tech agnostic. A friendly
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

        {/* Founder */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Meet the Founder</CardTitle>
            <CardDescription>The person behind Delhi Devs Rebooted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/gagan-deep-singh.jpg"
                  alt="Gagan Deep Singh"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Gagan Deep Singh</h3>
                  <p className="text-sm text-muted-foreground">Founder & Head of Community</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full-stack developer with a passion for building communities. 
                  Started Delhi Devs to connect developers across Delhi NCR and create 
                  meaningful networking opportunities.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://linkedin.com/in/gagan-gulyani" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="https://gagangulyani.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="mailto:gagan@delhidevs.com"
                    className="text-sm text-primary hover:underline"
                  >
                    gagan@delhidevs.com
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
