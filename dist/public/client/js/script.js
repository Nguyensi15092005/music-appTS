// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSong = JSON.parse(dataSong);
  dataSinger = JSON.parse(dataSinger);
  console.log(dataSong.lyrics)
  const ap = new APlayer({
    container: aplayer,
    autoplay: true, // tự động phát
    lrcType: 1, // Lời bài hát chạy theo bài hát 
    audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover: dataSong.avatar,
      lrc: dataSong.lyrics, // Lời bài hát chạy theo bài hát
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
  ap.on('ended', function () {
    const link = `/songs/listen/${dataSong._id}`;

    const option = {
      method: "PATCH"
    }

    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        const listen = document.querySelector(".singer-detail .inner-listen span");
        listen.innerHTML = `${data.listen} Lược nghe`
      });
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
        if (data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.newLike} thích`;

          buttonLike.classList.toggle("active");
        }
      });

  })
}
// End Buton like

// Buton favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => {
      const idSong = buttonFavorite.getAttribute("button-favorite");
      const isActive = buttonFavorite.classList.contains("active");
      const typeFavorite = isActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${idSong}`;

      const option = {
        method: "PATCH"
      }

      fetch(link, option)
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active");
          }
        });

    })
  })
}
// End Buton favorite

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

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const songs = data.songs;
          console.log(songs)
          if (songs.length > 0) {
            boxSuggest.classList.add("show");
            const htmls = songs.map((song) => {
              return `
                <a class="inner-item" href="/songs/detail/${song.slug}"> 
                  <div class="inner-image">  
                    <img src="${song.avatar}" alt="">
                  </div>
                  <div class="inner-info"> 
                    <div class="inner-title"> ${song.title} </div>
                    <div class="inner-singer"> 
                      <i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger}
                    </div>
                  </div>
                </a>`
            })

            const boxList = boxSuggest.querySelector(".inner-list");
            boxList.innerHTML = htmls.join("");
          }
          else{
            boxSuggest.classList.remove("show");
          }

        }
      });
  })
}
// End Search Suggest

