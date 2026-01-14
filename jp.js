let jState = {
    L: { img: null, zoom: 1, rot: 0, straighten: 0, flip: 1, x: 0, y: 0, br: 100, ct: 100, st: 100 },
    R: { img: null, zoom: 1, rot: 0, straighten: 0, flip: 1, x: 0, y: 0, br: 100, ct: 100, st: 100 }
}, jCanvas, jCtx, jActiveSide = null, isJDragging = !1, jStartX, jStartY, jLastMoveTime = 0, hasMovedJ = !1, jInputLock = 0;

const JOINT_PRO_KEYS = ["G6nRerni4niQACNWuWg7Kvi1", "UxybaW3vfo8j4wZfXbvo3ajP", "VAnV2Qwn7GncCJBgVwVMTK2J", "d1QDMnVQCwxqdyhYXRVRBW33"];
let jActiveKeyIndex = 0, jGlobalBG = "#ffffff", jBorderWidth = 0;

function openJointProModal() {
    if (typeof setActiveMode === "function") setActiveMode("mode-joint-pro");
    document.getElementById("jointProModal").style.display = "flex";
    document.body.style.overflow = "hidden";
    jCanvas = document.getElementById("jointProCanvas");
    jCtx = jCanvas.getContext("2d");
    jCanvas.width = 570;
    jCanvas.height = 450;
    setupJEvents();
    renderJPro();
}

