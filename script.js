/**
 * Dự án Trung Thu - Hiệu ứng bầu trời sao băng, lồng đèn và lời chúc
 */

// ======================= CANVAS HIỆU ỨNG SAO & SAO BĂNG =======================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let w, h;
let stars = [];
let meteors = [];

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const targetCount = Math.round((w * h) / 2000);

    // Khởi tạo hoặc cập nhật số lượng sao mượt mà, không bị giật nhấp nháy khi resize
    if (stars.length === 0) {
        for (let i = 0; i < targetCount; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: 0.6 * Math.random() + 0.15,
                alpha: 0.8 * Math.random() + 0.1,
                twinkle: 0.02 * Math.random() + 0.003
            });
        }
    } else {
        while (stars.length < targetCount) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: 0.6 * Math.random() + 0.15,
                alpha: 0.8 * Math.random() + 0.1,
                twinkle: 0.02 * Math.random() + 0.003
            });
        }
        if (stars.length > targetCount) {
            stars.length = targetCount;
        }
    }
}

function drawStars() {
    stars.forEach((star) => {
        star.alpha += (Math.random() > 0.5 ? 1 : -1) * star.twinkle;
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "white";
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}

function createMeteor() {
    const startX = Math.random() * w;
    const startY = Math.random() * (h / 3);
    const speed = 8 * Math.random() + 6;
    meteors.push({
        x: startX,
        y: startY,
        vx: speed + 2,
        vy: speed / 2,
        len: 100 * Math.random() + 120,
        alpha: 1
    });
}

function drawMeteors() {
    for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - m.len;
        const tailY = m.y - m.len / 2;
        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x > w + 200 || m.y > h + 200) {
            meteors.splice(i, 1);
        }
    }
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
}

function drawBackground() {
    const bgGradient = ctx.createLinearGradient(0, h, 0, 0);
    bgGradient.addColorStop(0, "rgb(6, 0, 20)");
    bgGradient.addColorStop(1, "#00020a");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
}

