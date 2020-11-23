export default function init() {
  /* eslint-disable eslint-comments/no-unlimited-disable */
  /* eslint-disable */
  !function(e,n,t){function r(e){return function(){return t.push(Array.prototype.concat.apply([e],arguments)),t}}function i(){var e=document.createElement(n),t=document.getElementsByTagName(n)[0];e.async=!0,e.src="https://app.crossengage.io/analytics.min.js",t.parentNode.insertBefore(e,t)}var o,a=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];if(t=e.analytics=e.analytics||[],!t.initialize)if(t.invoked)e.console&&console.error&&console.error("CrossEngage snippet included twice.");else{for(t.invoked=!0;o=a.shift();)t[o]=r(o);i()}}(window,"script");
  /* eslint-enable */
  /* eslint-enable eslint-comments/no-unlimited-disable */
}

