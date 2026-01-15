let curWedT = 1;

// Language specific texts for static elements and placeholders
const translations = {
    bn: {
        // UI elements
        mainTitle: "বিবাহ স্মরণিকা",
        labelLang: "ভাষা",
        labelReligion: "ধর্ম",
        labelTemplate: "টেমপ্লেট পছন্দ করুন:",
        groomPlaceholder: "বরের নাম",
        bridePlaceholder: "কনের নাম",
        uploadPhoto1: "Upload Photo 1",
        uploadPhoto2: "Upload Photo 2",
        datePlaceholder: "বিবাহ তারিখ",
        venuePlaceholder: "বিবাহ স্থান",
        msgPlaceholder: "স্মরণিকা বার্তা...",
        saveJpg: "JPG সেভ করুন",
        savePdf: "PDF সেভ করুন",

        // Card content
        cardTitle: "বিবাহ স্মরণিকা",
        andSeparator: "ও",
        datePrefix: "বিবাহ তারিখ: ",
        venuePrefix: "বিবাহ স্থান: ",
        
        // Religion specific texts
        islamRel: "বিসমিল্লাহির রহমানির রহিম",
        hinduRel: "ওঁ গণেশায় নমঃ",
        christianRel: "ঈশ্বর প্রেমস্বরূপ",
        buddhistRel: "জগতের সকল প্রাণী সুখী হোক", 
        othersRel: "", 
        
        // Default input values
        groomDefaultVal: "মোঃ ফয়জুল করিম",
        brideDefaultVal: "মোসাঃ কাজল রেখা",
        dateDefaultVal: "১০ই জুন, ২০১২ সাল",
        venueDefaultVal: "ঝাউতলা, চট্টগ্রাম, বাংলাদেশ।",
        msgDefaultVal: "আমাদের বিবাহিত জীবনের সুখ ও সমৃদ্ধির জন্য সকলের কাছে দোয়া প্রার্থী।"
    },
    en: {
        // UI elements
        mainTitle: "Wedding Memento",
        labelLang: "Language",
        labelReligion: "Religion",
        labelTemplate: "Choose Template:",
        groomPlaceholder: "Groom's Name",
        bridePlaceholder: "Bride's Name",
        uploadPhoto1: "Upload Photo 1",
        uploadPhoto2: "Upload Photo 2",
        datePlaceholder: "Wedding Date",
        venuePlaceholder: "Wedding Venue",
        msgPlaceholder: "Memento Message...",
        saveJpg: "SAVE JPG (HD)",
        savePdf: "SAVE PDF (HD)",

        // Card content
        cardTitle: "Wedding Memento",
        andSeparator: "&",
        datePrefix: "Wedding Date: ",
        venuePrefix: "Wedding Venue: ",
        
        // Religion specific texts
        islamRel: "In the name of Allah",
        hinduRel: "Om Ganeshay Namah",
        christianRel: "God is Love",
        buddhistRel: "May all beings be happy",
        othersRel: "", 
        
        // Default input values
        groomDefaultVal: "Md. Faizul Karim",
        brideDefaultVal: "Mst. Kajol Rekha",
        dateDefaultVal: "June 10, 2012",
        venueDefaultVal: "Jhautala, Chattogram, Bangladesh.",
        msgDefaultVal: "We seek everyone's prayers for our happy and prosperous married life."
    }
};

function openWeddingModal() {
    document.getElementById('weddingModal').style.display = 'flex';
    updateWedCard();
}

function closeWeddingModal() {
    document.getElementById('weddingModal').style.display = 'none';
    document.getElementById('wdm-lang').value = 'en'; 
    document.getElementById('wdm-rel').value = 'islam'; 
    const t = translations['en'];
    document.getElementById('in-groom').value = t.groomDefaultVal;
    document.getElementById('in-bride').value = t.brideDefaultVal;
    document.getElementById('in-date').value = t.dateDefaultVal;
    document.getElementById('in-venue').value = t.venueDefaultVal;
    document.getElementById('in-msg').value = t.msgDefaultVal;
    document.getElementById('pv-g').src = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4xqz238X7tAnCXP2Q8cy1D2HNqWODSe6QQqoALMPow4hvXALRyAswn7IkbImr6CoomoETvzwrzadwZVPGhZmYI6jD_zcJn4og3eH2CLLh3E8CgRtslvJqiJbMlw65TafJJNNWOCJ7JlMOGBvQMWJUU-Yv4ao2Jt_3x_OSV3BCs4VzgjZOR9aI9SbpX90/s1781/fyzal.jpeg';
    document.getElementById('pv-b').src = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNymKgEuEk43BCasxhyphenhyphen2WrAlXEuCOkhdPCRPyIglB4H33kt3Z0Myu0QhAlreWCN4icd-om-e0uiWsHt6iRwO6AGaRk29w4uOSvu2_wxdl-c0TKXh7Juj7U5SKbZq4doyg1tryMPrEERazhbMANEuYwPIg8V20bfhmyVPb_QM8kLS0viDqGgvwP0piE05g/s1184/kajol.webp';
    document.getElementById('up-g').value = "";
    document.getElementById('up-b').value = "";
    curWedT = 1;
    document.querySelectorAll('.wdm-t-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-temp-1').classList.add('active');
    document.getElementById('wdm-card-preview').className = 'wdm-t1';
    updateWedCard();
}

