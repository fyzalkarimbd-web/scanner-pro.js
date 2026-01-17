function triggerAlert(msg) {
    const popup = document.getElementById('customPopup');
    const msgEl = document.getElementById('popupMessage');
    if (popup && msgEl) {
        msgEl.innerText = msg;
        popup.classList.add('active');
    } else {
        alert(msg);
    }
}

function openWriterModal() {
    var modal = document.getElementById('writerModal');
    if (modal) {
        modal.style.display = 'flex';
        if (typeof setActiveMode === 'function') setActiveMode('mode-writer');
        
        const pagesList = document.getElementById('pages-list');
        if (pagesList.innerHTML.trim() === "") {
            addNewPage();
        }
    }
}

function closeWriterModal() {
    document.getElementById('writerModal').style.display = 'none';
}

function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

function applyFontSize(size) {
    document.execCommand('fontSize', false, size);
}

function addNewPage() {
    const pagesList = document.getElementById('pages-list');
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page-unit';
    pageDiv.innerHTML = `
        <button class="del-page-icon" onclick="removeThisPage(this)" title="Delete Page" type="button"><i class="fa-solid fa-xmark"></i></button>
        <div contenteditable="true" class="page-body" data-placeholder="Start your writing here in Bengali, English, any language, etc." spellcheck="false"></div>
    `;
    pagesList.appendChild(pageDiv);
    pageDiv.scrollIntoView({ behavior: 'smooth' });
}

function removeThisPage(btn) {
    const pages = document.querySelectorAll('.page-unit');
    if (pages.length > 1) {
        btn.parentElement.remove();
    } else {
        triggerAlert("There must be at least one page.");
    }
}

function clearWriter() {
    document.getElementById('pages-list').innerHTML = "";
    addNewPage();
}

function printWriterContent() {
    const pages = document.querySelectorAll('.page-body');
    let allHtml = "";
    let hasContent = false;
    
    pages.forEach((page) => {
        if(page.innerText.trim() !== "") {
            allHtml += `<div class="p-wrap">${page.innerHTML}</div>`;
            hasContent = true;
        }
    });

    if (!hasContent) {
        triggerAlert("Write something first.");
        return;
    }

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>A4_Document_Writer</title>
                <style>
                    @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
                    @page { size: A4; margin: 0; }
                    
                    /* গুরুত্বপূর্ণ: কালার এবং আন্ডারলাইন নিশ্চিত করার জন্য */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    body { margin: 0; padding: 0; background: #fff; }
                    
                    .p-wrap {
                        width: 210mm; 
                        min-height: 297mm;
                        padding: 20mm; 
                        margin: 0 auto;
                        font-family: 'SolaimanLipi', Arial, sans-serif;
                        font-size: 18px; 
                        line-height: 1.6;
                        color: #000; 
                        box-sizing: border-box;
                        word-wrap: break-word; 
                        text-align: left;
                        page-break-after: always;
                    }

                    /* --- আন্ডারলাইন ফিক্স করার কোড --- */
                    u, [style*="underline"] {
                        text-decoration: underline !important;
                        text-decoration-skip-ink: none !important; /* যুক্তবর্ণের নিচে দাগ কাটবে না */
                        text-underline-offset: 3px !important;    /* দাগটি একটু নিচে নামিয়ে দিবে যাতে স্পষ্ট বোঝা যায় */
                        text-decoration-thickness: 1px !important; /* দাগের পুরুত্ব নিশ্চিত করবে */
                    }

                    .p-wrap:last-child { page-break-after: auto; }
                </style>
            </head>
            <body>
                ${allHtml}
                <script>
                    window.onload = function() {
                        setTimeout(function(){
                            window.print();
                            window.close();
                        }, 500);
                    };
                <\/script>
            </body>
        </html>
    `);
    printWin.document.close();
}
