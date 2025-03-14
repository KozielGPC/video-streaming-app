"use client"
import { Suspense } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import the microfrontends
const ReactMicrofrontend = dynamic(() => import("nextMicrofrontend/Home"), {
  ssr: false,
  loading: () => <div className="p-4 border rounded">Loading React microfrontend...</div>,
})

// const AngularMicrofrontend = dynamic(() => import("@/components/angular-microfrontend"), {
//   ssr: false,
//   loading: () => <div className="p-4 border rounded">Loading Angular microfrontend...</div>,
// })

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Microfrontend Architecture Demo</h1>

      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/react-app" className="text-blue-600 hover:underline">
              React App
            </Link>
          </li>
          <li>
            <Link href="/angular-app" className="text-blue-600 hover:underline">
              Angular App
            </Link>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">React Microfrontend</h2>
          <Suspense fallback={<div>Loading React app...</div>}>
            <ReactMicrofrontend />
          </Suspense>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Angular Microfrontend</h2>
          <Suspense fallback={<div>Loading Angular app...</div>}>
            {/* <AngularMicrofrontend /> */}
          </Suspense>
        </div>
      </div>
    </main>
  )
}

