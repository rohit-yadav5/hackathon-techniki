# Audio Files for AriGato Japanese Learning Platform

This directory contains audio files for the Japanese learning lessons and AI pronunciation practice. Each lesson section has its own audio file for pronunciation practice.

## Lesson Section Audio Files

### Lesson 1: Introduction to Hiragana
- `section-1-intro.mp3` - Introduction section audio (1:20)
- `section-2-vowels.mp3` - Five vowels section audio (2:15)
- `section-3-consonants.mp3` - Basic consonants section audio (2:30)
- `section-4-practice.mp3` - Practice section audio (1:45)
- `hiragana-intro.mp3` - Main lesson audio (3:45)

### Lesson 2: Basic Greetings
- `greetings.mp3` - Greetings lesson audio

## AI Pronunciation Practice Audio Files

### N5 Level (Basic)
- `konnichiwa.mp3` - Hello / Good afternoon
- `arigatou.mp3` - Thank you
- `ohayou.mp3` - Good morning
- `sayounara.mp3` - Goodbye
- `otsukaresama.mp3` - Good work / Thank you for your effort

### N4 Level (Intermediate)
- `ganbatte.mp3` - Do your best / Good luck
- `otsukaresama-deshita.mp3` - Thank you for your work (formal)
- `shitsurei-shimasu.mp3` - Excuse me / I'm sorry

### N3 Level (Advanced)
- `osewa-ni-natte-orimasu.mp3` - Thank you for your continued support
- `yoroshiku-onegaishimasu.mp3` - Please treat me kindly / Nice to meet you

## Audio Format Specifications

- **Format**: MP3
- **Quality**: 128kbps minimum, 320kbps recommended
- **Sample Rate**: 44.1kHz
- **Channels**: Mono or Stereo
- **Duration**: Varies by section (1-4 minutes)

## Audio Content Requirements

Each audio file should contain:
- **Native Japanese pronunciation** by certified speakers
- **Clear enunciation** with proper pacing for learners
- **Cultural context** where appropriate
- **Consistent volume levels** across all files
- **Professional recording quality** with minimal background noise

## Usage in the Application

### Lesson Pages
- Audio automatically loads when navigating between sections
- Users can play/pause, restart, and see progress
- Audio resets when changing sections

### AI Pronunciation Practice
- Audio plays when users click "Listen to Native"
- Used as reference for pronunciation practice
- Integrated with speech recognition for comparison

## Development Notes

For development purposes, you can:
1. Use any MP3 files as placeholders
2. Create test audio files with different durations
3. Use text-to-speech services for quick prototypes
4. Record sample pronunciations for testing

## Production Requirements

In production, audio files should be:
- Professionally recorded by native Japanese speakers
- Reviewed for accuracy and clarity
- Optimized for web delivery
- Categorized by JLPT level and difficulty
- Accessible with proper metadata and transcripts

## File Naming Convention

- Use lowercase letters and hyphens
- Include difficulty level when applicable
- Use descriptive names that match the content
- Maintain consistent naming across similar content types

## Integration Points

- **Lesson System**: Section-specific audio for each lesson
- **AI Pronunciation**: Word-specific audio for practice
- **Flashcards**: Audio playback for vocabulary review
- **Progress Tracking**: Audio completion tracking
- **Accessibility**: Screen reader support and transcripts
