# Add GitHub sponsors tab to homepage

## Summary

This PR adds a new GitHub sponsors tab to the homepage, styled similarly to the existing tools tab.

## Changes

- ✨ Added new 'Sponsors' tab to the homepage navigation
- 📦 Imported GitHub icon to display in the sponsors section
- 🎨 Created sponsor data structure with different tiers:
  - Gold sponsors ($100+/month)
  - Silver sponsors ($50+/month)
  - Bronze sponsors ($10+/month)
  - Past sponsors
- 💅 Styled the sponsors section with responsive grid layouts
- 📊 Added analytics tracking for sponsor link clicks
- 🔗 Added link to GitHub sponsors page

## Screenshots

The new tab displays sponsors in a hierarchical layout with:
- Gold sponsors in a 2-column grid with descriptions
- Silver sponsors in a 3-column grid
- Bronze sponsors as tags
- Past sponsors in a simple list

## Implementation Details

### Tab Navigation
Added a new `TabsTrigger` for "Sponsors" with the same styling as other tabs:
```tsx
<TabsTrigger
  value="sponsors"
  className={cn(
    "!bg-transparent !border-none !shadow-none",
    "!font-light data-[state=active]:!font-bold transition-all duration-300 ease-out",
    "!text-neutral-400 dark:!text-neutral-400",
    "data-[state=active]:!text-neutral-800 dark:data-[state=active]:!text-neutral-100"
  )}
>
  Sponsors
</TabsTrigger>
```

### Sponsor Data Structure
Created a flexible data structure to handle different sponsor tiers:
```typescript
const sponsors = {
  gold: [
    {
      name: "Sponsor Name",
      description: "Sponsor description",
      link: "https://github.com/sponsor"
    }
  ],
  silver: [...],
  bronze: [...],
  past: [...]
}
```

## Notes

- The sponsor data currently contains example entries that should be replaced with actual sponsors
- The styling matches the existing tools tab for consistency
- All sponsor links open in new tabs and include analytics tracking
- Responsive design ensures proper display on all device sizes

## Testing

- ✅ Build passes without errors
- ✅ Tab navigation works correctly
- ✅ Responsive design tested
- ✅ Analytics tracking implemented for all sponsor links