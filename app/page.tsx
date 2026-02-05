export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-11/12 h-auto mx-auto hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/video/hero_bg_video_pc_black.webm"
        />
      </div>
      <div className="w-[95%] h-auto mx-auto block md:hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/video/hero_bg_video_mobile_black.webm"
        />
      </div>
    </div>
  );
}
