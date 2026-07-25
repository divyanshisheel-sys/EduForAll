/* ================================================
   EduForAll - Quality Education (SDG 4)
   Simple JavaScript written for a college project
================================================= */

/* ---------- Mobile Navbar Toggle ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// close mobile menu when a link is clicked
const allNavLinks = document.querySelectorAll(".nav-link");
allNavLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

/* ---------- Learn More Button (Smooth Scroll) ---------- */
const learnMoreBtn = document.getElementById("learnMoreBtn");
learnMoreBtn.addEventListener("click", function () {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Active Nav Link Highlight While Scrolling ---------- */
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {
  let currentSection = "";
  const scrollPos = window.scrollY + 120;

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  allNavLinks.forEach(function (link) {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active-link");
    }
  });
});

/* ---------- Read More Modal ---------- */
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const readMoreBtns = document.querySelectorAll(".read-more-btn");

// info shown inside the popup for each subject
const topicInfo = {
  maths: {
    title: "Mathematics",
    text: "Mathematics builds logical thinking and problem-solving ability. Our free resources cover arithmetic, algebra, geometry and basic statistics for students of all levels."
  },
  science: {
    title: "Science",
    text: "Science helps students understand the world through observation and experiments. Our courses cover physics, chemistry and biology basics with simple explanations."
  },
  programming: {
    title: "Programming",
    text: "Programming teaches students how to build websites, apps and software. Beginners can start with HTML, CSS and JavaScript before moving to advanced languages."
  },
  languages: {
    title: "Languages",
    text: "Learning new languages improves communication and opens doors to new opportunities. We offer beginner-friendly lessons in English, Hindi and more."
  }
};

readMoreBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const topic = btn.getAttribute("data-topic");
    modalTitle.textContent = topicInfo[topic].title;
    modalText.textContent = topicInfo[topic].text;
    modalOverlay.classList.add("show");
  });
});

modalClose.addEventListener("click", function () {
  modalOverlay.classList.remove("show");
});

modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("show");
  }
});

/* ---------- Animated Counters (run once when visible) ---------- */
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
  counters.forEach(function (counter) {
    const target = parseInt(counter.getAttribute("data-target"));
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 100));

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = current;
      }
    }, 20);
  });
}

const statsSection = document.getElementById("stats");

window.addEventListener("scroll", function () {
  const rect = statsSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;

  if (isVisible && !countersStarted) {
    countersStarted = true;
    startCounters();
  }
});

/* ---------- Quiz Functionality ---------- */
const submitQuizBtn = document.getElementById("submitQuizBtn");
const quizResult = document.getElementById("quizResult");
const quizQuestions = document.querySelectorAll(".quiz-question");

submitQuizBtn.addEventListener("click", function () {
  let score = 0;

  quizQuestions.forEach(function (question) {
    const correctAnswer = question.getAttribute("data-answer");
    const questionName = question.querySelector("input").name;
    const selected = document.querySelector('input[name="' + questionName + '"]:checked');

    // reset old colors
    question.classList.remove("correct", "wrong");

    if (selected) {
      if (selected.value === correctAnswer) {
        score++;
        question.classList.add("correct");
      } else {
        question.classList.add("wrong");
      }
    } else {
      question.classList.add("wrong");
    }
  });

  quizResult.textContent = "You scored " + score + " out of " + quizQuestions.length + "!";
});

/* ---------- Contact Form Validation ---------- */
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // reset messages
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formSuccess.textContent = "";

  // validate name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  }

  // validate email (simple check for @ and .)
  const emailValue = emailInput.value.trim();
  if (emailValue === "" || !emailValue.includes("@") || !emailValue.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // validate message
  if (messageInput.value.trim() === "") {
    messageError.textContent = "Please write a message.";
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent = "Thank you! Your message has been sent successfully.";
    contactForm.reset();
  }
});

/* ---------- Scroll To Top Button ---------- */
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});