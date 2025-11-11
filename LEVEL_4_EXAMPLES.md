# Level 4 Implementation Examples

## Component Usage

### Basic Usage in Road.jsx

```jsx
// In Road.jsx, the ListeningChallenge is used like this:

if (level.type === 'listening') {
  return (
    <ListeningChallenge
      onComplete={(passed) => onFinish(passed)}
      onCancel={onCancel}
    />
  );
}
```

### Props Definition

```jsx
ListeningChallenge.propTypes = {
  onComplete: PropTypes.func.isRequired,  // Called when level complete
  onCancel: PropTypes.func.isRequired     // Called when user cancels
};
```

## Customization Examples

### Example 1: Add More Challenges (5 instead of 3)

**File**: `src/component/learning-road/ListeningChallenge.jsx`

```javascript
// Replace the challenges array:
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
  },
  {
    id: 4,
    audio: '/new-audio-file-1.mp3',
    correctAnswer: 'New sentence for challenge 4'
  },
  {
    id: 5,
    audio: '/new-audio-file-2.mp3',
    correctAnswer: 'New sentence for challenge 5'
  }
];

// Update initial states:
const [userAnswers, setUserAnswers] = useState(['', '', '', '', '']);
const [checkResults, setCheckResults] = useState([null, null, null, null, null]);
const [hints, setHints] = useState(['', '', '', '', '']);
```

### Example 2: Case-Sensitive Validation

By default, the system is case-insensitive. To make it case-sensitive:

```javascript
// Modify in ListeningChallenge.jsx
const normalizeText = (text) => {
  return text
    .toString()
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')  // Remove .toLowerCase() to be case-sensitive
    .trim();
};
```

### Example 3: Stricter Punctuation Matching

To enforce exact punctuation:

```javascript
// Modify normalizeText to NOT normalize punctuation
const normalizeText = (text) => {
  return text
    .toString()
    .replace(/['']/g, "'")
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
    // Keep punctuation as-is, don't remove anything else
};
```

### Example 4: Custom Hint Messages

Modify the `handleCheckAnswer()` function:

```javascript
function handleCheckAnswer() {
  const currentChallenge = challenges[currentIndex];
  const userText = userAnswers[currentIndex];
  const isCorrect =
    normalizeText(userText) === normalizeText(currentChallenge.correctAnswer);

  const newResults = [...checkResults];
  newResults[currentIndex] = isCorrect;
  setCheckResults(newResults);

  if (isCorrect) {
    const newHints = [...hints];
    newHints[currentIndex] = '';
    setHints(newHints);

    if (currentIndex < challenges.length - 1) {
      setIsAutoAdvancing(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsAutoAdvancing(false);
      }, 1000);
    }
  } else {
    const newHints = [...hints];
    
    // Custom hint logic based on error type
    const userLength = userText.length;
    const correctLength = currentChallenge.correctAnswer.length;
    
    if (userLength === 0) {
      newHints[currentIndex] = 'Please type something. Click play again if needed.';
    } else if (userLength < correctLength - 10) {
      newHints[currentIndex] = 'Your answer is too short. Listen again carefully.';
    } else if (userLength > correctLength + 10) {
      newHints[currentIndex] = 'Your answer is too long. Check for extra words.';
    } else {
      newHints[currentIndex] = 'Not quite right. Check spelling, punctuation, and spacing carefully.';
    }
    
    setHints(newHints);
  }
}
```

### Example 5: Partial Credit System

Allow users to pass with 2/3 correct instead of requiring all 3:

```javascript
// Modify useEffect in ListeningChallenge.jsx
useEffect(() => {
  const allChecked = checkResults.every((result) => result !== null);
  const correctCount = checkResults.filter((result) => result === true).length;
  const passThreshold = 2; // Pass with 2 out of 3

  if (allChecked && correctCount >= passThreshold) {
    setShowCompletionScreen(true);
    setTimeout(() => {
      onComplete && onComplete(true);
    }, 2000);
  } else if (allChecked && correctCount < passThreshold) {
    // Optional: Show failure message
    setShowCompletionScreen(true);
    setTimeout(() => {
      onComplete && onComplete(false);
    }, 2000);
  }
}, [checkResults, onComplete]);
```

### Example 6: Add Difficulty Levels

Create a prop-based system:

```jsx
// Modify component signature
export default function ListeningChallenge({ 
  onComplete, 
  onCancel,
  difficulty = 'normal' // 'easy', 'normal', 'hard'
}) {
  
  // Define challenge sets by difficulty
  const challengeSets = {
    easy: [
      {
        id: 1,
        audio: '/easy-1.mp3',
        correctAnswer: 'This is easy.'
      },
      // ...
    ],
    normal: [
      // ... current challenges
    ],
    hard: [
      {
        id: 1,
        audio: '/hard-1.mp3',
        correctAnswer: 'This is a complex sentence with multiple challenging words.'
      },
      // ...
    ]
  };

  const challenges = challengeSets[difficulty];
  
  // Rest of component remains the same
}
```

### Example 7: Add Timer/Speed Challenge

```jsx
export default function ListeningChallenge({ onComplete, onCancel, timeLimit = null }) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (!timeLimit) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit]);

  // Disable input when time is up
  <input
    // ... other props
    disabled={isAutoAdvancing || isTimeUp}
  />

  // Show timer
  {timeLimit && (
    <div className={`text-right text-sm font-semibold ${
      timeRemaining <= 10 ? 'text-red-600' : 'text-gray-600'
    }`}>
      ⏱️ Time: {timeRemaining}s
    </div>
  )}
}
```

