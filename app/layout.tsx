import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { MobileBottomNavigation } from "@/components/MobileBottomNavigation";
import { GlobalLoader } from "@/components/GlobalLoader";
import { getPublicNavigationItems } from "@/constants/navigation";

export const metadata: Metadata = {
  title: {
    default: 'Delhi Devs Rebooted - Connecting Passionate Developers in Delhi NCR',
    template: '%s | Delhi Devs Rebooted'
  },
  description: 'Join Delhi Devs Rebooted - the largest developer community in Delhi NCR. Connect with passionate developers, attend tech meetups, share knowledge, and build the future of technology together. Founded by Gagan Deep Singh.',
  keywords: [
    'delhi developers',
    'delhi ncr tech community',
    'developer meetups delhi',
    'tech community delhi',
    'programming community',
    'software developers delhi',
    'tech events delhi',
    'coding community',
    'developer networking',
    'delhi devs',
    'tech meetups',
    'gagan deep singh',
    'delhi tech scene',
    'developer groups delhi',
    'AI community delhi',
    'machine learning delhi',
    'web development delhi',
    'mobile development delhi'
  ],
  authors: [
    {
      name: 'Gagan Deep Singh',
      url: 'https://gagangulyani.com',
    }
  ],
  creator: 'Gagan Deep Singh',
  publisher: 'Delhi Devs Rebooted',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://delhidevs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Delhi Devs Rebooted - Connecting Passionate Developers in Delhi NCR',
    description: 'Join the largest developer community in Delhi NCR. Connect, collaborate, and code with passionate developers. Attend tech meetups, share knowledge, and build the future together.',
    url: 'https://delhidevs.com',
    siteName: 'Delhi Devs Rebooted',
    images: [
      {
        url: '/delhi-devs-rebooted.png',
        width: 1200,
        height: 630,
        alt: 'Delhi Devs Rebooted - Developer Community',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delhi Devs Rebooted - Connecting Passionate Developers in Delhi NCR',
    description: 'Join the largest developer community in Delhi NCR. Connect, collaborate, and code with passionate developers.',
    creator: '@GaganGulyani',
    images: ['/delhi-devs-rebooted.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add Google Search Console verification code when available
    yandex: '', // Add Yandex verification code when available
    yahoo: '', // Add Yahoo verification code when available
  },
  category: 'technology',
  classification: 'Developer Community',
  icons: {
    icon: [
      {
        url: '/delhi-devs-rebooted.png',
        sizes: 'any',
      },
      {
        url: '/delhi-devs-rebooted.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/delhi-devs-rebooted.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: '/delhi-devs-rebooted.png',
    apple: [
      {
        url: '/delhi-devs-rebooted.png',
        sizes: '180x180',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const publicNavigationItems = getPublicNavigationItems();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delhi Devs Rebooted',
    description: 'The largest developer community in Delhi NCR connecting passionate developers, hosting tech meetups, and building the future of technology together.',
    url: 'https://delhidevs.com',
    logo: 'https://delhidevs.com/delhi-devs-rebooted.png',
    image: 'https://delhidevs.com/delhi-devs-rebooted.png',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Gagan Deep Singh',
      url: 'https://gagangulyani.com',
      sameAs: [
        'https://linkedin.com/in/gagan-gulyani',
        'https://twitter.com/GaganGulyani'
      ]
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi NCR',
      addressCountry: 'IN'
    },
    areaServed: {
      '@type': 'Place',
      name: 'Delhi NCR'
    },
    sameAs: [
      'https://www.linkedin.com/company/delhi-devs'
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Global Developer Community'
    },
    knowsAbout: [
      'Software Development',
      'Web Development',
      'Mobile Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Tech Meetups',
      'Developer Networking'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <Toaster />
          <Sonner />
          <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
              {/* Desktop Sidebar - Hidden on mobile */}
              <DesktopSidebar navigationItems={publicNavigationItems} />
              
              <main className="flex-1 flex flex-col min-h-screen w-full md:ml-0">
                {/* Mobile header - Sticky with glassmorphism */}
                <MobileHeader />
                
                {/* Main content with proper margins */}
                <div className="flex-1 md:px-8 lg:px-12 xl:px-16 pb-24 md:pb-8 pt-2 md:pt-0">
                  {children}
                </div>
              </main>
              
              {/* Mobile Bottom Navigation - Floating glassmorphism design */}
              <MobileBottomNavigation navigationItems={publicNavigationItems} />
            </div>
          </SidebarProvider>
          <GlobalLoader />
        </Providers>
      </body>
    </html>
  )
}