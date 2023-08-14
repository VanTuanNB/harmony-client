import './global.scss';
import Providers from '@/core/redux/rootProvider.component';

export const metadata = {
    title: 'Harmony Music',
    description: 'Harmony music app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
