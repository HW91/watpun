# Wat Punyawanaram - sample website

A sample website for Wat Punyawanaram (4490 Aurora Rd, Melbourne, FL 32934).
Plain HTML, CSS and JavaScript. No build step. English and Thai.

## Put it online with GitHub Pages
1. Open the repository on GitHub, then **Settings > Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Pick the branch and the `/ (root)` folder, then **Save**.
4. After a minute the site address appears at the top of that page.

## Where things live
- `*.html` - one file per page (home, about, events, gallery, teaching, shop, project, contact, donate)
- `js/lang-en.js` and `js/lang-th.js` - all the words on the site, in English and Thai
- `js/layout.js` - the top bar, menu and footer shared by every page
- `css/` - colors and layout (colors are at the top of `css/base.css`)
- `images/` - placeholder pictures. Replace any file with a real photo of the same name (keep the `.svg` name, or update the page that uses it).

## Sample content to replace
Hours, event dates, the featured project, monk bio, shop items and all pictures are samples.
The Thai wording is a draft and should be reviewed by a Thai speaker.
Buy, donate and message buttons only show a "For Demo Only" popup.

## After changing styles or scripts
Each page links its CSS and JS files with `?v=4` on the end. When you change a `.css` or `.js` file, raise that number in the `.html` files (for example to `?v=5`) so visitors' browsers load the new version instead of an old saved copy.
