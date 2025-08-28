import React from "react";
import DarkVeil from "./Components/DarkVeil/darkveil";
import LoadingScreen from "./Components/LoadingScreen";
import PillNav from "./Components/PillNav/pillnav";
import TrueFocus from "./TextAnimations/TrueFocus/TrueFocus";
import StarBorder from "./Animations/StarBorder/starborder";
// import Lanyard from "./Components/Lanyard/lanyard";
import ElectricBorder from "./Animations/ElectricBorder/ElectricBorder";
import { Linkedin, Github, Instagram } from "lucide-react";

function App() {
  const [loadingDone, setLoadingDone] = React.useState(false);

  return (
    <>
      {/* Background Wrapper */}
      <div className="absolute inset-0 -z-10">
      { /* Bagian Hero pakai DarkVeil */}
        <div className="h-screen w-full">
          <DarkVeil />
        </div>
        
        {/* Setelah scroll, jadi hitam */}
        <div className="h-[500vh] w-full bg-black"></div>
      </div>

      {/* Loading Screen */}
      {!loadingDone && <LoadingScreen onFinish={() => setLoadingDone(true)} />}

      {/* Konten Utama */}
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
          <section id="home">
          <div className="h-screen w-full flex flex-col items-center justify-center text-center text-white px-4 space-y-6">
            {/* Nama Utama */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 ">
              Zahrah Setia Rafaeyfa Assyla
            </h1>

            {/* Subjudul pakai TrueFocus */}
            <TrueFocus
              className="text-lg md:text-xl font-medium text-gray-300"
            />

            <p className="text-gray-300 text-lg mb-6">
              Building interactive web & mobile experiences with passion 🚀
            </p>

            {/* Tombol */}
            <div className="flex justify-center gap-4 mt-4">
              <StarBorder
              borderColor="purple"
              glowColor="rgba(168, 85, 247, 0.6)" // ungu glow
              borderWidth={2}
              radius={24}
              padding={32}
              >
                <a href="/cv.pdf" download>
                  Get My CV
                </a>
              </StarBorder>
              <StarBorder>
                <a href="mailto:yourname@email.com">
                   Contact Me
                </a>
              </StarBorder>
            </div>
              {/* Ikon Sosial Media */}
            <div className="flex gap-6 mt-2">
              <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-purple-400 transition"
              >
                <Linkedin size={28} />
              </a>
              <a
              href="https://github.com/ZahrahSetiaRafaeyfaAssyla"
              target="_blank"
              className="hover:text-purple-400 transition"
              >
                <Github size={28} />
              </a>
              <a
              href="https://www.instagram.com/zhstrfas/"
              target="_blank"
              className="hover:text-purple-400 transition"
              >
                <Instagram size={28} />
              </a>
            </div>
          </div>
        </section>

        {/* Section About */}
         <section
            id="about"
            className="min-h-screen w-full flex items-center justify-center bg-black px-6"
          >
            <ElectricBorder className="w-full max-w-5xl p-10 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Kiri: Text */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-400">
                    About Me
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Hi 👋, I’m Zahrah Setia Rafaeyfa Assyla, a{" "}
                    <span className="font-semibold text-white">
                      Web & Mobile Developer
                    </span>{" "}
                    who loves building modern, interactive, and responsive
                    applications. I enjoy exploring new technologies and turning
                    ideas into real-world digital products 🚀.
                  </p>
                </div>

                {/* Kanan: Lanyard
                <div className="flex-shrink-0">
                  <Lanyard
                    name="Zahrah Setia Rafaeyfa Assyla"
                    role="Web & Mobile Developer"
                    avatarUrl="/profile.png" // ganti sama foto kamu
                  />
                </div> */}
              </div>
            </ElectricBorder>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
