import React from "react";
import DarkVeil from "./Backgrounds/DarkVeil/darkveil";
import LoadingScreen from "./Components/LoadingScreen";
import PillNav from "./Components/PillNav/pillnav";
import TextPressure from "./TextAnimations/TextPressure/TextPressure";
import TrueFocus from "./TextAnimations/TrueFocus/TrueFocus";

function App() {
  const [loadingDone, setLoadingDone] = React.useState(false);

  return (
    <>
      {/* Background selalu ada */}
      <div className="fixed inset-0 -z-10">
        <DarkVeil />
      </div>

      {/* Loading screen */}
      {!loadingDone && <LoadingScreen onFinish={() => setLoadingDone(true)} />}

      {/* Konten utama */}
      {loadingDone && (
        <div className="relative z-20">

          {/* Navbar */}
         <PillNav
          items={[
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Blog", href: "#blog" },
            { label: "Contact", href: "#contact" },
            ]}
            activeHref="#"
            />

          {/* Isi Halaman */}
          <div className="h-screen w-full flex flex-col items-center justify-center text-center text-white px-4 space-y-6">
  {/* Hello, I'm pakai TextPressure */}
  <TextPressure
    text="Hello, I'm"
    className="text-2xl md:text-3xl font-light"
  />

  {/* Nama biasa */}
  <h1 className="text-4xl md:text-6xl font-bold">
    Zahrah Setia Rafaeyfa Assyla
  </h1>

  {/* Subjudul pakai TrueFocus */}
  <TrueFocus
    text="Web Developer, Mobile Developer, Freelance"
    className="text-lg md:text-xl font-medium text-gray-300"
  />

  {/* Tombol kotak */}
  <div className="flex justify-center gap-4 mt-4">
    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold">
      Get CV
    </button>
    <button className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-md font-semibold">
      Contact Me
    </button>
  </div>
</div>

        </div>
      )}
    </>
  );
}

export default App;
