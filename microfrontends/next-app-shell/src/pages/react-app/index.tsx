import { Suspense } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import the React microfrontend
const ReactMicrofrontend = dynamic(() => import("@/components/react-microfrontend"), {
  ssr: false,
  loading: () => <div className="p-4 border rounded">Loading React microfrontend...</div>,
})

export default function ReactAppPage() {
  return (
    <main className="container mx-auto p-6">
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6">React Microfrontend Page</h1>

      <div className="border rounded-lg p-6 shadow-sm">
        <Suspense fallback={<div>Loading React app...</div>}>
          <ReactMicrofrontend />
        </Suspense>
      </div>
    </main>
  )
}

