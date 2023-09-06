import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body className="bg-brand-black max-w-5xl mx-auto px-6 text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
