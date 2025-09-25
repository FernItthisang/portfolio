# Portfolio with Google Sheets CMS

This portfolio uses Google Sheets as a Content Management System (CMS) to dynamically load content and images. This makes it easy to update your portfolio without touching any code.

## Setup Instructions

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Portfolio CMS" or something similar
3. Make sure the first sheet is named "Portfolio"

### 2. Set Up the Sheet Structure

#### Projects Section (Columns A-Z)
Set up your projects with these column headers in row 1:

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | Title | Project title | "Companion, Cohabitant and Continuum (Cee)" |
| B | Date | Project date/period | "Fall 2024 - Spring 2025" |
| C | Description | Project description (use \n for line breaks) | "Cee is not about creating a better robotic vacuum..." |
| D | Thumbnail | Thumbnail image URL | "assets/thumbnail.png" |
| E | Images | Comma-separated image URLs | "assets/thumbnail.png,assets/demo.gif,assets/about.png" |
| F | Video | Video URL (optional) | "assets/animation.mp4" |
| G | External Link | External project link (optional) | "https://example.com/project" |

#### About Section
Add this section at the bottom of your sheet:

| Column A | Column B |
|----------|----------|
| ABOUT_SECTION | |
| Name | Fern Itthisang |
| Greeting | Hello! I'm Fern Itthisang |
| Introduction | Currently, I'm a designer who is passionate about data visualization... |
| Current Status | Right now, I'm pursuing my studies in Computational Design Practices (CDP) at GSAPP, Columbia University. |
| Skills | Data Visualization, UX/UI Design, Interaction Design, AI and Coding, Storytelling through Design |
| Email | pakjira[dot]itt[at]gmail[dot]com |
| END_ABOUT | |

### 3. Get Google Sheets API Access

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

### 4. Configure the Portfolio

1. Open `script.js`
2. Replace `YOUR_GOOGLE_SHEET_ID` with your actual sheet ID
   - The sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Replace `YOUR_GOOGLE_API_KEY` with your actual API key

### 5. Make Your Sheet Public

1. In your Google Sheet, click "Share" in the top right
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Click "Done"

## Example Sheet Content

Here's what your Google Sheet should look like:

### Row 1 (Headers):
```
Title | Date | Description | Thumbnail | Images | Video | External Link
```

### Row 2 (Project 1):
```
Companion, Cohabitant and Continuum (Cee) | Fall 2024 - Spring 2025 | Cee is not about creating a better robotic vacuum, and it's not just a device. Cee goes beyond cleaning the space—it acknowledges that there is culture behind the act of cleaning. | assets/thumbnail.png | assets/thumbnail.png,assets/demo.gif,assets/about.png | | https://gsapp-cdp.github.io/archive/projects/2025/companion-cohabitant-and-continuum/
```

### Row 3 (Project 2):
```
The Roomba Eye View | Fall 2024 | A unique perspective on urban spaces through the lens of a Roomba vacuum cleaner... | assets/0090.png | | assets/animation.mp4 |
```

### About Section (at bottom):
```
ABOUT_SECTION
Name | Fern Itthisang
Greeting | Hello! I'm Fern Itthisang
Introduction | Currently, I'm a designer who is passionate about data visualization, interactive design, and creating human-centric digital experiences...
Current Status | Right now, I'm pursuing my studies in Computational Design Practices (CDP) at GSAPP, Columbia University.
Skills | Data Visualization, UX/UI Design, Interaction Design, AI and Coding, Storytelling through Design
Email | pakjira[dot]itt[at]gmail[dot]com
END_ABOUT
```

## Features

- **Dynamic Content Loading**: All content is loaded from Google Sheets
- **Image Support**: Multiple images per project with carousel
- **Video Support**: Embedded videos for projects
- **External Links**: Links to external project pages
- **Responsive Design**: Works on all device sizes
- **Fallback Data**: If API fails, shows static fallback content
- **Easy Updates**: Just edit the Google Sheet to update your portfolio

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript with CMS functionality
├── assets/             # Image and video files
│   ├── thumbnail.png
│   ├── demo.gif
│   └── ...
└── README.md           # This file
```

## Troubleshooting

### API Key Issues
- Make sure your API key is correct
- Ensure the Google Sheets API is enabled
- Check that your sheet is publicly accessible

### Content Not Loading
- Verify your sheet structure matches the expected format
- Check browser console for error messages
- Ensure all required columns are present

### Images Not Showing
- Make sure image URLs are correct
- Images should be accessible via the URLs provided
- Consider hosting images on a CDN for better performance

## Security Notes

- Your API key will be visible in the JavaScript code
- For production use, consider using a backend service to proxy the API calls
- The Google Sheets API has usage limits (1000 requests per 100 seconds per user)

## Customization

You can customize the portfolio by:
- Modifying the CSS in `styles.css`
- Adding new columns to the Google Sheet
- Extending the JavaScript functionality in `script.js`
- Adding new sections or features

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Sheet structure
3. Test your API key with a simple request
4. Ensure all files are properly linked in your HTML 