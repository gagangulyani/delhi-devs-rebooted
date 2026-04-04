import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { GlobalLoader } from "@/components/GlobalLoader";

export const metadata: Metadata = {
  title: {
    default: 'Delhi Devs Rebooted - Product Community',
    template: '%s | Delhi Devs Rebooted'
  },
  description: 'A community of builders shipping products. Delhi NCR developer community building in public.',
  keywords: [
    'delhi developers',
    'product community',
    'builders',
    'saas',
    'ai products',
    'developer community delhi',
    'build in public',
    'ship products',
    'delhi devs',
    'tech startup community'
  ],
  authors: [
    {
      name: 'Gagan Deep Singh',
      url: 'https://gagangulyani.com',
    }
  ],
  creator: 'Delhi Devs Rebooted',
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
    title: 'Delhi Devs Rebooted - Product Community',
    description: 'A community of builders shipping products. Join developers building in public.',
    url: 'https://delhidevs.com',
    siteName: 'Delhi Devs Rebooted',
    images: [
      {
        url: '/delhi-devs-thumbail.png',
        width: 1200,
        height: 630,
        alt: 'Delhi Devs Rebooted - Product Community',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delhi Devs Rebooted - Product Community',
    description: 'A community of builders shipping products.',
    creator: '@GaganGulyani',
    images: ['/delhi-devs-thumbail.png'],
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
  category: 'technology',
  classification: 'Developer Product Community',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delhi Devs Rebooted',
    description: 'A community of builders shipping products. Delhi NCR developer community building in public.',
    url: 'https://delhidevs.com',
    logo: 'https://delhidevs.com/delhi-devs-rebooted.png',
    image: 'https://delhidevs.com/delhi-devs-thumbail.png',
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
    areaServed: {
      '@type': 'Place',
      name: 'Delhi NCR'
    },
    sameAs: [
      'https://www.linkedin.com/company/delhi-devs'
    ],
    knowsAbout: [
      'SaaS Products',
      'AI Applications',
      'Mobile Apps',
      'Open Source',
      'Build in Public'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <Providers>
          <Toaster />
          <Sonner />
          <main className="min-h-screen">
            {children}
          </main>
          <GlobalLoader />
        </Providers>
      </body>
    </html>
  )
}