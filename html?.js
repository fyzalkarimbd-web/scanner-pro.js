(function() {
    // ব্রাউজারের অ্যাড্রেস বারে অতিরিক্ত প্যারামিটার (? বা #) আছে কিনা তা যাচাই করা হচ্ছে
    if (window.location.search || window.location.hash) {
      
      // শুধুমাত্র মূল ডোমেইন এবং পেজের .html লিঙ্কটি নেওয়া হচ্ছে
      var cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      
      try {
        // পেজ রিলোড করা ছাড়াই ব্রাউজারের অ্যাড্রেস বারটি ক্লিন করা হচ্ছে
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
      } catch (e) {
        // কোনো ব্রাউজারে এরর এড়াতে কন্সোল লগ
        console.warn("URL cleanup failed: ", e);
      }
    }
  })();
