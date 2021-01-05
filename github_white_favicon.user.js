// ==UserScript==
// @name         GitHub: White favicon
// @version      1.8.0
// @author       tobbez
// @match        https://github.community/*
// @match        https://*.github.com/*
// @match        https://github.com/*
// @match        https://github.blog/*
// @grant        none
// @downloadURL  https://gist.github.com/tobbez/017bc8b455095f8e4b4f973b09d33ce2/raw/github_white_favicon.user.js
// @updateURL    https://gist.github.com/tobbez/017bc8b455095f8e4b4f973b09d33ce2/raw/github_white_favicon.user.js
// ==/UserScript==

/*
 * Replaces the icon for github sites with a white one.
 *
 * This is for browsers with the dark theme enabled.
 *
 * To install this script, first get the Violentmonkey or
 * Tampermonkey addon, then click the 'Raw' link.
 */

function get_url_filename(url) {
  let u = new URL(url);
  let p = u.pathname.split('/');
  return p[p.length - 1];
}

(function() {
  'use strict';

  let icon_data = `\
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z" fill="#FFFFFF"/>
</svg>`;

  let icon_data_pending = `\
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 16C0 7.16 7.16 0 16 0C24.84 0 32 7.16 32 16C32 16.3358 31.9896 16.6693 31.9692 17H26.1121C26.1957 16.44 26.24 15.8283 26.24 15.16C26.24 13.4 25.62 11.98 24.6 10.86C24.76 10.46 25.32 8.82 24.44 6.62C24.44 6.62 23.1 6.18 20.04 8.26C18.76 7.9 17.4 7.72 16.04 7.72C14.68 7.72 13.32 7.9 12.04 8.26C8.98 6.2 7.64 6.62 7.64 6.62C6.76 8.82 7.32 10.46 7.48 10.86C6.46 11.98 5.84 13.42 5.84 15.16C5.84 20.6387 8.82119 22.3187 12 22.8976V25.2442C11.0224 25.6632 8.83035 26.2166 7.44 23.88C7.14 23.4 6.24 22.22 4.98 22.24C3.64 22.26 4.44 23 5 23.3C5.68 23.68 6.46 25.1 6.64 25.56C6.95947 26.4585 7.99655 28.1743 12 27.4437V30.6814C11.8951 31.0116 11.5751 31.2911 10.94 31.18C4.58 29.06 0 23.08 0 16Z" fill="#FFFFFF"/>
<circle cx="26" cy="26" r="5" fill="#B78F05"/>
</svg>`;

  let icon_data_success = `\
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 16C0 7.16 7.16 0 16 0C23.037 0 29.0094 4.53712 31.1529 10.8471L26.2271 15.773C26.2356 15.5741 26.24 15.3698 26.24 15.16C26.24 13.4 25.62 11.98 24.6 10.86C24.76 10.46 25.32 8.82 24.44 6.62C24.44 6.62 23.1 6.18 20.04 8.26C18.76 7.9 17.4 7.72 16.04 7.72C14.68 7.72 13.32 7.9 12.04 8.26C8.98 6.2 7.64 6.62 7.64 6.62C6.76 8.82 7.32 10.46 7.48 10.86C6.46 11.98 5.84 13.42 5.84 15.16C5.84 20.6387 8.82119 22.3187 12 22.8976V25.2442C11.0224 25.6632 8.83035 26.2166 7.44 23.88C7.14 23.4 6.24 22.22 4.98 22.24C3.64 22.26 4.44 23 5 23.3C5.68 23.68 6.46 25.1 6.64 25.56C6.95947 26.4585 7.99655 28.1743 12 27.4437V30.6814C11.8951 31.0116 11.5751 31.2911 10.94 31.18C4.58 29.06 0 23.08 0 16Z" fill="#FFFFFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.7071 21.2071L20.5 31.4142L15.2929 26.2071L16.7071 24.7929L20.5 28.5858L29.2929 19.7929L30.7071 21.2071Z" fill="#00791C"/>
</svg>`;


  let icon_data_failure = `\
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 16C0 7.16 7.16 0 16 0C24.1626 0 30.8929 6.10479 31.8764 14H26.1444C25.9339 12.7632 25.3856 11.7226 24.6 10.86C24.76 10.46 25.32 8.82 24.44 6.62C24.44 6.62 23.1 6.18 20.04 8.26C18.76 7.9 17.4 7.72 16.04 7.72C14.68 7.72 13.32 7.9 12.04 8.26C8.98 6.2 7.64 6.62 7.64 6.62C6.76 8.82 7.32 10.46 7.48 10.86C6.46 11.98 5.84 13.42 5.84 15.16C5.84 20.6387 8.82119 22.3187 12 22.8976V25.2442C11.0224 25.6632 8.83035 26.2166 7.44 23.88C7.14 23.4 6.24 22.22 4.98 22.24C3.64 22.26 4.44 23 5 23.3C5.68 23.68 6.46 25.1 6.64 25.56C6.95947 26.4585 7.99655 28.1743 12 27.4437V30.6814C11.8951 31.0116 11.5751 31.2911 10.94 31.18C4.58 29.06 0 23.08 0 16Z" fill="#FFFFFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.0858 24.5L18.2929 29.2929L19.7071 30.7071L24.5 25.9142L29.2929 30.7071L30.7071 29.2929L25.9142 24.5L30.7071 19.7071L29.2929 18.2929L24.5 23.0858L19.7071 18.2929L18.2929 19.7071L23.0858 24.5Z" fill="#AB000D"/>
</svg>`;


  let icon_map = new Map([
    ['favicon.svg', `data:image/svg+xml;base64,${btoa(icon_data)}`],
    ['favicon-pending.svg', `data:image/svg+xml;base64,${btoa(icon_data_pending)}`],
    ['favicon-success.svg', `data:image/svg+xml;base64,${btoa(icon_data_success)}`],
    ['favicon-failure.svg', `data:image/svg+xml;base64,${btoa(icon_data_failure)}`],
    ['25b1992f021c82f730efb5822ae795665d2e20d7_2_32x32.png', `data:image/svg+xml;base64,${btoa(icon_data)}`], // github.community
    ['favicon.ico', `data:image/svg+xml;base64,${btoa(icon_data)}`], // docs.github.com
    ['favicon-3dcd2c977a91b2e3f396b300c5ff0d572295ca632ddb7ba1adcacc1ea68dd5c0.ico', `data:image/svg+xml;base64,${btoa(icon_data)}`], // support.github.com
    ['cropped-github-favicon-512.png', `data:image/svg+xml;base64,${btoa(icon_data)}`], // github.blog
  ]);

  function update_favicon () {
    let icon_links = document.querySelectorAll('link[rel~="icon"]:not([rel~="alternate"])');
    for (let icon_link of icon_links) {
      let fname = icon_map.get(get_url_filename(icon_link.href));
      if (fname !== undefined) {
        icon_link.setAttribute('href', fname);
      }
    }
  }

  let icon_link = document.querySelector('link[rel~="icon"]:not([rel~="alternate"])');
  let mutobs = new MutationObserver(update_favicon);
  mutobs.observe(icon_link, {
    attributes: true,
  });

  update_favicon();
})();
