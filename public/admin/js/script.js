// upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  const closeImage = document.querySelector("[close-image]")

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file)
    }
  })
  closeImage.addEventListener("click", () => {
    uploadImageInput.value = ""
    uploadImagePreview.src = ""
  })

}
// end upload Image
// upload audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]")
  const uploadAudioPreview = uploadAudio.querySelector("[upload-audio-preview]")
  const source = uploadAudio.querySelector("source")

  const closeAudio = uploadAudio.querySelector("[close-audio]")

  uploadAudioInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      source.src = URL.createObjectURL(file);
      uploadAudioPreview.load();
      uploadAudioPreview.style.display= "inline";
      closeAudio.style.display= "inline";
    }
  })
  closeAudio.addEventListener("click", () => {
    uploadAudioInput.value = ""
    uploadAudioPreview.src = ""
    uploadAudioPreview.style.display= "none";
    closeAudio.style.display= "none";
  })

}
// end upload audio

// Show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("date-time"));
  const close = showAlert.querySelector("[close-alert]")
  console.log(time, close)

  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time);

  close.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}
// end Show-alert