# Images Directory

This directory contains the team logo and other images for the website.

## Required Files:

### team-logo.png
- **File**: `team-logo.png`
- **Purpose**: Team Robotics SKNCOE logo
- **Usage**: Header navigation, loading screen, favicon
- **Recommended size**: 200x200 pixels or larger (will be resized by CSS)
- **Format**: PNG with transparent background preferred

## How to Add Your Logo:

1. Copy your team logo file to this directory
2. Rename it to `team-logo.png`
3. Make sure it has a transparent background for best results
4. The website will automatically use it in:
   - Navigation header
   - Loading screen
   - Browser favicon

## Gallery and Project Images

To add images to the gallery and projects sections, follow these naming conventions:

### Gallery Images

- **File Name Format**: `gallery-<number>.jpg` (e.g., `gallery-1.jpg`, `gallery-2.jpg`)
- **Purpose**: Images to be displayed in the gallery section.
- **Usage**: The website will automatically look for images with this naming pattern.

### Project Images

- **File Name Format**: `project-<name>.jpg` (e.g., `project-alpha.jpg`, `project-beta.jpg`)
- **Purpose**: Images for specific projects.
- **Usage**: The website will use these images in the projects section. Make sure the name in the file corresponds to the project name.

## File Structure:
```
images/
├── team-logo.png          (Your team logo)
├── gallery-1.jpg          (Gallery image)
├── gallery-2.jpg          (Gallery image)
├── gallery-3.jpg          (Gallery image)
├── gallery-4.jpg          (Gallery image)
├── gallery-5.jpg          (Gallery image)
├── gallery-6.jpg          (Gallery image)
├── project-alpha.jpg      (Project image)
├── project-beta.jpg       (Project image)
├── project-gamma.jpg      (Project image)
└── README.md             (This file)
```

## Notes:
- The logo will be automatically resized by CSS to fit different areas
- PNG format with transparency works best
- The website is optimized for square logos but will work with any aspect ratio
