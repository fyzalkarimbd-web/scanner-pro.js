function openSignModal(){
    if(typeof setActiveMode === "function") setActiveMode("mode-sign-tool");
    document.getElementById("signGeneratorModal").style.display = "flex";
    document.body.style.overflow = "hidden";
    // মডাল ওপেন হওয়ার সময় একবার ফন্ট লোড করে রাখা যাতে ইনপুটে সাথে সাথে দেখায়
    loadBNFont();
}

function closeSignModal(){
    document.getElementById("signGeneratorModal").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("txtInput-sg").value = "";
}

// ফন্ট লোড করার ফাংশন
async function loadBNFont() {
    const fontUrl = 'https://cdn.jsdelivr.net/gh/fyzalkarimbd-web/scanner@main/bnfont.ttf';
    const myFont = new FontFace('BNFont', `url(${fontUrl})`);
    try {
        const loadedFont = await myFont.load();
        document.fonts.add(loadedFont);
    } catch (e) { console.log("Font pre-load error"); }
}

async function generateSign() {
    const canvas = document.getElementById("canvasBoard-sg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const nameInput = document.getElementById("txtInput-sg").value.trim();
    const btn = document.getElementById("btnDownload-sg");
    const originalBtnHtml = btn.innerHTML;

    if (!nameInput) {
        if(typeof showAlert === "function") showAlert("দয়া করে আগে আপনার নাম বাংলায় লিখুন!");
        else alert("দয়া করে আগে আপনার নাম বাংলায় লিখুন!");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    try {
        await loadBNFont();
        await document.fonts.ready;

        const style = document.querySelector('input[name="sg-weight"]:checked').value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let fontSize = 120;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";

        let fontStyle = (style === "bold") ? "bold" : "normal";
        ctx.font = `${fontStyle} ${fontSize}px 'BNFont'`;

        while (ctx.measureText(nameInput).width > canvas.width - 80 && fontSize > 20) {
            fontSize--;
            ctx.font = `${fontStyle} ${fontSize}px 'BNFont'`;
        }

        if (style === "lighter") {
            ctx.globalAlpha = 0.7;
            ctx.fillText(nameInput, canvas.width / 2, canvas.height / 2);
        } else if (style === "normal") {
            ctx.globalAlpha = 1;
            ctx.fillText(nameInput, canvas.width / 2, canvas.height / 2);
        } else if (style === "bold") {
            ctx.globalAlpha = 1;
            ctx.fillText(nameInput, canvas.width / 2, canvas.height / 2);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "black";
            ctx.strokeText(nameInput, canvas.width / 2, canvas.height / 2);
        }

        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `Signature_${nameInput}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        alert("Error loading font.");
    } finally {
        ctx.globalAlpha = 1;
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
    }
}
