// Nuxt plugin to enforce custom cursor across the entire website
// This prevents any JavaScript or third-party libraries from overriding the cursor

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const cursorValue = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAwoAMABAAAAAEAAAAwAAAAANs3bAwAAAHJaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj40NTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj40NTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoJ4vLOAAADiUlEQVRoBe2XTWhUVxTHz7lf85FJYqImpYimMRHrVyH0wwi1DqSxxbgRMqUIFkHsQnDjUqqz0hZKd927KLSdLkqF2kIpGYqYlhC0YpCGdGGcinEmOpPpm8nMe++e3gGhm5SZeXkohXvh8eBx7jn/8zv3nnsfgB2WgCVgCVgCloAlYAlYApbA/5NAOs0G0lNRAMLnlQBbT+AtpV2RSMW5vCP9/UuQnlPr8RV0Lg86ESYz/MUN8b0o9TEgOveCKCxuevtksXBwqALZLAX22+bE4BX4JuWvlOkuSjQPIMXoUxlxjuze9lYfpKdEmzoCmwevgAlZnv3S7U0evckifIIzGAIJr0d1caF/o1N4OLLXeRaVCF6Bp8zm0+8vc49OmaV0nymv342yC1ri/n2Dg7HAWNuYGE73SGfUSD9LekJfFMrbDpyW9Ir82H2UuAVma5NXwb6NS/dy4+PuwvBwrQ19TU3DSQAARzM/9lTKpTEWcT/jCruM4xn3Mc/5TxSR9COsEx5J5f7RuamcyR79sNBUWYsG615CT+PQ9JN7ZRH18kyiBqbjFPN2ib76HtHnDrAYDDPuHiRFB1a1OPzutWuRFvU1NQsrAYDTpz3iOICNtsCRGEKCx3UX7625mHDvIqevkOssosxVYzG/qbIWDUJtd0wSI9SMMe2RgL+QEbEOnYjE3KLrez/Xi7U/OztfrmaTSa9FfU3NwqtANss1+TlkGkFiwbyvA4PfkaEARUNSwCvxfqmM+FA3cWgJTObzJGMGv0IfUd/RBF+b4/hzAv0L+robuXiHe2L80M1vuw3WsJpHeI4aovb/8MUJTd55czLfRuV+VF6q31cbojs5QlIQfw9Im1ObXVlA57et86I229OjR7eAmj6QqjZdK/9hEFoFGv7NGqqaXVDWAL+6Kzo/lzrzd7dkdxSLZjTqKxpwjyY8vm01PiEGxRuv9TojXtEZOzTVuNEGG+ElQASr6M8yjg74sGjkVBqSssmTqzeWZY509TvToT4Bz39TCLjIgF9CwKuSY8nzF7eCuZoHSSHQpDUDobnPdcVdBvqqUvW52YmefzdrKuXPlDY/KK04P6HgZ83vw7L5g5iuVauv+t3i1vWxD+ZNAqZw7Y/QNlMj9CRleH7G2Zzv6Hg8tztVX0MOjt7IRPPFhI7zgrh9+ISzho39ZAlYApaAJWAJWAKWgCVgCVgClkBLBP4B9u1HkfPLYnUAAAAASUVORK5CYII=') 2 2, auto"

  // Function to enforce cursor style on an element
  const enforceCursorOnElement = (el: HTMLElement) => {
    if (el && el.style) {
      el.style.setProperty('cursor', cursorValue, 'important')
    }
  }

  // Function to enforce cursor style globally
  const enforceCursor = () => {
    enforceCursorOnElement(document.documentElement)
    enforceCursorOnElement(document.body)
  }

  // Inject a high-priority style element to override any other styles
  const injectCursorStyles = () => {
    const existingStyle = document.getElementById('custom-cursor-override')
    if (existingStyle) return // Already injected

    const style = document.createElement('style')
    style.id = 'custom-cursor-override'
    style.textContent = `
      html, body,
      *, *::before, *::after,
      *:hover, *:focus, *:active,
      header, header *, nav, nav *,
      [data-radix-popper-content-wrapper], [data-radix-popper-content-wrapper] *,
      [data-radix-menu-content], [data-radix-menu-content] *,
      [data-radix-dropdown-menu-content], [data-radix-dropdown-menu-content] *,
      [data-radix-dropdown-menu-trigger], [data-radix-dropdown-menu-trigger] *,
      [data-state], [data-state] *,
      [data-state="open"], [data-state="open"] *,
      [data-state="closed"], [data-state="closed"] *,
      [data-highlighted], [data-highlighted] *,
      [role="menu"], [role="menu"] *, [role="menuitem"], [role="menuitem"] *,
      .cursor-default, .cursor-pointer,
      button, a, [role="button"] {
        cursor: ${cursorValue} !important;
      }
      input[type="text"], input[type="email"], input[type="password"],
      input[type="search"], input[type="tel"], input[type="url"],
      input[type="number"], textarea, [contenteditable="true"] {
        cursor: text !important;
      }
    `
    document.head.appendChild(style)
  }

  // Inject styles immediately
  injectCursorStyles()

  // Apply immediately
  enforceCursor()

  // Use MutationObserver to detect and immediately revert any cursor changes
  const observer = new MutationObserver((mutations) => {
    let needsEnforce = false
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        needsEnforce = true
        // Also enforce on the specific element that changed
        enforceCursorOnElement(mutation.target as HTMLElement)
      }
    }
    if (needsEnforce) {
      enforceCursor()
    }
  })

  // Observe the entire document for style changes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style'],
    subtree: true
  })

  // Enforce cursor on mousemove over header area (catches hover changes immediately)
  let lastEnforceTime = 0
  document.addEventListener('mousemove', (e) => {
    const now = Date.now()
    // Throttle to every 100ms to avoid performance issues
    if (now - lastEnforceTime > 100) {
      lastEnforceTime = now
      // Check if we're over the header
      const target = e.target as HTMLElement
      if (target && target.closest('header')) {
        enforceCursor()
        enforceCursorOnElement(target)
      }
    }
  }, { passive: true })

  // Enforce on mouseenter for header elements
  document.addEventListener('mouseenter', (e) => {
    const target = e.target as HTMLElement
    if (target && target.closest('header')) {
      enforceCursor()
      enforceCursorOnElement(target)
    }
  }, { capture: true, passive: true })

  // Also re-apply on focus/visibility changes (browser may reset cursor)
  document.addEventListener('visibilitychange', enforceCursor)
  window.addEventListener('focus', enforceCursor)

  // Re-apply periodically as a fallback (every 500ms for faster response)
  setInterval(enforceCursor, 500)
})
