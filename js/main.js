/* ==========================================================================
   INCEPT EDUCATION CONSULTANCY — MAIN SITE SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Load editable content from config.js (if present) ---------- */
  if (typeof siteConfig !== "undefined") {
    document.querySelectorAll(".editable").forEach(function (el) {
      var key = el.getAttribute("data-key");
      if (key && siteConfig[key]) {
        el.innerHTML = siteConfig[key];
      }
    });
  }

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // On mobile, tapping a dropdown toggle opens the submenu instead of navigating
    document.querySelectorAll(".has-dropdown > .dropdown-toggle").forEach(function (toggle) {
      toggle.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          toggle.parentElement.classList.toggle("open");
        }
      });
    });

    // Close mobile menu after clicking a normal link
    document.querySelectorAll(".nav-menu a:not(.dropdown-toggle)").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  /* ---------- Hero background slider ---------- */
  var heroSlides = document.querySelectorAll(".hero-bg-slide");
  if (heroSlides.length) {
    var heroIndex = 0;
    setInterval(function () {
      heroSlides[heroIndex].classList.remove("active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("active");
    }, 4000);
  }

  /* ---------- Testimonials slider ---------- */
  var testiCards = document.querySelectorAll(".testimonial-card");
  var dots = document.querySelectorAll(".testimonial-dots .dot");
  var testiIndex = 0;

  function showTestimonial(i) {
    testiCards.forEach(function (c) { c.classList.remove("active"); });
    dots.forEach(function (d) { d.classList.remove("active"); });
    testiCards[i].classList.add("active");
    if (dots[i]) dots[i].classList.add("active");
    testiIndex = i;
  }

  if (testiCards.length) {
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { showTestimonial(i); });
    });
    setInterval(function () {
      showTestimonial((testiIndex + 1) % testiCards.length);
    }, 6000);
  }

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    });
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-menu > li > a");
  window.addEventListener("scroll", function () {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sec.id) link.classList.add("active");
        });
      }
    });
  });

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector("button[type='submit']");
      var originalText = btn.innerHTML;
      btn.innerHTML = "Sending...";
      btn.disabled = true;
      setTimeout(function () {
        alert("Thank you! Your request has been received. Our counselor will contact you shortly.");
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 900);
    });
  }

  /* ---------- Chatbot ---------- */
  var chatbotToggle = document.getElementById("chatbotToggle");
  var chatbotContainer = document.getElementById("chatbotContainer");
  var chatbotClose = document.getElementById("chatbotClose");
  var chatbotMessages = document.getElementById("chatbotMessages");
  var chatbotInput = document.getElementById("chatbotInput");
  var chatbotSend = document.getElementById("chatbotSend");

  function addChatMessage(text, sender) {
    var wrap = document.createElement("div");
    wrap.className = "chatbot-message " + sender;
    var bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;
    wrap.appendChild(bubble);
    chatbotMessages.appendChild(wrap);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function botReply(query) {
    var q = query.toLowerCase();
    var reply = "Thanks for your question! For detailed help, please book a free counseling session and our team will assist you directly.";

    var kb = (typeof siteConfig !== "undefined" && siteConfig.chatbotKnowledge) ? siteConfig.chatbotKnowledge : null;

    if (kb) {
      for (var key in kb) {
        if (q.indexOf(key) !== -1) { reply = kb[key]; break; }
      }
    } else {
      if (q.indexOf("countr") !== -1) reply = "We offer study abroad counseling for UK, USA, Australia, Germany, and New Zealand.";
      else if (q.indexOf("visa") !== -1) reply = "Our visa process includes document preparation, application filing, and interview coaching with a 98% success rate.";
      else if (q.indexOf("counsel") !== -1 || q.indexOf("book") !== -1) reply = "You can book a free counseling session using the 'Get Free Counseling' button or the contact form below.";
      else if (q.indexOf("contact") !== -1) reply = "You can reach us at 01-4547405 or inceptedu@gmail.com. Visit our office at Putalisadak-30, Kathmandu.";
    }

    setTimeout(function () { addChatMessage(reply, "bot"); }, 500);
  }

  if (chatbotToggle && chatbotContainer) {
    chatbotToggle.addEventListener("click", function () {
      chatbotContainer.classList.toggle("active");
    });
    if (chatbotClose) {
      chatbotClose.addEventListener("click", function () {
        chatbotContainer.classList.remove("active");
      });
    }

    document.querySelectorAll(".quick-reply").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var query = btn.getAttribute("data-query");
        addChatMessage(query, "user");
        botReply(query);
      });
    });

    if (chatbotSend && chatbotInput) {
      function sendMessage() {
        var val = chatbotInput.value.trim();
        if (!val) return;
        addChatMessage(val, "user");
        botReply(val);
        chatbotInput.value = "";
      }
      chatbotSend.addEventListener("click", sendMessage);
      chatbotInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
      });
    }
  }

});
