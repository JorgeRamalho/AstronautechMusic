/**
 * Narrador — Comandante Nova (texto + voz opcional)
 */
const Narrator = (function () {
  let voiceEnabled = true;
  let currentUtterance = null;
  let typewriterTimer = null;
  let onCompleteCallback = null;
  let fullText = '';

  const textEl = () => document.getElementById('narrator-text');

  function setVoiceEnabled(enabled) {
    voiceEnabled = enabled;
    if (!enabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function speak(text) {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
    if (ptVoice) utterance.voice = ptVoice;

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function skip() {
    if (typewriterTimer) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
    }
    const el = textEl();
    if (el) el.textContent = fullText;
    if (onCompleteCallback) {
      const cb = onCompleteCallback;
      onCompleteCallback = null;
      cb();
    }
  }

  function say(text, options = {}) {
    return new Promise((resolve) => {
      const el = textEl();
      if (!el) {
        resolve();
        return;
      }

      if (typewriterTimer) {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
      }

      fullText = text;
      el.textContent = '';
      onCompleteCallback = resolve;

      const instant = options.instant || false;
      const speed = options.speed || 28;

      if (instant) {
        el.textContent = text;
        speak(text);
        resolve();
        return;
      }

      speak(text);

      let index = 0;
      typewriterTimer = setInterval(() => {
        if (index < text.length) {
          el.textContent += text[index];
          index++;
        } else {
          clearInterval(typewriterTimer);
          typewriterTimer = null;
          onCompleteCallback = null;
          resolve();
        }
      }, speed);
    });
  }

  function repeat() {
    if (fullText) say(fullText, { instant: false });
  }

  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  return {
    say,
    skip,
    repeat,
    setVoiceEnabled,
    getVoiceEnabled: () => voiceEnabled
  };
})();
