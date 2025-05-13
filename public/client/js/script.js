// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSong = JSON.parse(dataSong);
    dataSinger = JSON.parse(dataSinger);
    const ap = new APlayer({
        container: aplayer,
        autoplay: true, // tự động phát
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }]
    });

    // sự kiện xoay khi bật tắt nhạc 
    const avatar = document.querySelector(".singer-detail .inner-avatar");
    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });
    // hết sự kiện xoay khi bật tắt nhạc
}
// End APlayer

// Buton like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const idSong = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");
        const typeLike = isActive ? "dislike" : "like";
        const link = `/songs/like/${typeLike}/${idSong}`;

        const option = {
            method: "PATCH"
        }

        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const span = buttonLike.querySelector("span");
                span.innerHTML = `${data.newLike} thích`;

                buttonLike.classList.toggle("active");
            });

    })
}
// End Buton like

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