function loop() {
    drawBackground();
    drawStars();
    drawMeteors();
    if (Math.random() < 0.01) {
        createMeteor();
    }
    requestAnimationFrame(loop);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
loop();

// ======================= DỮ LIỆU LỜI CHÚC THEO CHỦ ĐỀ =======================
const data = {
    1: {
        sentences: [
            "Cậu ơi, Trung Thu đến rồi, đi chơi với tớ nha...",
            "Mình đi ăn bánh Trung Thu rồi ngắm trăng tròn 🌕",
            "Tớ muốn cùng cậu đi dạo dưới ánh đèn lồng lung linh.",
            "Trung Thu có cậu thì mới thật sự trọn vẹn"
        ],
        wishes: [
            "Chúc cậu luôn rạng rỡ như ánh trăng tròn.",
            "Tớ mong cậu gặp nhiều may mắn và hạnh phúc.",
            "Cậu mãi là người quan trọng với tớ.",
            "Tớ chúc mọi điều tốt đẹp nhất đến với cậu."
        ],
        invite: "Đi chơi với tớ nhé?",
        noTexts: [
            "Cậu không đi thật hả? 🥺",
            "Thôi mà, đi với tớ đi 😢",
            "Đi một lần thôi mà 😩",
            "Không đi là tớ giận cậu đó 😭"
        ],
        secretWish: "Cậu biết không, trong hàng vạn ánh đèn lồng rực rỡ đêm nay, cậu chính là điều may mắn và tuyệt vời nhất mà tớ từng gặp. Cảm ơn vì đã luôn ở bên tớ nhé! 💖✨"
    },
    2: {
        sentences: [
            "Trăng rằm chiếu sáng không gian",
            "Phố hoa rực rỡ, xôn xang tiếng cười",
            "Trung thu đẹp nhất em ơi",
            "Cùng anh tay nắm, dạo chơi đêm này "
        ],
        wishes: [
            "Hy vọng công chúa sẽ cùng anh đi chơi thật vui vẻ ạ.",
            "Ước mơ của em sẽ bay cao, sáng như ánh trăng rằm.",
            "Mong công chúa luôn gặp nhiều may mắn trong cuộc sống.",
            "Anh mong mình sẽ cùng em đi qua thật nhiều mùa trăng nữa.",
            "Anh yêu em lắmm!",
            "Mong tình mình luôn ấm áp, vẹn tròn như ánh trăng đêm nay.",
            "Nếu em đọc được cái này, anh sẽ tỏ tình em.",
            "Thả đèn lồng lên trời để xin một điều: Đỗ Phương Anh làm công chúa của anh suốt đời nhé!",
            "Mong công chúa sẽ đi ngủ sớm ạ.",
            "Mong công chúa sẽ đi tắm sớm ạ.",
            "Mong công chúa sẽ ăn đúng bữa ạ.",
            "Mong công chúa ít đi chơi khuya ạ.",
            "Mong công chúa ngày nào cũng vui vẻ."
        ],
        invite: "Công chúa đi chơi với anh nhé?",
        noTexts: [
            "Chắc không đó? 🥺",
            "Thôi mà 😢",
            "Đi đi mà 😩",
            "Không đi là buồn á 😭"
        ],
        secretWish: "Công chúa nhỏ của anh à! Trong hàng ngàn ngọn đèn trời đêm nay, em chính là điều kỳ diệu và quý giá nhất của anh. Chúc Đỗ Phương Anh luôn là nàng công chúa hạnh phúc nhất trần đời, mãi bên anh nhé! Yêu công chúa rất nhiều! 👑❤️✨"
    },
    3: {
        sentences: [
            "Anh ơi, Trung Thu này em muốn đi dạo cùng anh...",
            "Mình ăn bánh dẻo, ngắm đèn hoa đăng?",
            "Em muốn được ngồi cạnh anh, nghe kể chuyện xưa 😘",
            "Có anh bên cạnh, trăng rằm cũng sáng hơn."
        ],
        wishes: [
            "Em mong anh luôn là vầng trăng của riêng em.",
            "Mong anh luôn mạnh khỏe và hạnh phúc.",
            "Ước mọi dự định của anh đều thành công.",
            "Anh chính là niềm vui lớn nhất của em."
        ],
        invite: "Đi chơi với em nhé?",
        noTexts: [
            "Anh không đi cùng em thật sao? 🥺",
            "Thôi mà, đi với em nha 😢",
            "Em muốn đi với anh lắm á 😩",
            "Không đi là em giận đó 😭"
        ],
        secretWish: "Anh là vầng trăng sáng nhất soi rọi vào trái tim em. Cảm ơn anh vì luôn yêu thương và che chở cho em. Chúc cho tình yêu của chúng mình mãi tròn đầy như ánh trăng rằm này nhé! Yêu anh! ❤️✨"
    },
    4: {
        sentences: [
            "Chồng ơi, Trung Thu này mình ra ngoài dạo phố nhé...",
            "Vợ muốn ăn bánh nướng cùng chồng, rồi ngắm trăng rằm 🌕",
            "Cùng nhau nhớ lại kỷ niệm hồi nhỏ, chắc vui lắm 😘",
            "Có chồng bên cạnh, vợ thấy Trung Thu nào cũng đẹp."
        ],
        wishes: [
            "Chúc chồng của vợ luôn khỏe mạnh và vui vẻ.",
            "Mong công việc của chồng luôn thuận lợi.",
            "Chúc chồng có nhiều niềm vui như ánh đèn lồng kia.",
            "Vợ yêu chồng nhiều lắm, mãi bên nhau nha!"
        ],
        invite: "Đi chơi với vợ nhé?",
        noTexts: [
            "Không đi với vợ hả chồng? 🥺",
            "Thôi mà, vợ buồn á 😢",
            "Đi đi mà 😩",
            "Không đi là vợ giận đó 😭"
        ],
        secretWish: "Cảm ơn chồng vì luôn là bờ vai vững chãi và ấm áp của vợ. Trung Thu này và mãi mãi về sau, chúc gia đình mình luôn ngập tràn tiếng cười và hạnh phúc! Yêu chồng nhiều! 👨‍👩‍👧❤️"
    },
    5: {
        sentences: [
            "Vợ ơi, Trung Thu này chồng muốn dắt vợ đi chơi nè...",
            "Mình đi ăn bánh dẻo, uống trà nóng, rồi đi dạo dưới trăng nhé?",
            "Chồng muốn nhìn thấy nụ cười của vợ trong ánh đèn lồng 🌟",
            "Có vợ bên cạnh, Trung Thu của chồng mới thật sự hạnh phúc."
        ],
        wishes: [
            "Chúc vợ của chồng luôn rạng rỡ như ánh trăng.",
            "Mong vợ luôn an yên và hạnh phúc.",
            "Chúc vợ nhiều may mắn, thành công trong mọi việc.",
            "Chồng chỉ cần vợ ở cạnh, là đủ rồi ❤️"
        ],
        invite: "Đi chơi với chồng nhé?",
        noTexts: [
            "Không đi với chồng hả vợ? 🥺",
            "Đi với chồng đi mà 😢",
            "Thôi năn nỉ đó 😩",
            "Nếu vợ không đi, chồng buồn lắm 😭"
        ],
        secretWish: "Vợ yêu à, có vợ bên cạnh chính là mùa trăng trọn vẹn nhất cuộc đời chồng. Chúc vợ yêu luôn luôn rạng rỡ, an yên và mãi là bến đỗ bình yên nhất của chồng nhé! Yêu vợ vô cùng! 👩‍❤️‍👨❤️"
    }
};

// ======================= XỬ LÝ QUERY PARAM VÀ DỮ LIỆU HIỂN THỊ =======================
const params = new URLSearchParams(window.location.search);
let selectedId = params.get("id");

// Fallback an toàn: nếu id không hợp lệ hoặc không có trong data thì mặc định chọn id="2"
if (!selectedId || !data[selectedId]) {
    selectedId = "2";
}

const { sentences, wishes, invite, noTexts, secretWish } = data[selectedId];

const messageBox = document.getElementById("message");
const inviteBox = document.getElementById("invite-box");
const wishPopup = document.getElementById("wish-popup");
const lanternContainer = document.getElementById("lantern-container");
const btnOk = document.getElementById("btn-ok");
const btnNo = document.getElementById("btn-no");

document.querySelector("#invite-box p").textContent = invite;

let currentSentence = 0;
let lanternClickable = false;

// ======================= HIỆU ỨNG TỪNG TỪ CỦA LỜI DẪN =======================
function showSentence(sentence) {
    messageBox.innerHTML = "";
    const words = sentence.split(" ");
    const wordElements = [];
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.justifyContent = "center";

    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        container.appendChild(span);
        wordElements.push(span);
        setTimeout(() => span.classList.add("show"), 230 * index);
    });

    messageBox.appendChild(container);

    const showDuration = 230 * words.length + 1400;
    setTimeout(() => {
        wordElements.forEach((span, index) => {
            setTimeout(() => {
                span.classList.remove("show");
                span.classList.add("hide");
            }, 150 * index);
        });

        const hideDuration = 150 * words.length + 550;
        setTimeout(() => {
            currentSentence++;
            if (currentSentence < sentences.length) {
                showSentence(sentences[currentSentence]);
            } else {
                inviteBox.style.display = "block";
            }
        }, hideDuration);
    }, showDuration);
}

