import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Murilo Araujo - Software Developer',
	description:
		'Welcome to my portfolio! I am a passionate software developer with a focus on clean, minimal, and effective solutions. I believe in the power of simplicity and thoughtful design to create impactful digital experiences.',
	keywords: [
		'Software Developer',
		'Clean Code',
		'Minimal Design',
		'Modern Development',
		'Web Development',
		'User Experience',
		'Design Systems',
		'JavaScript',
		'TypeScript',
		'React',
		'Next.js',
		'Performance',
		'Accessibility',
		'Minimalist Portfolio',
		'[Your Name]',
	],
	authors: [{ name: '[Your Name]' }],
	creator: '[Your Name]',
	openGraph: {
		title: '[Your Name] - Software Developer Portfolio',
		description: 'Passionate software developer creating clean, minimal, and effective digital solutions. Explore my work and development philosophy.',
		url: 'https://your-domain.com',
		siteName: '[Your Name] - Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: '[Your Name] - Modern Minimal Portfolio',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: '[Your Name] - Software Developer',
		description: 'Passionate software developer creating clean, minimal, and effective digital solutions. Explore my work and development philosophy.',
		creator: '@yourusername',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export const dynamicParams = false;
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pt-BR' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale: string }>; 
}) {
  // Next.js passes params as a promise in LayoutProps
  const resolvedParams = (await params) || { locale: 'en' };
  const locale = resolvedParams.locale;
  const enMessages = (await import('../locales/en.json')).default;
  let messages = enMessages;
  // Load locale-specific messages only when a valid locale is provided and not the default
  if (locale && locale !== 'en') {
    try {
      const localeMessages = (await import(`../locales/${locale}.json`)).default;
      messages = { ...enMessages, ...localeMessages };
    } catch {
      // Fallback to default messages on missing locale file
      messages = enMessages;
    }
  }

  // Provide 'now' and 'timeZone' to avoid calling runtime config
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          now={now}
          timeZone={timeZone}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
