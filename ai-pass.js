const aiPrompts = {
    male: "From any photo of any size or head position, create a passport-style front-facing headshot. The face shape, proportions, and features should not be altered in any way — not even slightly. Just adjust the head position so that the person is looking directly at the camera. Keep the natural face exactly as it is. Lighten the skin evenly all over to keep it realistic. Remove any acne, blemishes, or spots from the skin and maintain natural texture. Remove all shadows, harsh lights, or reflections to ensure even, balanced lighting. Keep the original clothing color but the clothing will look clean and new. Use a white background with no shadows. The photo should be high resolution, with the head occupying 70-80% of the frame, perfectly centered, and vertically aligned. Automatically crop the photo to standard passport size (2x2 inches / 600x600 px).",
    female: "From any photo of any size or head position, create a passport-style front-facing headshot. The face shape, proportions, and features should not be altered in any way — not even slightly. Just adjust the head position so that the person is looking directly at the camera. Keep the natural face exactly as it is. Lighten the skin evenly in all areas to keep it realistic. Remove any acne, blemishes, or spots from the skin and maintain natural texture. Remove all shadows, harsh lights, or reflections to ensure even, balanced lighting. Both ears should be fully visible. Keep the original clothing color but the clothing will be clean new. Use a white background with no shadows. The photo should be high resolution, with the head occupying 70-80% of the frame, perfectly centered, and vertically aligned. Automatically crop the photo to standard passport size (2x2 inches / 600x600 px).",
    hijab: "From any photo of any size or head position, create a passport-style front-facing headshot. The face shape, proportions, and features should not be altered in any way — not even slightly. Just adjust the head position so that the person is looking directly at the camera. Keep the natural face exactly as it is. Lighten the skin evenly all over to keep it realistic. Remove any acne, blemishes, or spots from the skin and maintain natural texture. Remove all shadows, harsh lights, or reflections to ensure even, balanced lighting. Keep the original clothing color but the clothing will look clean and new. Use a white background with no shadows. The photo should be high resolution, with the head occupying 70-80% of the frame, perfectly centered, and vertically aligned. Automatically crop the photo to standard passport size (2x2 inches / 600x600 px)."
};

const aiTranslations = {
    en: {
        title: "AI Passport Photo Lab",
        sub: "Click a card to auto-copy the prompt and open Google AI Studio instantly.",
        demoBtn1: "<i class='fa-solid fa-eye'></i> View Guide 1",
        demoBtn2: "<i class='fa-solid fa-eye'></i> View Guide 2",
        male: "Male Passport Photo",
        smale: "Clean skin, sharp suit, white background",
        female: "Female Passport Photo",
        sfemale: "Both ears visible, balanced lighting",
        hijab: "Hijab Passport Photo",
        shijab: "For hijab-wearing subjects, white background",
        insHead: "🚀 How to Use & Guidelines:",
        insBody: "1. <b>Login:</b> Access AI Studio with your Google account. Connect your <b>Google Drive</b> if prompted for storage.<br/>" +
                 "2. <b>Select Type:</b> Click a photo category above (Prompt will auto-copy).<br/>" +
                 "3. <b>Paste:</b> In AI Studio, <b>Paste (Ctrl+V)</b> the prompt into the chat input.<br/>" +
                 "4. <b>Settings:</b> On the right sidebar, select <b>Aspect Ratio: 4:5</b>.<br/>" +
                 "5. <b>Upload:</b> Click the <b>'+' or Upload icon</b> below the input box to add your photo.<br/>" +
                 "6. <b>Generate:</b> Click the <b>Run</b> button. Wait 15 seconds for your HD passport photo!"
    },
    bn: {
        title: "এআই পাসপোর্ট ছবি ল্যাব",
        sub: "বাটন ক্লিক করলে প্রম্পট অটোমেটিক কপি হয়ে গুগল এআই স্টুডিও ওপেন হবে।",
        demoBtn1: "<i class='fa-solid fa-eye'></i> ১ম গাইড দেখুন",
        demoBtn2: "<i class='fa-solid fa-eye'></i> ২য় গাইড দেখুন",
        male: "ছেলেদের পাসপোর্ট ছবি",
        smale: "পরিষ্কার ত্বক, ফরমাল পোশাক ও সাদা ব্যাকগ্রাউন্ড",
        female: "মেয়েদের পাসপোর্ট ছবি",
        sfemale: "উভয় কান দৃশ্যমান এবং নিখুঁত লাইটিং",
        hijab: "মেয়েদের হিজাব পাসপোর্ট ছবি",
        shijab: "হিজাব পরিহিতদের জন্য বিশেষ এআই প্রম্পট",
        insHead: "🚀 ব্যবহার বিধি ও গাইডলাইন:",
        insBody: "১. <b>লগইন:</b> আপনার Google একাউন্ট দিয়ে AI Studio লগইন করুন। স্টোরেজের জন্য <b>Google Drive</b> কানেক্ট করুন।<br/>" +
                 "২. <b>ধরন নির্বাচন:</b> উপরের যেকোনো একটি ছবিতে ক্লিক করুন (প্রম্পট অটো-কপি হবে)।<br/>" +
                 "৩. <b>পেস্ট:</b> AI Studio ওপেন হলে ইনপুট বক্সে প্রম্পটটি <b>Paste (Ctrl+V)</b> করুন।<br/>" +
                 "৪. <b>রেশিও:</b> ডান পাশের সেটিংস থেকে <b>Aspect Ratio: 4:5</b> সিলেক্ট করুন।<br/>" +
                 "৫. <b>আপলোড:</b> ইনপুট বক্সের নিচে <b>Upload</b> আইকনে ক্লিক করে আপনার অরিজিনাল ছবিটি দিন।<br/>" +
                 "৬. <b>রান:</b> সবশেষে <b>Run</b> বাটনে ক্লিক করুন। মাত্র ১৫ সেকেন্ডে তৈরি হবে এইচডি পাসপোর্ট ছবি।"
    }
};

