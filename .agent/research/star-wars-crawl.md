# Star Wars Opening Crawl CSS Animation Research

## Key CSS Properties

### 3D Space Setup
- `perspective`: Applied to container (500-800px works well)
- `transform-origin`: Set to `50% 100%` or `bottom` for vanishing point
- `rotateX`: Tilt the text (55-65 degrees creates the classic angle)

### Animation
- `@keyframes crawl`: Animate `translateY` from below viewport to above
- `translateZ`: Adds depth effect (text appears to move away)
- Duration: 60-90 seconds for full crawl
- `linear` timing function for constant speed

### Fade Effect
- `linear-gradient`: Creates fade-out at top using overlay
- Mask goes from transparent at bottom to black at top

## CSS Structure

```css
.crawl-container {
  perspective: 700px;
  perspective-origin: 50% 100%;
  overflow: hidden;
}

.crawl-text {
  transform-origin: 50% 100%;
  transform: rotateX(60deg);
  animation: crawl 60s linear forwards;
}

@keyframes crawl {
  0% { transform: rotateX(60deg) translateY(100%); }
  100% { transform: rotateX(60deg) translateY(-300%); }
}
```

## Adaptations for Pip-Boy

1. **Green phosphor glow**: Use `text-shadow` with green (#33ff00)
2. **Terminal font**: VT323 already in project
3. **CRT effects**: Can overlay existing scanlines
4. **Typewriter variant**: Alternative to scroll - text appears as if typed
5. **Skip button**: Allow users to skip after initial view

## Interactive Option

Instead of pure scroll, consider **typewriter effect**:
- Text appears character by character
- More "computer terminal" feel
- Better for shorter messages
- User can click to skip
