# Level 4 Configuration & Setup Guide

## 🔧 System Configuration

### Environment
- **Node.js**: v16+ required
- **npm**: v7+ required
- **React**: 19.1.1
- **Tailwind CSS**: 4.1.16
- **Vite**: 7.1.7

### Browser Requirements
- Modern browser with HTML5 audio support
- localStorage enabled
- JavaScript enabled
- ES6+ support

## 📦 Installation & Setup

### Initial Setup
```bash
# 1. Navigate to project directory
cd "c:\Users\ASUS\New folder"

# 2. Install dependencies (if not already done)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5174/
```

### Production Build
```bash
# Build optimized version
npm run build

# Preview production build locally
npm run preview

# Output: dist/ folder with optimized files
```

## 🎵 Audio File Management

### Adding New Audio Files

1. **Place audio files in `/public` folder**
   ```
   public/
   ├── your-new-audio.mp3
   ├── ElevenLabs_2025-11-11T13_17_58_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3
   └── ...
   ```

2. **Update challenges array in ListeningChallenge.jsx**
   ```javascript
   const challenges = [
     {
       id: 1,
       audio: '/your-new-audio.mp3',
       correctAnswer: 'Exact sentence to match'
     }
   ];
   ```

3. **Audio Format Recommendations**
   - Format: MP3
   - Bitrate: 128kbps
   - Sample Rate: 44.1kHz
   - Size: 100-200KB per file
   - Duration: 5-15 seconds per clip

### Audio Processing Tools
- **Audacity** (Free): Edit and export MP3s
- **FFmpeg** (Free): Command-line audio conversion
- **Elevenlabs** (Paid): Text-to-speech generation

## 🎨 Styling Customization

### Modifying Colors

Edit color references in `ListeningChallenge.jsx`:

```javascript
// Current colors - modify these classNames
'bg-blue-50'      // Light blue background
'border-blue-500' // Blue border
'text-green-600'  // Green text
'text-red-600'    // Red text
'text-yellow-700' // Yellow text
'bg-gray-100'     // Gray background
```

### Tailwind Configuration

File: `tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors here
        'custom-blue': '#3B82F6',
        'custom-green': '#22C55E',
      }
    }
  }
}
```

### Custom CSS

Add to `src/App.css`:

```css
/* Override default styles */
.listening-challenge-input {
  /* Custom input styling */
}

.listening-challenge-button {
  /* Custom button styling */
}
```

## 🗂️ Data Structure

### Challenge Object Format

```javascript
{
  id: 1,                    // Unique identifier
  audio: '/path/to/audio.mp3', // Public path to audio file
  correctAnswer: 'Sentence'    // Exact answer to match
}
```

### State Variables

```javascript
// Current challenge index (0, 1, or 2)
const [currentIndex, setCurrentIndex] = useState(0);

// Array of user inputs ['answer1', 'answer2', 'answer3']
const [userAnswers, setUserAnswers] = useState(['', '', '']);

// Array of validation results [null/true/false, ...]
const [checkResults, setCheckResults] = useState([null, null, null]);

// Flag for completion screen
const [showCompletionScreen, setShowCompletionScreen] = useState(false);

// Array of hint messages
const [hints, setHints] = useState(['', '', '']);

// Flag for auto-advance animation
const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
```

## 🔄 Integration Points

### How Level 4 Integrates with Road.jsx

```javascript
// In Road.jsx, Level 4 is referenced as:
if (level.type === 'listening') {
  return (
    <ListeningChallenge
      onComplete={(passed) => onFinish(passed)}
      onCancel={onCancel}
    />
  );
}
```

### Props Passed to ListeningChallenge

```javascript
onComplete(passed: boolean) {
  // Called when user completes or fails level
  // Triggers: handleQuizFinish(levelIndex, passed)
  // Updates: statusList array
  // Result: Level marked complete, next level unlocked
}

onCancel() {
  // Called when user clicks Cancel button
  // Closes modal and returns to level selection
  // No progress saved if not completed
}
```

## 📊 Progress Tracking

### localStorage Format

```javascript
// Key: 'learningRoadProgress'
// Value: JSON array of level statuses
['complete', 'complete', 'complete', 'complete', 'locked']

// Meanings:
// 'locked'    - Level not yet accessible
// 'open'      - Level available to play
// 'complete'  - Level successfully completed
```

### Level Unlock Logic

```javascript
// When level is completed:
setStatusList((prev) => {
  const next = [...prev];
  next[levelIndex] = 'complete';
  
  // Unlock next level if it exists and is locked
  if (levelIndex + 1 < next.length && next[levelIndex + 1] === 'locked') {
    next[levelIndex + 1] = 'open';
  }
  
  return next;
});
```

## 🔐 Validation Rules

### Text Normalization

```javascript
const normalizeText = (text) => {
  return text
    .toString()                // Convert to string
    .replace(/['']/g, "'")     // Normalize apostrophes
    .toLowerCase()             // Convert to lowercase
    .replace(/\s+/g, ' ')      // Normalize whitespace (multiple spaces → single)
    .trim();                   // Remove leading/trailing spaces
};
```

### Exact Match Comparison

```javascript
// User answer and correct answer both normalized
const userNormalized = normalizeText(userAnswer);
const correctNormalized = normalizeText(correctAnswer);
const isCorrect = userNormalized === correctNormalized;
```

