# Architecture rules

- Keep the public home page eager and other public pages lazy inside the shared layout, using router transitions to preserve navigation appearance while reducing initial JavaScript.
- Use vite-imagetools for lossless build-time conversion of opaque PNG sources to WebP; retain original source files, dimensions, JPEGs, and transparent logos to preserve quality and static hosting compatibility.
- Keep backend-backed routes isolated and lazy-loaded; public routes must remain usable without backend activation.