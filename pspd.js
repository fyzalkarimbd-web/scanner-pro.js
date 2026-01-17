const CLIENT_ID = '742363063259-hecd6i38ovt8kv16na4c7qrv21hrpg9k.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCQDzRhsSN13iIsQ81eXBE-bHMSm-X2BDY'; 
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/drive.file';
   
   let fileToDeleteId = null; 
   let elementToRemove = null;

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  // আপনার ওয়েবসাইটের ডিফল্ট কাস্টম পপআপ ফাংশন
  function triggerAlert(msg) {
    const popup = document.getElementById('customPopup');
    const msgEl = document.getElementById('popupMessage');
    
    if (popup && msgEl) {
        msgEl.innerText = msg; // মেসেজ সেট করা
        popup.classList.add('active'); // আপনার সাইটের সিএসএস অনুযায়ী পপআপ ওপেন করা
    } else {
        // যদি আপনার কাস্টম পপআপের আইডি ভিন্ন হয়, তবে এখানে তা চেক করুন
        console.log("Custom popup not found, message: " + msg);
    }
}

  function gapiLoaded() { gapi.load('client', intializeGapiClient); }

  async function intializeGapiClient() {
    await gapi.client.init({ apiKey: API_KEY, discoveryDocs: [DISCOVERY_DOC] });
    gapiInited = true;
    checkAuthStatus(); // পেজ লোড হলে চেক করবে আগে লগইন করা আছে কি না
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // এটি পরে হ্যান্ডেল করা হবে
    });
    gisInited = true;
    checkAuthStatus();
  }

  // লগইন চেক করার লজিক (Persistence)
  function checkAuthStatus() {
    const savedToken = localStorage.getItem('studio_cloud_token');
    if (savedToken && gapiInited) {
        const token = JSON.parse(savedToken);
        // টোকেন এক্সপায়ার হয়েছে কি না চেক (Tokens usually last 1 hour)
        if (Date.now() < token.expires_at) {
            gapi.client.setToken(token);
            if(document.getElementById('studioCloudModal').style.display === 'flex') {
                showMainUI();
            }
        } else {
            localStorage.removeItem('studio_cloud_token');
        }
    }
  }

  function openStudioCloudModal() {
    var modal = document.getElementById('studioCloudModal');
    if (modal) {
        modal.style.display = 'flex';
        if (typeof setActiveMode === 'function') setActiveMode('mode-studio-cloud');
        initDragAndDrop();
        
        // যদি আগেই লগইন করা থাকে তবে সরাসরি UI দেখাবে
        if (gapi.client.getToken() !== null) {
            showMainUI();
        } else {
            document.getElementById('cloud-auth-section').style.display = 'block';
            document.getElementById('cloud-main-ui').style.display = 'none';
        }
    }
  }

  function showMainUI() {
      document.getElementById('cloud-auth-section').style.display = 'none';
      document.getElementById('cloud-main-ui').style.display = 'block';
      listCloudFiles();
  }

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) throw (resp);
      // টোকেন সেভ করা (১ ঘন্টার জন্য)
      resp.expires_at = Date.now() + (resp.expires_in * 1000);
      localStorage.setItem('studio_cloud_token', JSON.stringify(resp));
      showMainUI();
    };
    if (gapi.client.getToken() === null) tokenClient.requestAccessToken({prompt: 'consent'});
    else tokenClient.requestAccessToken({prompt: ''});
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken(null);
      localStorage.removeItem('studio_cloud_token'); // ক্যাশ ডিলিট
      document.getElementById('cloud-auth-section').style.display = 'block';
      document.getElementById('cloud-main-ui').style.display = 'none';
    }
  }

  function initDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('st-photo');
    if(!dropZone) return;
    ['dragover', 'dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); });
    });
    dropZone.addEventListener('dragover', () => dropZone.classList.add('active'));
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('active'));
    dropZone.addEventListener('drop', e => {
        dropZone.classList.remove('active');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            showFilePreview(files[0]);
        }
    });
    fileInput.onchange = () => { if (fileInput.files[0]) showFilePreview(fileInput.files[0]); };
  }

  function showFilePreview(file) {
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('img-view').src = e.target.result;
        document.getElementById('preview-img-container').style.display = 'block';
    }
    reader.readAsDataURL(file);
  }

  async function uploadToDrive() {
    const fileInput = document.getElementById('st-photo');
    const name = document.getElementById('st-name').value.trim();
    const phone = document.getElementById('st-phone').value.trim();
    const address = document.getElementById('st-address').value.trim();
    const loader = document.getElementById('upload-loader');

    if (!fileInput.files[0] || !name) { 
        triggerAlert("Required: Please provide a name and select a photo."); 
        return; 
    }

    loader.style.display = 'block';
    const file = fileInput.files[0];
    
    // ডাটা ফরম্যাটকে আরও সুরক্ষিত করা হলো
    const secureInfo = `NAME:${name} | PHONE:${phone} | ADDR:${address}`;

    const metadata = {
        name: `IDScannerPro_${name}_${Date.now()}.jpg`,
        mimeType: 'image/jpeg',
        description: secureInfo, // ডেসক্রিপশনে সেভ
        properties: { // বাড়তি সুরক্ষা হিসেবে প্রপার্টিজেও সেভ করা হচ্ছে
            'custName': name,
            'custPhone': phone,
            'custAddr': address
        }
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    try {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + gapi.client.getToken().access_token }),
            body: formData
        });

        if (response.ok) {
            loader.style.display = 'none';
            triggerAlert("Successfully saved! Record is safe regardless of image size.");
            // ইনপুট রিসেট
            document.getElementById('st-name').value = '';
            document.getElementById('st-phone').value = '';
            document.getElementById('st-address').value = '';
            document.getElementById('preview-img-container').style.display = 'none';
            fileInput.value = "";
            listCloudFiles(); 
        } else {
            throw new Error("Upload failed");
        }
    } catch (err) {
        loader.style.display = 'none';
        triggerAlert("Error saving data. Please check your connection.");
    }
}

  // ফিক্সড ডিলিট লজিক (আপনার সাইটের পপআপ সহ)
  function deleteCloudFile(fileId, btn) {
    // ডিলিট করার জন্য ডাটাগুলো সেভ করে রাখা
    fileToDeleteId = fileId;
    elementToRemove = btn.closest('.st-card');

    // আপনার সাইটের কাস্টম পপআপ ট্রিগার করা
    triggerAlert("Are you sure? This record will be deleted forever.");

    // পপআপের 'Okay, Got it' বাটনের কাজ সাময়িকভাবে পরিবর্তন করা
    const popupBtn = document.querySelector('#customPopup .popup-btn');
    popupBtn.onclick = confirmAndExecuteDelete; 
}

  function searchRecords() {
    const q = document.getElementById('st-search').value.toLowerCase();
    document.querySelectorAll('.st-card').forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
    });
  }

  async function listCloudFiles() {
    const gallery = document.getElementById('cloud-gallery');
    gallery.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:#4285F4;"><i class="fa-solid fa-spinner fa-spin"></i> Syncing all records...</div>';
    
    try {
        const resp = await gapi.client.drive.files.list({
            q: "name contains 'IDScannerPro_'",
            fields: 'files(id, name, thumbnailLink, description, webContentLink, properties)',
            orderBy: 'createdTime desc'
        });
        
        const files = resp.result.files;
        gallery.innerHTML = '';

        if (files && files.length > 0) {
            files.forEach(file => {
                let name = "N/A", phone = "N/A", address = "N/A";
                
                // ১. প্রথমে প্রপার্টিজ থেকে ডাটা খোঁজা (সবচেয়ে নির্ভুল পদ্ধতি)
                if (file.properties) {
                    name = file.properties.custName || "N/A";
                    phone = file.properties.custPhone || "N/A";
                    address = file.properties.custAddr || "N/A";
                } 
                // ২. ব্যাকআপ: যদি প্রপার্টিজ না থাকে তবে ডেসক্রিপশন থেকে খোঁজা
                else if (file.description) {
                    const desc = file.description;
                    if (desc.includes('|')) {
                        const parts = desc.split('|');
                        parts.forEach(p => {
                            if (p.includes('NAME:')) name = p.replace('NAME:', '').trim();
                            if (p.includes('PHONE:')) phone = p.replace('PHONE:', '').trim();
                            if (p.includes('ADDR:')) address = p.replace('ADDR:', '').trim();
                        });
                    }
                }

                gallery.innerHTML += `
                    <div class='st-card'>
                        <div class='st-card-img-box'>
                            <img src='${file.thumbnailLink ? file.thumbnailLink.replace('s220', 's500') : "https://via.placeholder.com/200?text=No+Preview"}'/>
                        </div>
                        <div class='st-card-info'>
                            <b>${name}</b>
                            <p><i class="fa-solid fa-phone"></i> ${phone}</p>
                            <p><i class="fa-solid fa-location-dot"></i> ${address}</p>
                        </div>
                        <div class='st-card-actions'>

                             <button onclick='deleteCloudFile("${file.id}", this)' class='st-btn-action btn-del'><i class="fa-solid fa-trash"></i> Delete</button>
                            <a href='${file.webContentLink}' target='_blank' class='st-btn-action btn-dl'><i class="fa-solid fa-download"></i> Download</a>
                           
                        </div>
                    </div>`;
            });
        } else {
            gallery.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#94a3b8; padding:30px;">No records found.</p>';
        }
    } catch (err) {
        gallery.innerHTML = '<p style="color:red; text-align:center; grid-column:1/-1;">Connection error. Please reconnect.</p>';
    }
}

  function closeStudioCloudModal() {
    document.getElementById('studioCloudModal').style.display = 'none';
  }

async function confirmAndExecuteDelete() {
    if (fileToDeleteId) {
        try {
            // ১. গুগল ড্রাইভ থেকে ডিলিট করা
            await gapi.client.drive.files.delete({ 'fileId': fileToDeleteId });

            // ২. স্ক্রিন থেকে কার্ডটি রিমুভ করা
            if (elementToRemove) elementToRemove.remove();

            // ৩. পপআপ বন্ধ করা
            closePopup();

        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete from Drive.");
            closePopup();
        } finally {
            // ৪. বাটনটিকে আবার আগের সাধারণ অবস্থায় ফিরিয়ে আনা
            // যাতে অন্য কোনো অ্যালার্ট আসলে সেটি সাধারণ পপআপ হিসেবে কাজ করে
            document.querySelector('#customPopup .popup-btn').onclick = closePopup;
            fileToDeleteId = null;
            elementToRemove = null;
        }
    }
}
