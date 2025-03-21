import { Suspense } from "react";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { VideosList } from "@/components/VideosList";

//cache
export default function Home({searchParams}: {searchParams: {search: string}}) {
  // const { search } = await searchParams
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Suspense
          fallback={new Array(15).fill(null).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        >
          {/* <div>Frontend videos</div> */}
          <VideosList search={""}/>
        </Suspense>
      </div>
    </main>
  );
}

//utility first
//css cascata