function openAiPassportModal() {
    if (typeof setActiveMode === "function") setActiveMode("mode-ai-passport");
    document.getElementById("aiPassportModal").style.display = "flex";
    document.body.style.overflow = "hidden";
    switchAiLang("en");
}

function closeAiPassportModal() {
    document.getElementById("aiPassportModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function switchAiLang(lang) {
    const modal = document.getElementById("aiPassportModal");
    const title = document.getElementById("ai-title");
    const dBtn1 = document.getElementById("ai-demo-btn-1");
    const dBtn2 = document.getElementById("ai-demo-btn-2");
    
    document.getElementById("ai-tab-en").classList.toggle("active", lang === "en");
    document.getElementById("ai-tab-bn").classList.toggle("active", lang === "bn");

    if(lang === "bn") {
        modal.classList.add("lang-bn");
        title.style.fontFamily = "'SolaimanLipi', sans-serif";
        if(dBtn1) dBtn1.style.fontFamily = "'SolaimanLipi', sans-serif";
        if(dBtn2) dBtn2.style.fontFamily = "'SolaimanLipi', sans-serif";
    } else {
        modal.classList.remove("lang-bn");
        title.style.fontFamily = "'Inter', sans-serif";
        if(dBtn1) dBtn1.style.fontFamily = "'Inter', sans-serif";
        if(dBtn2) dBtn2.style.fontFamily = "'Inter', sans-serif";
    }

    const t = aiTranslations[lang];
    title.innerHTML = '<i class="fa-solid fa-robot"></i> ' + t.title;
    document.getElementById("ai-sub").innerHTML = t.sub;
    
    if(dBtn1) dBtn1.innerHTML = t.demoBtn1;
    if(dBtn2) dBtn2.innerHTML = t.demoBtn2;

    document.getElementById("txt-male").innerText = t.male;
    document.getElementById("sub-male").innerText = t.smale;
    document.getElementById("txt-female").innerText = t.female;
    document.getElementById("sub-female").innerText = t.sfemale;
    document.getElementById("txt-hijab").innerText = t.hijab;
    document.getElementById("sub-hijab").innerText = t.shijab;
    document.getElementById("ins-head").innerText = t.insHead;
    document.getElementById("ins-body").innerHTML = t.insBody;
}

function processAiPassport(type) {
    const promptText = aiPrompts[type];
    const el = document.createElement('textarea');
    el.value = promptText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    const aiUrl = "https://aistudio.google.com/prompts/new_chat?model=gemini-2.0-flash-exp";
    window.open(aiUrl, "_blank");
}

function showAiDemo(num) {
    const box = document.getElementById("aiDemoBox" + num);
    if (box) {
        box.style.display = "flex";
    }
}

function hideAiDemo(num) {
    const box = document.getElementById("aiDemoBox" + num);
    if (box) {
        box.style.display = "none";
    }
}
