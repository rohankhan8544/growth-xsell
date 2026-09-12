import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKAmajJnlVIMMoCRCQvxePSUnUTWi8Hr8",
  authDomain: "gen-lang-client-0390082716.firebaseapp.com",
  projectId: "gen-lang-client-0390082716",
  storageBucket: "gen-lang-client-0390082716.firebasestorage.app",
  messagingSenderId: "930295643959",
  appId: "1:930295643959:web:23554a2ad5c08a0acf24b2",
  measurementId: "G-T9E4S5P4G3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function trackEvent(eventName, eventParams = {}) {
  logEvent(analytics, eventName, eventParams);
}

window.trackEvent = trackEvent;

function getLinkEvent(link) {
  const href = link.getAttribute("href") || "";
  const text = link.textContent.trim().toLowerCase();
  const explicitEvent = link.dataset.analytics;

  if (explicitEvent) {
    return explicitEvent;
  }

  if (href.startsWith("mailto:")) {
    return "email_click";
  }

  if (href.startsWith("tel:")) {
    return "phone_click";
  }

  if (href.includes("calendly.com") || /assessment|consultation/.test(text)) {
    return "consultation_clicked";
  }

  if (href.includes("#contact")) {
    return "contact_clicked";
  }

  if (link.classList.contains("cs-card")) {
    return "case_study_view";
  }

  return null;
}

function trackLinks() {
  document.querySelectorAll("a").forEach((link) => {
    const eventName = getLinkEvent(link);
    if (!eventName) return;

    link.addEventListener("click", () => {
      const params = {};
      const analyticsName = link.dataset.analyticsName;
      if (analyticsName) params.cta_name = analyticsName;
      if (link.classList.contains("cs-card")) {
        params.case_study = link.id || link.getAttribute("href");
      }
      trackEvent(eventName, params);
      if (link.dataset.analyticsCta) {
        trackEvent("cta_click", {
          cta_name: link.dataset.analyticsCta,
        });
      }
    });
  });
}

function trackForms() {
  document.querySelectorAll("form").forEach((form) => {
    const formName = form.getAttribute("name") || form.id || "contact_form";
    let started = false;
    form.addEventListener("input", () => {
      if (started) return;
      started = true;
      trackEvent("form_start", { form_name: formName });
    });
    form.addEventListener("submit", () => {
      trackEvent("form_submit", { form_name: formName });
    });
  });
}

function trackPageInterest() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("case-study")) {
    trackEvent("case_study_view", {
      case_study: document.title,
    });
  } else if (path.includes("/solutions") || path.includes("/capabilities")) {
    trackEvent("service_view", {
      service: document.title,
    });
  }
}

trackLinks();
trackForms();
trackPageInterest();
