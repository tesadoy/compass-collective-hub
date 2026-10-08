# Architecture rules

- Preserve eager public-page loading and existing scroll behavior; optimize download payloads without introducing navigation loading states.
- Use vite-imagetools for lossless build-time conversion of opaque PNG sources to WebP; retain original source files, dimensions, JPEGs, and transparent logos to preserve quality and static hosting compatibility.
- Keep backend-backed routes isolated and lazy-loaded; public routes must remain usable without backend activation.