messageBox.style.pointerEvents = "none";
showSentence(sentences[currentSentence]);

// ======================= HIỆU ỨNG ÂM THANH & LẤP LÁNH SECRET =======================
function playSecretChime() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const audioCtx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (chuông ngân trong trẻo)
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.1);
            gain.gain.setValueAtTime(0.18, audioCtx.currentTime + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.6);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + idx * 0.1);
            osc.stop(audioCtx.currentTime + idx * 0.1 + 0.6);
        });
    } catch (e) {
        // Fallback im lặng
    }
}

function createSparkleBurst(x, y) {
    const symbols = ["✨", "⭐", "🌟", "💖", "🌕", "🎉"];
    const posX = x || (window.innerWidth / 2);
    const posY = y || (window.innerHeight / 2);

    for (let i = 0; i < 18; i++) {
        const span = document.createElement("span");
        span.className = "secret-sparkle";
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = posX + "px";
        span.style.top = posY + "px";
        span.style.fontSize = (16 + Math.random() * 14) + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 90;
        span.style.setProperty("--tx", Math.cos(angle) * distance + "px");
        span.style.setProperty("--ty", Math.sin(angle) * distance + "px");

        document.body.appendChild(span);
        setTimeout(() => span.remove(), 1200);
    }
}

let lanternCount = 0;

