import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Njordr Exteriors</title>
        <meta name="description" content="Njordr Exteriors offers top-notch exterior renovation services in Winnipeg. Transform your home with our expert craftsmanship and personalized service." />
        
        {/* <!-- Open Graph Meta Tags --> */}
        <meta property="og:title" content="Njordr Exteriors || Winnipeg's Premier Exterior Renovation Specialists" />
        <meta property="og:description" content="Transform your home's exterior in Winnipeg with Njordr Exteriors. Quality craftsmanship and personalized service." />
        <meta property="og:image" content="/images/BigShiny.png" />
        <meta property="og:url" content="https://njordr.ca/" />
        <meta property="og:type" content="website" />
        
        {/* <!-- Twitter Card Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Njordr Exteriors" />
        <meta name="twitter:description" content="Transform your home's exterior in Winnipeg with Njordr Exteriors. Quality craftsmanship and personalized service." />
        <meta name="twitter:image" content="/images/BigShiny.png" />
        
        <link rel="icon" type="image/x-icon" href="/njordr.ico" />
        <link rel="stylesheet" href="/styles.css" />
        <link href="https://fonts.googleapis.com/css2?family=Norse:wght@700&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/images/fancywood.webp" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