### Example 8: Add Hint Button

```jsx
const [hintsRemaining, setHintsRemaining] = useState(3);

function handleShowHint() {
  if (hintsRemaining <= 0) return;
  
  const currentChallenge = challenges[currentIndex];
  const words = currentChallenge.correctAnswer.split(' ');
  const firstWord = words[0];
  
  const hint = `The sentence starts with: "${firstWord}"`;
  
  const newHints = [...hints];
  newHints[currentIndex] = hint;
  setHints(newHints);
  setHintsRemaining(hintsRemaining - 1);
}

// In render:
{hintsRemaining > 0 && checkResults[currentIndex] === null && (
  <button
    onClick={handleShowHint}
    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
  >
    💡 Hint ({hintsRemaining})
  </button>
)}
```

### Example 9: Audio Replay Counter

```jsx
const [replayCount, setReplayCount] = useState(0);

// Wrap audio element with onPlay handler
<audio
  controls
  src={currentChallenge.audio}
  onPlay={() => setReplayCount(replayCount + 1)}
  className="w-full max-w-sm h-10 bg-white rounded-lg"
/>

// Display counter
<div className="text-xs text-gray-600">
  Played {replayCount} time{replayCount !== 1 ? 's' : ''}
</div>
```

### Example 10: Analytics/Tracking

```jsx
// Add at component level
useEffect(() => {
  if (checkResults[currentIndex] !== null) {
    // Log analytics
    const eventData = {
      levelId: 4,
      challengeId: challenges[currentIndex].id,
      isCorrect: checkResults[currentIndex],
      userAnswer: userAnswers[currentIndex],
      correctAnswer: challenges[currentIndex].correctAnswer,
      timestamp: new Date().toISOString(),
      attempts: currentIndex + 1
    };

    // Send to analytics service
    console.log('Analytics:', eventData);
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) })
  }
}, [checkResults]);
```

## Testing Examples

### Unit Test Example (Jest + React Testing Library)

```javascript
import { render, screen, userEvent } from '@testing-library/react';
import ListeningChallenge from './ListeningChallenge';

describe('ListeningChallenge', () => {
  it('should render 3 challenges', () => {
    render(
      <ListeningChallenge
        onComplete={jest.fn()}
        onCancel={jest.fn()}
      />
    );
    
    expect(screen.getByText('Challenge 1 of 3')).toBeInTheDocument();
  });

  it('should validate correct answer', async () => {
    const onComplete = jest.fn();
    render(
      <ListeningChallenge
        onComplete={onComplete}
        onCancel={jest.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Write the sentence here...');
    await userEvent.type(input, 'The sun was setting, painting the sky in shades of pink and orange.');
    
    const checkButton = screen.getByText('Check Answer');
    await userEvent.click(checkButton);

    expect(screen.getByText(/✅ Correct!/i)).toBeInTheDocument();
  });

  it('should reject incorrect answer', async () => {
    render(
      <ListeningChallenge
        onComplete={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Write the sentence here...');
    await userEvent.type(input, 'Wrong answer');
    
    const checkButton = screen.getByText('Check Answer');
    await userEvent.click(checkButton);

    expect(screen.getByText(/❌ Not quite right/i)).toBeInTheDocument();
  });
});
```

### Integration Test Example

```javascript
describe('Learning Road Integration', () => {
  it('should unlock Level 5 after passing Level 4', async () => {
    const { getByText, queryByText } = render(<Road />);

    // Start Level 4
    const level4StartButton = getByText('Start Quiz', {
      selector: '[aria-label*="Level 4"]'
    });
    await userEvent.click(level4StartButton);

    // Complete all 3 challenges correctly
    const answers = [
      'The sun was setting, painting the sky in shades of pink and orange.',
      "She couldn't believe how fast the week had gone by.",
      'A gentle breeze carried the scent of fresh flowers through the garden.'
    ];

    for (let i = 0; i < 3; i++) {
      const input = screen.getByPlaceholderText('Write the sentence here...');
      await userEvent.clear(input);
      await userEvent.type(input, answers[i]);
      
      const checkButton = screen.getByText('Check Answer');
      await userEvent.click(checkButton);

      if (i < 2) {
        await screen.findByText(`Challenge ${i + 2} of 3`);
      }
    }

    // Verify Level 5 is now unlocked
    await waitFor(() => {
      expect(queryByText('🚀 مفتوحة')).toBeInTheDocument();
    });
  });
});
```

## API Integration Example

If you want to load challenges from a backend API:

```jsx
export default function ListeningChallenge({ onComplete, onCancel }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/level-4-challenges')
      .then(res => res.json())
      .then(data => {
        setChallenges(data);
        setUserAnswers(Array(data.length).fill(''));
        setCheckResults(Array(data.length).fill(null));
        setHints(Array(data.length).fill(''));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load challenges:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  // Rest of component
}
```

## Accessibility Enhancements

```jsx
// Add ARIA labels for better accessibility
<input
  type="text"
  aria-label={`Type your answer for challenge ${currentIndex + 1} of ${challenges.length}`}
  role="textbox"
  // ... other props
/>

<button
  aria-label="Check your answer"
  aria-disabled={!userAnswers[currentIndex].trim()}
  // ... other props
>
  Check Answer
</button>

// Add keyboard shortcuts
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswers[currentIndex].trim()) {
      handleCheckAnswer();
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [currentIndex, userAnswers]);
```

---

**These examples demonstrate common customizations and enhancements you can make to Level 4!**
