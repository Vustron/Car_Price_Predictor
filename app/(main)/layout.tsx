import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Navbar from '@/components/shared/Navbar';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Car Price Predictor',
	description: 'Car Price Predictor',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
