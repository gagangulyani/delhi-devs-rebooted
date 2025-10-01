import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-orange-950 dark:via-yellow-950 dark:to-red-950 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Big 404 with Indian twist */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
            404
          </h1>
          <div className="text-6xl mb-4">🍛</div>
        </div>

        {/* Funny Indian-themed messages */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Arre yaar! Page gayab ho gayi! 🤷‍♂️
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Looks like this page took a vacation to Goa without telling anyone!
          <br />
          Or maybe it got lost in the Delhi traffic. 🚗💨
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg border border-orange-200 dark:border-orange-800">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
            "Ye page kahaan chali gayi?" - Confused Developer
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't worry, even the best code has bugs sometimes.
            <br />
            This 404 is just a feature, not a bug! 😉🐛
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600">
            <Link href="/">
              <Home className="h-5 w-5" />
              Ghar Laut Jao (Go Home)
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/events">
              <Search className="h-5 w-5" />
              Events Dekho
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/about">
              <Coffee className="h-5 w-5" />
              Chai Peelo
            </Link>
          </Button>
        </div>

        {/* Fun facts section */}
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
          <p>💡 Fun fact: In India, we turn 404s into 200s with some chai and code!</p>
          <p>🎯 Pro tip: Try refreshing, or maybe the page is meditating in the Himalayas 🏔️</p>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center space-x-4 text-2xl">
          <span>🇮🇳</span>
          <span>💻</span>
          <span>☕</span>
          <span>🚀</span>
        </div>
      </div>
    </div>
  );
}