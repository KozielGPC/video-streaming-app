"use client"
import { Suspense } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import the microfrontends
// const ReactMicrofrontend = dynamic(() => import("login/Home"), {
//   ssr: false,
//   loading: () => <div className="p-4 border rounded">Loading React microfrontend...</div>,
// })

const OtherFrontend = dynamic(() => import("teste/Home"), {
  ssr: false,
  loading: () => <div className="p-4 border rounded">Loading Angular microfrontend...</div>,
})

const VideoPlayer = dynamic(() => import("video-player/Home"), {
  ssr: false,
  loading: () => <div className="p-4 border rounded">Loading video player...</div>,
})

//@ts-expect-error lazy
// const Login = lazy(() => import("login/Home"));

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
            {/* <ReactMicrofrontend /> */}
            <VideoPlayer />
            {/* <Login /> */}
          </Suspense>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Angular Microfrontend</h2>
          <Suspense fallback={<div>Loading Angular app...</div>}>
            <OtherFrontend />
          </Suspense>
        </div>
      </div>
      <div className="border rounded-lg p-6 shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4">Angular Video Player MFE</h2>
        <iframe
          src="http://localhost:4200/"
          title="Angular Video Player MFE"
          width="100%"
          height="600"
          style={{ border: '1px solid #ccc', borderRadius: '8px' }}
        />
      </div>
    </main>
  )
}

