const ADSENSE_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4070332439185407'

export default function AdSenseScript() {
  return (
    <>
      {/*
        通过 div + dangerouslySetInnerHTML 注入原始 script 标签
        绕过 React 19 的脚本 hoisting，让 AdSense 验证机器人能匹配到精确格式
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<script async src="${ADSENSE_SRC}" crossorigin="anonymous"><\\/script>`,
        }}
      />
      {/*
        动态注入可执行的 script — 上面 innerHTML 里的 script 不会执行
        这个是给浏览器真实加载 AdSense SDK 用的
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var s=document.createElement('script');s.async=true;s.src='${ADSENSE_SRC}';s.crossOrigin='anonymous';document.head.appendChild(s);})()`,
        }}
      />
    </>
  )
}
