export default function AdSenseScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var s=document.createElement('script');s.async=true;s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4070332439185407';s.crossOrigin='anonymous';document.head.appendChild(s);})()`,
      }}
    />
  )
}
