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
            name: dataSong.titlt,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }]
    });

    // sự kiện xoay khi bật tắt nhạc 
    const avatar = document.querySelector(".singer-detail .inner-avatar");
    ap.on('play', function () {
        avatar.style.animationPlayState ="running";
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState ="paused";
    });
    // hết sự kiện xoay khi bật tắt nhạc
}
// End APlayer