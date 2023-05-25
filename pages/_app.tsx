import Head from 'next/head';
import { AppProps } from 'next/app';
import { useAuthMiddleware } from '@wundergraph/nextjs';
import { withWunderGraph } from '../components/generated/nextjs';
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, useAuth} from '@clerk/nextjs'
import { Middleware } from 'swr';



export const useWunderGraphClerk: Middleware = (useSWRNext) => {
  const auth = useAuth();

  return useAuthMiddleware(useSWRNext, async () => {
    return auth.getToken({ template: 'wundergraph' });
  });
};



function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script src="https://cdn.tailwindcss.com"></script>
			</Head>
			<main className="flex dark:bg-slate-800 min-h-screen justify-center">
				<SignedIn>
					<Component {...pageProps} />
				</SignedIn>
				<SignedOut>
					<RedirectToSignIn />
				</SignedOut>
			</main>
		</ClerkProvider>
	);
}

export default withWunderGraph(MyApp,{
	use: [useWunderGraphClerk]
})