import dynamic from "next/dynamic";

const OtherFrontend = dynamic(() => import("teste/Home"), {
  ssr: false,
  loading: () => (
    <div className="p-4 border rounded">Loading Angular microfrontend...</div>
  ),
});

export default function LoginPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>
      <OtherFrontend />
    </main>
  );
}
