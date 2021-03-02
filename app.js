// what are they doing to say and how fast/pitch/voice style
const msg = new SpeechSynthesisUtterance();
// container for voices
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  //getting the voice presets
  voices = this.getVoices();
  //setting the presets to the menu
  voicesDropdown.innerHTML = voices
    // filtering for only english voices
    .filter(voice => voice.lang.includes('en'))
    .map(
      voice =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
}

//configuring the voice type with the dropdown menu
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

//triggers the speech to start over when selecting a new voice
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// setting rate/pitch
function setOption() {
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
// inline function to be able to use toggle(false)
stopButton.addEventListener('click', () => toggle(false));
