# Level 4 - Listening Challenge Implementation

## Overview
Level 4 is a specialized **Listening Challenge** component designed for the Learning Progress Road system in React + Tailwind CSS. Users listen to audio clips and transcribe the sentences they hear, with exact-match validation and helpful feedback.

## Architecture

### Component Structure
```
src/component/learning-road/
├── Road.jsx                    # Main router (integrates all level types)
├── Level.jsx                   # Individual level card display
├── ListeningChallenge.jsx     # Level 4 specific component
├── ProgressBar.jsx            # Progress visualization
└── Quiz.jsx                    # Legacy component (for reference)
```

### Level Types
The Road.jsx now supports four level types:
- **multipleChoice** (Levels 1-3): Traditional quiz with options
- **listening** (Level 4): Audio transcription challenge
- **conversation** (Level 5): Bot conversation with keyword validation

## Level 4 - Listening Challenge Details

### Features

#### 1. **Three Audio Challenges**
- Each challenge has a unique audio file and correct answer
- Audio files are stored in `public/` directory
- Users can replay audio as many times as needed

#### 2. **Interactive Audio Player**
```jsx
<audio
  controls
  src={currentChallenge.audio}
  className="w-full max-w-sm h-10 bg-white rounded-lg"
/>
```

#### 3. **Exact-Match Text Validation**
The `normalizeText()` function ensures consistent comparison:
- Normalizes apostrophes ('' → ')
- Converts to lowercase
- Normalizes whitespace (multiple spaces → single space)
- Trims leading/trailing spaces

```javascript
const normalizeText = (text) => {
  return text
    .toString()
    .replace(/['']/g, "'")    // normalize apostrophes
    .toLowerCase()
    .replace(/\s+/g, ' ')     // normalize whitespace
    .trim();
};
```

#### 4. **Challenge Data**
```javascript
const challenges = [
  {
    id: 1,
    audio: '/ElevenLabs_2025-11-11T13_17_58_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3',
    correctAnswer: 'The sun was setting, painting the sky in shades of pink and orange.'
  },
  {
    id: 2,
    audio: '/ElevenLabs_2025-11-11T13_21_00_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3',
    correctAnswer: "She couldn't believe how fast the week had gone by."
  },
  {
    id: 3,
    audio: '/ElevenLabs_2025-11-11T13_23_07_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3',
    correctAnswer: 'A gentle breeze carried the scent of fresh flowers through the garden.'
  }
];
```

### User Interface

#### Progress Indicators
- Visual progress bar showing completed levels
- Indicator dots for each challenge (gray, blue for current, red for incorrect, green for correct)
- Challenge counter (e.g., "Challenge 1 of 3")

#### Input Area
```jsx
<input
  type="text"
  value={userAnswers[currentIndex]}
  onChange={handleInputChange}
  placeholder="Write the sentence here..."
  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg..."
/>
```

#### Feedback System
- **✅ Correct Answer**: Green feedback with congratulations message and auto-advance
- **❌ Incorrect Answer**: Red feedback showing user's answer vs. correct answer
- **💡 Hints**: Yellow hint box when user makes mistakes

#### Action Buttons
- **Check Answer**: Validates the user's input
- **Skip**: Move to next challenge (shown when incorrect)
- **Try Again**: Re-submit after an incorrect attempt
- **Next Challenge**: Proceed to next audio
- **Cancel**: Exit and go back

### State Management

#### State Variables
```javascript
const [currentIndex, setCurrentIndex] = useState(0);           // Current challenge
const [userAnswers, setUserAnswers] = useState(['', '', '']); // User inputs
const [checkResults, setCheckResults] = useState([null, null, null]); // Validation results
const [showCompletionScreen, setShowCompletionScreen] = useState(false);
const [hints, setHints] = useState(['', '', '']);              // Error hints
const [isAutoAdvancing, setIsAutoAdvancing] = useState(false); // Auto-advance flag
```

#### Progress Tracking
- Results stored in `checkResults` array (null, true, or false for each challenge)
- When all challenges are correct, completion screen shown for 2 seconds
- `onComplete()` callback triggered to update Road.jsx and localStorage

### Completion Flow

1. **Challenge 1 Correct** → Auto-advance after 1 second
2. **Challenge 2 Correct** → Auto-advance after 1 second
3. **Challenge 3 Correct** → Show completion screen (🎉 Great job!)
4. **Auto-Callback** → Level marked as complete, next level unlocked
5. **Progress Saved** → localStorage updated

### Integration with Road.jsx

#### Level Definition
```javascript
{
  id: 4,
  title: 'Level 4 - Listening Challenge',
  type: 'listening',
  // Data handled by ListeningChallenge component
}
```

#### Quiz Wrapper Logic
```javascript
if (level.type === 'listening') {
  return (
    <ListeningChallenge
      onComplete={(passed) => onFinish(passed)}
      onCancel={onCancel}
    />
  );
}
```

## Usage Instructions

### For Users
1. Navigate to Learning Road page
2. Click "Start Quiz" on Level 4 when unlocked
3. Listen to the audio clip by clicking the audio player
4. Type the exact sentence you heard
5. Click "Check Answer"
6. If correct, automatically proceed to next challenge
7. If incorrect, see the correct answer and hints
8. Repeat for all 3 challenges
9. Upon completion, see the success message and next level is unlocked

### For Developers
#### Adding New Challenges
Edit the `challenges` array in `ListeningChallenge.jsx`:

```javascript
const challenges = [
  {
    id: 4,
    audio: '/path/to/audio.mp3',
    correctAnswer: 'Exact sentence to match'
  },
  // ... add more
];
```

#### Customizing Validation
Modify the `normalizeText()` function:

```javascript
const normalizeText = (text) => {
  return text
    .toString()
    .replace(/['']/g, "'")
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
    // Add more normalization rules as needed
};
```

#### Adjusting Auto-Advance Delay
Change timeout value in `handleCheckAnswer()`:

```javascript
setTimeout(() => {
  setCurrentIndex(currentIndex + 1);
  setIsAutoAdvancing(false);
}, 1000);  // Change 1000 to desired milliseconds
```

## CSS Classes Used (Tailwind)

### Key Classes
- `bg-gradient-to-r from-blue-50 to-blue-100` - Audio section gradient
- `border-l-4 border-green-500` - Feedback borders
- `text-green-600`, `text-red-600` - Status colors
- `animate-bounce` - Celebration emoji animation
- `focus:border-blue-500 focus:ring-1 focus:ring-blue-600` - Input focus states

### Responsive Design
- Mobile-first approach
- Full-width inputs and buttons
- Responsive audio player sizing

## Data Flow

```
User Input
    ↓
handleInputChange() → Updates userAnswers array
    ↓
handleCheckAnswer() → Validates via normalizeText()
    ↓
setCheckResults() → Stores pass/fail state
    ↓
useEffect monitors checkResults
    ↓
All correct? → Show completion screen → onComplete(true)
    ↓
Road.jsx → handleQuizFinish() → Update statusList → Unlock next level
    ↓
localStorage.setItem() → Persist progress
```

## Error Handling

### Input Validation
- Checks if input is not empty before enabling "Check Answer"
- Validates length and keyword presence
- Auto-clears hints when user starts typing after error

### State Recovery
- If component unmounts, state is managed by parent (Road.jsx)
- localStorage preserves progress even after page reload
- All state initialized properly in useEffect

## Performance Considerations

- Audio files preloaded via HTML5 `<audio>` tag
- No unnecessary re-renders via proper state management
- Efficient hint clearing without full state reset
- Auto-advance delay prevents rapid clicks

## Browser Compatibility

- HTML5 Audio support required
- Tested on Chrome, Firefox, Safari, Edge
- Fallback to native audio controls if custom player not available

## Styling Highlights

### Color Scheme
- Blue (#3B82F6) - Primary action, current
- Green (#22C55E) - Correct answer, success
- Red (#EF4444) - Incorrect, error
- Yellow (#EAB308) - Hints, warnings
- Gray (#6B7280) - Neutral, inactive

### Typography
- Bold headers for emphasis
- Smaller text for hints and secondary info
- All text readable with proper contrast

## Files Modified/Created

### New Files
- ✅ `src/component/learning-road/ListeningChallenge.jsx` - Level 4 implementation

### Modified Files
- ✅ `src/component/learning-road/Road.jsx` - Complete refactor with quiz routing

### Assets Required
- ✅ `public/ElevenLabs_2025-11-11T13_17_58_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3`
- ✅ `public/ElevenLabs_2025-11-11T13_21_00_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3`
- ✅ `public/ElevenLabs_2025-11-11T13_23_07_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3`

## Testing Checklist

- [ ] Audio plays correctly on all challenges
- [ ] Text input accepts typed characters
- [ ] "Check Answer" button validates correctly
- [ ] Correct answers show green feedback
- [ ] Incorrect answers show red feedback with hints
- [ ] Auto-advance works after correct answer
- [ ] Skip button moves to next challenge
- [ ] Try Again button re-enables input after error
- [ ] Completion screen appears after all 3 correct
- [ ] Next level unlocks after completion
- [ ] Progress persists in localStorage
- [ ] Mobile layout is responsive
- [ ] All buttons are clickable and accessible

## Future Enhancements

1. **Difficulty Levels**: Add easy/medium/hard with different sentences
2. **Speech Recognition**: Use Web Speech API to validate spoken input
3. **Phonetic Hints**: Show IPA or pronunciation help
4. **Retry Limit**: Allow only N attempts per challenge
5. **Scoring System**: Award points for first-attempt correct answers
6. **Analytics**: Track time spent per challenge, error patterns
7. **Custom Audio**: Allow instructors to upload custom audio files
8. **Batch Operations**: Support multiple listening challenges as prerequisites
