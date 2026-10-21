import type { Metadata, Viewport } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const body = Google_Sans({
  variable: "--font-sta-body",
  subsets: ["armenian", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Demo Academy — Կայքի դեմո տարբերակ ուսումնական կենտրոնների համար",
    template: "%s | Demo Academy",
  },
  description:
    "Անգլերենի, գերմաներենի, ֆրանսերենի, իսպաներենի, չինարենի և ռուսերենի օնլայն դասընթացներ։ ԿԳՄՍՆ-ի կողմից երաշխավորված ծրագրեր, CLT մեթոդաբանություն, անվճար մակարդակի որոշում և փորձնական դաս։",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#070c1a" },
  ],
};

const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var p=localStorage.getItem('palette');if(p)d.dataset.palette=p;var t=localStorage.getItem('theme');var dark=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hy" suppressHydrationWarning className={`${body.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