function createLantern() {
    // Tạm dừng sinh đèn khi người dùng chuyển sang tab khác để tiết kiệm CPU/pin
    if (document.hidden) return;

    lanternCount++;
    // Cứ khoảng 8-10 đèn lồng thì có 1 chiếc đèn lồng mang bí mật
    const isSecretLantern = (lanternCount % 9 === 0);

    const lantern = document.createElement("img");
    lantern.src = "./den.png";
    lantern.className = isSecretLantern ? "lantern secret-lantern" : "lantern";

    const type = Math.floor(3 * Math.random()) + 1;
    let width, duration, opacity;

    if (type === 1) {
        width = 15 + 15 * Math.random();
        duration = 14000 + 6000 * Math.random();
        opacity = 0.5;
    } else if (type === 2) {
        width = 20 + 25 * Math.random();
        duration = 10000 + 5000 * Math.random();
        opacity = 0.75;
    } else {
        width = 30 + 40 * Math.random();
        duration = 8000 + 4000 * Math.random();
        opacity = 0.95;
    }

    if (isSecretLantern) {
        width = Math.max(38, width * 1.15); // Đèn bí mật kích thước rõ ràng, nổi bật
        opacity = 1;
    }

    lantern.style.width = width + "px";
    lantern.style.left = (90 * Math.random()) + "vw";
    lantern.style.bottom = (10 * Math.random()) + "px";
    lantern.style.opacity = opacity;
    lantern.style.pointerEvents = lanternClickable ? "auto" : "none";

    lanternContainer.appendChild(lantern);

    const driftX = 100 * Math.random() - 40;
    lantern.animate(
        [
            { transform: "translate(0, 0)", opacity: opacity },
            { transform: `translate(${driftX}px, -${120 + 40 * Math.random()}vh)`, opacity: 0 }
        ],
        {
            duration: duration,
            easing: "linear",
            fill: "forwards"
        }
    );

    setTimeout(() => lantern.remove(), duration);

    lantern.addEventListener("click", (e) => {
        if (!lanternClickable) return;
        e.stopPropagation();

        if (isSecretLantern) {
            // Khi bấm trúng lồng đèn bí mật!
            playSecretChime();
            createSparkleBurst(e.clientX, e.clientY);

            wishPopup.classList.add("is-secret");
            wishPopup.innerHTML = `
                <div class="secret-badge">🌟 ĐIỀU ƯỚC BÍ MẬT 🌟</div>
                <div style="font-size: 1.25rem; line-height: 1.6; margin-top: 6px;">${secretWish}</div>
            `;
            wishPopup.style.display = "block";
        } else {
            // Đèn lồng bình thường
            const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
            wishPopup.classList.remove("is-secret");
            wishPopup.innerHTML = `<div>${randomWish}</div>`;
            wishPopup.style.display = "block";
        }

        const closeWish = () => {
            wishPopup.style.display = "none";
            wishPopup.classList.remove("is-secret");
            document.removeEventListener("click", closeWish);
        };

        setTimeout(() => {
            document.addEventListener("click", closeWish);
        }, 50);
    });
}

setInterval(createLantern, 350);

// ======================= XỬ LÝ TƯƠNG TÁC NÚT BẤM =======================
function handleAccept() {
    inviteBox.style.display = "none";
    lanternClickable = true;

    // Kích hoạt click cho tất cả đèn lồng đang bay trên màn hình
    document.querySelectorAll(".lantern").forEach((el) => {
        el.style.pointerEvents = "auto";
    });

    const hint = document.createElement("div");
    hint.id = "hint";
    hint.textContent = "Biết ngay công chúa sẽ đồng ý mà \nChạm vào đèn trời để xem điều ước nha, có 1 secret ạ";
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.opacity = "1";
    }, 50);

    setTimeout(() => {
        hint.style.opacity = "0";
        setTimeout(() => hint.remove(), 1000);
    }, 5000);
}

btnOk.addEventListener("click", handleAccept);

let isNoEnlarged = false;
btnNo.addEventListener("click", () => {
    if (!isNoEnlarged) {
        isNoEnlarged = true;
        btnNo.classList.add("enlarge");
        btnNo.textContent = "Không từ chối!";
    } else {
        handleAccept();
    }
});