function setWedTemp(n, btn) {
    curWedT = n;
    document.querySelectorAll('.wdm-t-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('wdm-card-preview').className = 'wdm-t' + n;
}

function updateWedCard() {
    const lang = document.getElementById('wdm-lang').value;
    const rel = document.getElementById('wdm-rel').value;
    const t = translations[lang];

    document.getElementById('wdm-main-title').innerText = t.mainTitle;
    document.getElementById('label-lang').innerText = t.labelLang;
    document.getElementById('label-religion').innerText = t.labelReligion;
    document.getElementById('label-template').innerText = t.labelTemplate;
    document.getElementById('in-groom').placeholder = t.groomPlaceholder;
    document.getElementById('in-bride').placeholder = t.bridePlaceholder;
    document.getElementById('btn-upload-g').innerText = t.uploadPhoto1;
    document.getElementById('btn-upload-b').innerText = t.uploadPhoto2;
    document.getElementById('in-date').placeholder = t.datePlaceholder;
    document.getElementById('in-venue').placeholder = t.venuePlaceholder;
    document.getElementById('in-msg').placeholder = t.msgPlaceholder;
    
    document.querySelector('.actions button:nth-child(1)').innerText = t.saveJpg;
    document.querySelector('.actions button:nth-child(2)').innerText = t.savePdf;

    let relIcon = '';
    let relText = '';
    switch (rel) {
        case 'islam': relIcon = "☪"; relText = t.islamRel; break;
        case 'hindu': relIcon = "🕉"; relText = t.hinduRel; break;
        case 'christian': relIcon = "✝"; relText = t.christianRel; break;
        case 'buddhist': relIcon = "☸"; relText = t.buddhistRel; break;
        case 'others': relIcon = "❤"; relText = t.othersRel; break;
    }
    document.getElementById('pv-rel-icon').innerText = relIcon;
    document.getElementById('pv-rel-txt').innerText = relText;

    document.getElementById('pv-title').innerText = t.cardTitle;
    document.getElementById('pv-and').innerText = t.andSeparator;
    
    document.getElementById('pv-groom').innerText = document.getElementById('in-groom').value;
    document.getElementById('pv-bride').innerText = document.getElementById('in-bride').value;
    
    // নতুন কোড (ম্যানুয়ালি বসান)
document.getElementById('pv-date').innerHTML = '<b>' + t.datePrefix + '</b>' + document.getElementById('in-date').value;
document.getElementById('pv-venue').innerHTML = '<b>' + t.venuePrefix + '</b>' + document.getElementById('in-venue').value;
    document.getElementById('pv-msg').innerText = document.getElementById('in-msg').value;

    const currentGroomVal = document.getElementById('in-groom').value;
    const currentBrideVal = document.getElementById('in-bride').value;
    const currentMsgVal = document.getElementById('in-msg').value;
    const currentDateVal = document.getElementById('in-date').value;
    const currentVenueVal = document.getElementById('in-venue').value;
    const otherLang = lang === 'en' ? 'bn' : 'en';

    if (currentGroomVal === translations[otherLang].groomDefaultVal) document.getElementById('in-groom').value = t.groomDefaultVal;
    if (currentBrideVal === translations[otherLang].brideDefaultVal) document.getElementById('in-bride').value = t.brideDefaultVal;
    if (currentMsgVal === translations[otherLang].msgDefaultVal) document.getElementById('in-msg').value = t.msgDefaultVal;
    if (currentDateVal === translations[otherLang].dateDefaultVal) document.getElementById('in-date').value = t.dateDefaultVal;
    if (currentVenueVal === translations[otherLang].venueDefaultVal) document.getElementById('in-venue').value = t.venueDefaultVal;
}


function loadWedImg(input, id) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => { document.getElementById(id).src = e.target.result; };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveWedJPG() {
    const card = document.getElementById('wdm-card-preview');
    html2canvas(card, { scale: 4, useCORS: true, logging: false }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'wedding-memento-hd.jpg';
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
    });
}

function saveWedPDF() {
    const { jsPDF } = window.jspdf;
    const card = document.getElementById('wdm-card-preview');
    html2canvas(card, { scale: 4, useCORS: true }).then(canvas => {
        const img = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();
        pdf.addImage(img, 'JPEG', 0, 0, pdfW, pdfH);
        pdf.save('wedding-memento-hd.pdf');
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('wdm-lang').value = 'en';
    updateWedCard(); 
});
