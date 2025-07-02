import PageNavigation from "@/app/components/PageNavigation";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12 bg-gray-50">
      <h2 className="text-lg font-semibold">Page Navigation</h2>
      <PageNavigation />
    </main>
  );
}