### Example Matches
```
User: "THE SUN WAS SETTING, PAINTING THE SKY IN SHADES OF PINK AND ORANGE."
Correct: "The sun was setting, painting the sky in shades of pink and orange."
Result: ✅ MATCH (after normalization)

User: "The  sun  was  setting..." (extra spaces)
Correct: "The sun was setting..."
Result: ✅ MATCH (whitespace normalized)

User: "She couldn't believe..."
Correct: "She couldn't believe..."
Result: ✅ MATCH (apostrophe normalized)

User: "The sun was setting"
Correct: "The sun was setting, painting the sky in shades of pink and orange."
Result: ❌ NO MATCH (different content)
```

## 🚀 Deployment

### For Vercel
```bash
# 1. Connect GitHub repository
# 2. Select project folder
# 3. Environment: React + Vite auto-detected
# 4. Deploy button - automatic build

# Commands:
# Build: npm run build
# Output: dist/
```

### For Netlify
```bash
# 1. Connect GitHub repository
# 2. Build command: npm run build
# 3. Publish directory: dist
# 4. Deploy

# File: netlify.toml (if needed)
[build]
  command = "npm run build"
  publish = "dist"
```

### For Self-Hosted
```bash
# 1. Build
npm run build

# 2. Copy dist/ folder to server
scp -r dist/* user@server:/var/www/html/

# 3. Configure web server (Apache/Nginx) for SPA
# Ensure all routes redirect to index.html
```

### For Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5174
CMD ["npm", "run", "preview"]
```

## 🔍 Debugging

### Browser Console
```javascript
// Check localStorage
console.log(localStorage.getItem('learningRoadProgress'));

// Monitor state changes
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', e);
});

// Check audio files loading
document.querySelectorAll('audio').forEach(audio => {
  console.log('Audio:', audio.src, audio.readyState);
});
```

### Common Issues & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Audio 404 error | Wrong file path | Verify path in challenges array matches `/public` file |
| Text validation always fails | Normalization too strict | Modify `normalizeText()` function |
| Progress not saving | localStorage disabled | Enable in browser settings |
| Mobile layout broken | Tailwind not compiled | Run `npm run dev` with proper build |
| State not updating | Stale closure | Ensure useState dependency arrays are correct |

## 📈 Performance Optimization

### Code Splitting (Already Configured)
- ListeningChallenge dynamically imported in Road.jsx
- Lazy loading reduces initial bundle size

### Image/Audio Optimization
- Audio files: Compress to 128kbps MP3
- Consider CDN for audio hosting
- Lazy load audio playback

### Build Optimization
```bash
# Analyze bundle size
npm install --save-dev vite-plugin-visualizer

# In vite.config.js
import { visualizer } from 'vite-plugin-visualizer';

export default {
  plugins: [visualizer()]
}
```

## 🧪 Testing Setup

### Unit Tests (Jest + React Testing Library)
```bash
npm install --save-dev @testing-library/react jest
```

### E2E Tests (Cypress)
```bash
npm install --save-dev cypress

# Run tests
npx cypress open
```

## 📝 Code Style

### Followed Conventions
- **Component Names**: PascalCase (ListeningChallenge)
- **Function Names**: camelCase (handleCheckAnswer)
- **Constants**: UPPER_SNAKE_CASE (STORAGE_KEY)
- **CSS Classes**: kebab-case (challenge-card)
- **Variables**: camelCase (currentIndex)

### ESLint Configuration
File: `.eslintrc.cjs` (auto-generated)
- Enforces React best practices
- Detects unused imports
- Prevents common errors

## 🔄 Version Control

### Git Workflow
```bash
# Create branch for new features
git checkout -b feature/level-4-enhancements

# Make changes, test locally
npm run dev

# Commit changes
git add .
git commit -m "feat: add Level 4 Listening Challenge"

# Push to GitHub
git push origin feature/level-4-enhancements

# Create Pull Request
```

### Commits to Track
- ✅ Initial Level 4 implementation
- ✅ ListeningChallenge component added
- ✅ Road.jsx refactored with routing
- ✅ Documentation completed
- ✅ Testing verified

## 📞 Support

### Getting Help
1. Check `LEVEL_4_DOCUMENTATION.md` for technical details
2. See `LEVEL_4_QUICK_START.md` for usage guide
3. Review `LEVEL_4_EXAMPLES.md` for code examples
4. Check browser console for errors
5. Verify all audio files are in `/public` folder

### Reporting Issues
Include:
- Browser and OS information
- Steps to reproduce
- Console error messages
- Audio file names being used

## ✅ Pre-Launch Checklist

- [ ] All audio files present in `/public`
- [ ] No console errors in development
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Mobile layout responsive
- [ ] localStorage working
- [ ] Progress persists on page reload
- [ ] All 3 challenges functional
- [ ] Success message displays
- [ ] Next level unlocks
- [ ] Documentation complete

## 🎉 You're All Set!

Your Level 4 - Listening Challenge is ready to deploy! 

**Next Steps:**
1. Test locally with `npm run dev`
2. Build production version with `npm run build`
3. Deploy to your hosting platform
4. Share with students/users
5. Gather feedback for improvements

**Happy Learning! 📚✨**

---

**Last Updated**: November 11, 2025  
**Configuration Version**: 1.0  
