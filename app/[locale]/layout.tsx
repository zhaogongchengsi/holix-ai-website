import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { ThemeProvider } from "@/components/theme-provider"
import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"
import "../globals.css"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      default: `${t('title')} - ${t('subtitle')}`,
      template: `%s | ${t('title')}`
    },
    description: t('description'),
    keywords: ["Holix AI", "AI Workspace", "Electron", "Desktop App", "Local First", "AI Assistant", "Skills", "Multi-Model"],
    authors: [{ name: "Holix AI Team" }],
    creator: "Holix AI",
    publisher: "Holix AI",
    openGraph: {
      type: "website",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `/${locale}`,
      title: `${t('title')} - ${t('subtitle')}`,
      description: t('description'),
      siteName: "Holix AI",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Holix AI"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${t('title')} - ${t('subtitle')}`,
      description: t('description'),
      images: ["/logo.png"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    manifest: "/manifest.json"
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // 验证语言参数
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 获取翻译消息
  const messages = await getMessages();

  return (
    <html 
      lang={locale}
      suppressHydrationWarning
      className={`antialiased ${fontMono.variable} font-sans ${inter.variable}`}
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
