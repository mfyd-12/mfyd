import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Hero from './component/hero'
import TestimonialsSection from './component/feedback'
import ImproveEnglishSection from './component/information'
import ReadingTest from './component/reading-test'
import VocabularyTest from './component/vocabulary-test'
import TestTypes from './component/test-types'
import DictationTest from './component/dictation-test'
import ListeningTest from './component/listening-test'
import SpeakingTest from './component/speaking-test'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <TestimonialsSection />
          <ImproveEnglishSection />
        </>
      } />
  <Route path="/reading-test" element={<ReadingTest />} />
  <Route path="/vocabulary-test" element={<VocabularyTest />} />
  <Route path="/test-types" element={<TestTypes />} />
  <Route path="/dictation-test" element={<DictationTest />} />
  <Route path="/listening-test" element={<ListeningTest />} />
  <Route path="/speaking-test" element={<SpeakingTest />} />
    </Routes>
  );
}

export default App
