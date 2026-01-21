// Nuxt plugin to enforce custom cursor across the entire website
// This prevents any JavaScript or third-party libraries from overriding the cursor

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const cursorValue = "url('/cursor/cursor-diagonal.png') 2 2, auto"

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
