/* ============================================
   COUNTRIES.JS
   Powers the "Countries" nav dropdown and the
   click-to-open country detail modal used by
   both the Countries section cards and the
   nav/footer country links.
   ============================================ */

const countryData = {
  uk: {
    name: "United Kingdom",
    flag: "https://flagcdn.com/w160/gb.png",
    stats: ["2-Year Post-Study Visa", "150+ Universities", "1-Year Master's Degrees"],
    intro: "The UK is home to some of the world's oldest and most respected universities, including Oxford, Cambridge, and Imperial College London. With shorter degree durations and a globally recognized qualification, it remains a top choice for Nepali students.",
    why: [
      "World-ranked universities with strong academic reputation",
      "One-year master's programs save time and cost",
      "Graduate Route visa allows 2 years of post-study work",
      "Multicultural cities with a large Nepali student community"
    ],
    fields: "Business, Engineering, Computer Science, Law, Health Sciences, and Creative Arts."
  },
  usa: {
    name: "United States",
    flag: "https://flagcdn.com/w160/us.png",
    stats: ["OPT Work Authorization", "4,000+ Institutions", "Top Global Rankings"],
    intro: "The United States hosts the largest population of international students in the world, offering unmatched flexibility in course selection, research opportunities, and access to leading industries right on campus.",
    why: [
      "Flexibility to choose or change majors during your degree",
      "Optional Practical Training (OPT) for real-world work experience",
      "World-class research facilities and funding opportunities",
      "Strong alumni and industry networks across every field"
    ],
    fields: "STEM, Business Administration, Computer Science, Healthcare, and Media Studies."
  },
  australia: {
    name: "Australia",
    flag: "https://flagcdn.com/w160/au.png",
    stats: ["2-4 Year Post-Study Work", "43 Universities", "Pathway to PR"],
    intro: "Australia combines high academic standards with a relaxed, welcoming lifestyle. Its universities are known for practical, industry-linked courses and strong support services for international students.",
    why: [
      "Post-study work rights of up to 4 years depending on your course",
      "Safe, student-friendly cities with a large Nepali community",
      "Clear pathways from graduation to permanent residency",
      "Part-time work rights while studying to help with living costs"
    ],
    fields: "Nursing, Engineering, IT, Hospitality Management, and Accounting."
  },
  germany: {
    name: "Germany",
    flag: "https://flagcdn.com/w160/de.png",
    stats: ["Tuition-Free at Public Universities", "18-Month Job Seeker Visa", "400+ Institutions"],
    intro: "Germany offers world-class, tuition-free education at its public universities, making it one of the most affordable study destinations in Europe without compromising on academic quality — especially in engineering and technology.",
    why: [
      "No or very low tuition fees at most public universities",
      "Globally respected degrees in engineering and applied sciences",
      "18-month post-study job seeker visa to find skilled work",
      "Central location for exploring the rest of Europe"
    ],
    fields: "Mechanical & Automotive Engineering, Computer Science, Renewable Energy, and Business."
  },
  newzealand: {
    name: "New Zealand",
    flag: "https://flagcdn.com/w160/nz.png",
    stats: ["3-Year Post-Study Work Visa", "8 Universities", "Globally Recognized Degrees"],
    intro: "New Zealand is known for its safe, welcoming environment and a quality-focused education system where all universities rank among the world's best, giving students strong value and genuine post-study opportunities.",
    why: [
      "Up to 3 years of post-study work rights after graduation",
      "Consistently ranked among the safest countries in the world",
      "Smaller class sizes with a strong focus on practical learning",
      "Beautiful, low-stress environment ideal for balancing study and life"
    ],
    fields: "Agriculture, Hospitality, IT, Environmental Science, and Nursing."
  }
};

function openCountryModal(key) {
  const data = countryData[key];
  if (!data) return;

  document.getElementById("countryModalFlag").src = data.flag;
  document.getElementById("countryModalFlag").alt = data.name + " Flag";
  document.getElementById("countryModalTitle").textContent = "Study in " + data.name;
  document.getElementById("countryModalIntro").textContent = data.intro;
  document.getElementById("countryModalFields").textContent = data.fields;

  const statsEl = document.getElementById("countryModalStats");
  statsEl.innerHTML = "";
  data.stats.forEach(stat => {
    const span = document.createElement("span");
    span.textContent = stat;
    statsEl.appendChild(span);
  });

  const whyEl = document.getElementById("countryModalWhy");
  whyEl.innerHTML = "";
  data.why.forEach(point => {
    const li = document.createElement("li");
    li.textContent = point;
    whyEl.appendChild(li);
  });

  document.getElementById("countryModalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCountryModal() {
  document.getElementById("countryModalOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("countryModalOverlay");
  const closeBtn = document.getElementById("countryModalClose");

  if (closeBtn) closeBtn.addEventListener("click", closeCountryModal);

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeCountryModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCountryModal();
  });
});
