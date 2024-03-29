import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap" rel="stylesheet" /> 
                <link rel="shortcut icon" href="/images/favicon.ico" />
            </Head>            
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