function closeJointProModal() {
    document.getElementById("jointProModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function handleJCanvasClick(t) {
    let e = Date.now();
    if (e - jInputLock < 500 || hasMovedJ || isJDragging || e - jLastMoveTime < 300) return;
    let a = jCanvas.getBoundingClientRect(),
        n = t.changedTouches ? t.changedTouches[0].clientX : t.clientX,
        o = (n - a.left) * (jCanvas.width / a.width),
        i = o < jCanvas.width / 2 ? "L" : "R";
    if (null === jState[i].img) {
        jInputLock = e;
        document.getElementById("jInput" + i).click();
    }
}

function renderJPro() {
    if (!jCtx) return;
    jCtx.fillStyle = jGlobalBG;
    jCtx.fillRect(0, 0, jCanvas.width, jCanvas.height);
    drawJSide("L", 0, 285);
    drawJSide("R", 285, 285);
    if (jBorderWidth > 0) {
        jCtx.strokeStyle = "#000000";
        jCtx.lineWidth = 2 * jBorderWidth;
        jCtx.strokeRect(0, 0, jCanvas.width, jCanvas.height);
    }
}

function drawJSide(t, e, a) {
    let n = jState[t];
    if (n.img) {
        jCtx.save();
        jCtx.beginPath();
        jCtx.rect(e, 0, a, jCanvas.height);
        jCtx.clip();
        jCtx.translate(e + a / 2 + n.x, jCanvas.height / 2 + n.y);
        jCtx.rotate((n.rot + n.straighten) * Math.PI / 180);
        jCtx.scale(n.zoom * n.flip, n.zoom);
        jCtx.filter = `brightness(${n.br}%) contrast(${n.ct}%) saturate(${n.st}%)`;
        jCtx.drawImage(n.img, -n.img.width / 2, -n.img.height / 2);
        jCtx.restore();
    }
}

function rotateJoint(t) { jState[t].rot = (jState[t].rot + 90) % 360; renderJPro(); }
function flipJoint(t) { jState[t].flip *= -1; renderJPro(); }

function setupJEvents() {
    let getCoord = t => {
        let e = jCanvas.getBoundingClientRect(),
            a = t.touches && t.touches[0] ? t.touches[0].clientX : t.clientX,
            n = t.touches && t.touches[0] ? t.touches[0].clientY : t.clientY;
        return { x: (a - e.left) * (jCanvas.width / e.width), rawX: a, rawY: n };
    };

    let onStart = e => {
        if ("INPUT" === e.target.tagName || "range" === e.target.type) { isJDragging = !1; return; }
        let a = getCoord(e);
        jActiveSide = a.x < jCanvas.width / 2 ? "L" : "R";
        hasMovedJ = !1;
        if (e.target === jCanvas && jState[jActiveSide].img) {
            isJDragging = !0; jStartX = a.rawX; jStartY = a.rawY;
        }
    };

    let onMove = e => {
        if (!isJDragging) return;
        let a = getCoord(e);
        if (Math.abs(a.rawX - jStartX) > 5 || Math.abs(a.rawY - jStartY) > 5) {
            hasMovedJ = !0; jLastMoveTime = Date.now();
            jState[jActiveSide].x += a.rawX - jStartX;
            jState[jActiveSide].y += a.rawY - jStartY;
            jStartX = a.rawX; jStartY = a.rawY;
            renderJPro();
        }
        if (e.cancelable) e.preventDefault();
    };

    let onEnd = t => {
        if (isJDragging) isJDragging = !1;
        else if (t.target === jCanvas) handleJCanvasClick(t);
        setTimeout(() => { hasMovedJ = !1; }, 150);
    };

    jCanvas.onmousedown = onStart;
    jCanvas.addEventListener("touchstart", onStart, { passive: !1 });
    window.addEventListener("mousemove", onMove, { passive: !1 });
    window.addEventListener("touchmove", onMove, { passive: !1 });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    ["Br", "Ct", "St", "Straighten", "Zoom"].forEach(t => {
        let e = "Straighten" === t ? "straighten" : t.toLowerCase();
        ["L", "R"].forEach(side => {
            let el = document.getElementById("j" + t + side);
            if (el) {
                el.oninput = n => {
                    let val = "Zoom" === t ? parseFloat(n.target.value) : parseInt(n.target.value);
                    jState[side][e] = val;
                    document.getElementById("v-j" + t + side).innerText = val + ("Straighten" === t ? "°" : "Zoom" === t ? "x" : "%");
                    renderJPro();
                };
            }
        });
    });

    document.getElementById("jBorder").oninput = t => {
        jBorderWidth = parseInt(t.target.value);
        document.getElementById("v-jBorder").innerText = jBorderWidth + "px";
        renderJPro();
    };

    document.getElementById("jInputL").onchange = t => loadJImg(t.target.files[0], "L");
    document.getElementById("jInputR").onchange = t => loadJImg(t.target.files[0], "R");
}

function loadJImg(file, side) {
    if (!file) return;
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => {
            jState[side].img = img; jState[side].x = 0; jState[side].y = 0;
            document.getElementById("jHint" + side).style.display = "none";
            renderJPro();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadJointPro(t) {
    if (!jState.L.img || !jState.R.img) {
        if (typeof showPopup === "function") showPopup("Please add both photos first!");
        else alert("Please add both photos first!");
        return;
    }

    let rows = parseInt(document.getElementById("jRows").value) || 1,
        cols = parseInt(document.getElementById("jCols").value) || 1,
        n = jCanvas.toDataURL("image/jpeg", 0.95);

    if ("jpg" === t) {
        let link = document.createElement("a");
        link.download = "Joint_Photo.jpg";
        link.href = n;
        link.click();
    } else {
        let { jsPDF: i } = window.jspdf,
            pdf = new i("p", "mm", "a4");

        // ফটো সাইজ এবং গ্যাপ (গ্যাপ বাড়িয়ে ১০ মিমি করা হয়েছে)
        const imgW = 48.26; 
        const imgH = 38.1;
        const gap = 10; // ছবির মাঝখানের গ্যাপ এখন ১০ মিমি

        let totalW = imgW * cols + (cols - 1) * gap;
        let startX = (210 - totalW) / 2;
        let startY = 20; // উপরের মার্জিন ২০ মিমি

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let x = startX + (imgW + gap) * c;
                let y = startY + (imgH + gap) * r;
                if (x + imgW <= 210 && y + imgH <= 297) {
                    pdf.addImage(n, "JPEG", x, y, imgW, imgH);
                }
            }
        }

        if ("print" === t) {
            pdf.autoPrint();
            const pdfBlob = pdf.output('bloburl');
            const printFrame = window.open(pdfBlob, '_blank');
            if (!printFrame) {
                alert("Please allow popups to open the print preview.");
            }
        } else {
            pdf.save("Joint_Photo_A4.pdf");
        }
    }
}

window.adjustJLayout = function(id, val) {
    let el = document.getElementById(id), n = parseInt(el.value) || 1;
    n += val;
    if (id === "jRows") { n = Math.max(1, Math.min(7, n)); }
    else { n = Math.max(1, Math.min(4, n)); }
    el.value = n;
};

window.setGlobalJBG = function(color) { jGlobalBG = color; renderJPro(); };

function deleteJointImage(t) {
    jState[t].img = null; jState[t].zoom = 1; jState[t].rot = 0; jState[t].x = 0; jState[t].y = 0;
    document.getElementById("jInput" + t).value = "";
    document.getElementById("jHint" + t).style.display = "flex";
    renderJPro();
}

async function removeJointBg(side) {
    if (!jState[side].img) return (typeof showPopup === "function" ? showPopup("Please add photo first!") : alert("Please add photo first!"));
    let btn = document.getElementById("jAiBtn" + side), oldText = btn.innerHTML;
    btn.disabled = !0; btn.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Processing...";
    
    let canvas = document.createElement("canvas");
    canvas.width = jState[side].img.width; canvas.height = jState[side].img.height;
    canvas.getContext("2d").drawImage(jState[side].img, 0, 0);
    
    canvas.toBlob(async blob => {
        let formData = new FormData();
        formData.append("image_file", blob);
        try {
            let res = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST", headers: { "X-Api-Key": JOINT_PRO_KEYS[jActiveKeyIndex] }, body: formData
            });
            if (res.ok) {
                let resBlob = await res.blob(), img = new Image();
                img.onload = () => { jState[side].img = img; renderJPro(); btn.disabled = !1; btn.innerHTML = oldText; };
                img.src = URL.createObjectURL(resBlob);
            } else { throw new Error("API Limit or Error"); }
        } catch (e) {
            if (++jActiveKeyIndex < JOINT_PRO_KEYS.length) removeJointBg(side);
            else { alert("AI Limit Exceeded!"); btn.disabled = !1; btn.innerHTML = oldText; }
        }
    });
}
