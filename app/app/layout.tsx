import type { Metadata } from "next";
import { Roboto, Inter, Space_Grotesk, JetBrains_Mono, Calistoga } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { MaterialBackground } from "./components/layout/MaterialBackground";
import { Web3Background } from "./components/layout/Web3Background";
import { SaasBackground } from "./components/layout/SaasBackground";
import { TerminalBackground } from "./components/layout/TerminalBackground";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});
const calistoga = Calistoga({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-calistoga",
});

export const metadata: Metadata = {
  title: "Blackbird Agency — Multi-Agent YouTube SEO Platform",
  description:
    "Premium dashboard for AlphaTraderTV. 19 agents, 6 screens, two design variations.",
};

const themeBootstrap = `
(function(){
  var allowed = { material:1, web3:1, saas:1, terminal:1 };
  try {
    var t = localStorage.getItem('bb-theme');
    if (!allowed[t]) t = 'material';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme','material');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${inter.variable} ${spaceGrotesk.variable} ${jbMono.variable} ${calistoga.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="bg-[rgb(var(--bg))] text-[rgb(var(--fg))] min-h-screen">
        <ThemeProvider>
          <div className="relative min-h-screen">
            <MaterialBackground />
            <Web3Background />
            <SaasBackground />
            <TerminalBackground />
            <div className="relative z-10 flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <Topbar />
                <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
