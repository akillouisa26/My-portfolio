/* ============================================================
   ADMIN PANEL & DATA CMS - Portfolio Management System
   ============================================================ */

(function () {
  const STORAGE_KEY = "portfolio_cms_data";
  const PIN_KEY = "portfolio_admin_pin";
  const GH_TOKEN_KEY = "portfolio_gh_token";
  const GH_REPO_KEY = "portfolio_gh_repo";

  // SVG Icons for Password Visibility Toggle
  const EYE_OPEN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const EYE_CLOSED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

  // Embedded default data
  const DEFAULT_PORTFOLIO_DATA = {
    "cvUrl": "resume.pdf",
    "skills": {
      "mern": [
        { "id": "s1", "name": "HTML & CSS", "badge": "Familiar", "badgeType": "known", "width": "85%" },
        { "id": "s2", "name": "JavaScript", "badge": "Familiar", "badgeType": "known", "width": "75%" },
        { "id": "s3", "name": "React", "badge": "Learning", "badgeType": "learning", "width": "22%" },
        { "id": "s4", "name": "Node.js & Express", "badge": "Learning", "badgeType": "learning", "width": "18%" },
        { "id": "s5", "name": "MongoDB", "badge": "Learning", "badgeType": "learning", "width": "18%" }
      ],
      "languages": [
        { "id": "s6", "name": "Python", "badge": "Familiar", "badgeType": "known", "width": "62%" },
        { "id": "s7", "name": "C++", "badge": "Familiar", "badgeType": "known", "width": "58%" },
        { "id": "s8", "name": "SQL", "badge": "Familiar", "badgeType": "known", "width": "52%" },
        { "id": "s9", "name": "Java", "badge": "Slight", "badgeType": "slight", "width": "20%" },
        { "id": "s10", "name": "PHP", "badge": "Slight", "badgeType": "slight", "width": "22%" }
      ]
    },
    "education": [
      {
        "id": "edu1",
        "role": "Master of Computer Application",
        "place": "St. Joseph's College(Autonomous), Tiruchirappalli.",
        "date": "2025 - Present",
        "desc": "CGPA: 9.3"
      },
      {
        "id": "edu2",
        "role": "B. Sc. Computer Science",
        "place": "Fatima College(Autonomous), Madurai.",
        "date": "2022 - 2025",
        "desc": "CGPA: 8.6"
      }
    ],
    "internships": [
      {
        "id": "int1",
        "role": "Full Stack Developer Intern",
        "place": "FrontierWox Tech Private Limited",
        "date": "2026 — Present",
        "desc": "Currently working on developing responsive and user-friendly web applications using HTML, CSS, and JavaScript, while actively learning and building full-stack applications with React.js, Node.js, Express, and MongoDB. Collaborating with the team on UI development, debugging, and enhancing user experience while gaining hands-on experience in the MERN stack."
      }
    ],
    "projects": [
      {
        "id": "p1",
        "title": "Age Detection and Comparison System",
        "desc": "A real-time age detection and age calculator application built using Python, OpenCV, and Deep Learning. The system captures live video, detects faces, predicts age ranges, and compares them with the user’s actual age for accuracy analysis.",
        "tags": ["Python", "OpenCV", "Tkinter", "Deep Learning"],
        "github": "https://github.com/akillouisa26/Age-Detection-and-Comparison-System",
        "live": ""
      },
      {
        "id": "p2",
        "title": "Online Book Store Management System",
        "desc": "A web-based book buying and selling platform developed using PHP, MySQL, JavaScript, and CSS. Users can browse books, search by category or title, and place orders. An admin panel is included to manage inventory, update stock, track orders, and maintain customer records efficiently.",
        "tags": ["PHP", "CSS", "JavaScript", "SQL"],
        "github": "#",
        "live": ""
      },
      {
        "id": "p3",
        "title": "Portfolio Website",
        "desc": "A personal portfolio designed and built from scratch using HTML, CSS, and JavaScript. Features a warm glassmorphism UI with animated bubble background, smooth scroll reveals, project tilt effects, certificate lightbox, and a live visitor counter — fully responsive across all devices.",
        "tags": ["HTML", "CSS", "JavaScript"],
        "github": "https://github.com/akillouisa26/My-portfolio",
        "live": "#"
      }
    ],
    "achievements": [
      {
        "id": "ach1",
        "title": "First Rank — MCA",
        "org": "St. Joseph's College · 2026",
        "desc": "Secured First Rank and awarded a Silver Medal along with certificates, books, and cash prizes for outstanding academic performance."
      },
      {
        "id": "ach2",
        "title": "Canva Design Competition",
        "org": "Interdepartmental Competition",
        "desc": "Won first place for designing a poster on \"AI Takes Over the Future of the Global Economy.\""
      },
      {
        "id": "ach3",
        "title": "Science Exhibition",
        "org": "Interdepartmental Competition",
        "desc": "Secured second place for presenting a working model on Land Pollution, explaining its impact and practical preventive measures to the audience, and was awarded a certificate and cash prize."
      },
      {
        "id": "ach4",
        "title": "International Conference Paper Presenter",
        "org": "Next-Gen AI & Emerging Technologies for Sustainable Development",
        "desc": "Presented and published a research paper on AI-driven facial skin analysis and personalized cosmetic recommendation with integrated analytics, and received a certificate of recognition."
      },
      {
        "id": "ach5",
        "title": "Pitch Fest 2026 — Idea Presenter",
        "org": "Innovation Event",
        "desc": "Presented \"Fall Detection & Emergency Alert System\" designed to support elderly people with real-time safety and emergency response features, and received a participation certificate."
      },
      {
        "id": "ach6",
        "title": "SSLC — School Rank Holder",
        "org": "Academic Achievement · 2020",
        "desc": "Achieved Third Rank at the school level, reflecting strong academic consistency and dedication."
      },
      {
        "id": "ach7",
        "title": "March Past — Team Lead",
        "org": "Leadership Role",
        "desc": "Led the team as In-charge and successfully secured first place through coordination and teamwork."
      },
      {
        "id": "ach8",
        "title": "Event Organizer — DISHA 2025",
        "org": "Department Event · 2025",
        "desc": "Played a key role in organizing a department-level event, ensuring smooth execution and coordination."
      },
      {
        "id": "ach9",
        "title": "Volunteer Activities",
        "org": "Department Contribution",
        "desc": "Actively participated in departmental volunteering and supported various academic and event activities."
      },
      {
        "id": "ach10",
        "title": "Community Awareness Initiative",
        "org": "Social Development",
        "desc": "Conducted awareness programs in rural areas to promote social responsibility and community well-being."
      },
      {
        "id": "ach11",
        "title": "Culturals & Technical Competitions",
        "org": "Certificates & Prizes",
        "desc": "Actively participated and won prizes in events such as dance, face painting, bridal makeup, and technical rounds, earning multiple certificates and recognitions."
      }
    ],
    "certifications": [
      {
        "id": "c1",
        "title": "Cloud Technologies",
        "issuer": "Infosys Springboard · 2026",
        "image": "Images/Cloud_Tech.jpg"
      },
      {
        "id": "c2",
        "title": "ChatGPT for Data Science and Machine Learning",
        "issuer": "Udemy · 2026",
        "image": "Images/ChatGPT.jpg"
      },
      {
        "id": "c3",
        "title": "Adobe Experience Cloud – Suite",
        "issuer": "Infosys Springboard · 2026",
        "image": "Images/Adobe.jpg"
      },
      {
        "id": "c4",
        "title": "Pitch Fest 2026",
        "issuer": "Idea Presentation · 2026",
        "image": "Images/pitch.jpeg"
      },
      {
        "id": "c5",
        "title": "Next-Gen AI & Emerging Technologies",
        "issuer": "Research Paper Published · 2026",
        "image": "Images/paper.jpg"
      },
      {
        "id": "c6",
        "title": "Data Base Management System",
        "issuer": "NPTEL · 2025",
        "image": "Images/database.jpg"
      },
      {
        "id": "c7",
        "title": "TCS iON Career Edge - Young Professional",
        "issuer": "Tata Consultancy Services · 2024",
        "image": "Images/young.jpg"
      },
      {
        "id": "c8",
        "title": "Course on Group Discussion",
        "issuer": "Tata Consultancy Services · 2024",
        "image": "Images/group.jpg"
      },
      {
        "id": "c9",
        "title": "College Management Prize",
        "issuer": "St.Joseph's College · 2026",
        "image": "Images/management.jpeg"
      },
      {
        "id": "c10",
        "title": "Interdepartmental Contest",
        "issuer": "St.Joseph's College · 2026",
        "image": "Images/interdepartment.jpeg"
      }
    ]
  };

  let portfolioData = null;
  let isAdminLoggedIn = false;
  let currentEditContext = null;

  if (!localStorage.getItem(PIN_KEY)) {
    localStorage.setItem(PIN_KEY, "1234");
  }

  document.addEventListener("DOMContentLoaded", async () => {
    injectAdminUI();
    await loadData();
    renderAllSections();
  });

  async function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        portfolioData = JSON.parse(saved);
        portfolioData.cvUrl = portfolioData.cvUrl || DEFAULT_PORTFOLIO_DATA.cvUrl;
        portfolioData.skills = portfolioData.skills || DEFAULT_PORTFOLIO_DATA.skills;
        portfolioData.education = portfolioData.education || DEFAULT_PORTFOLIO_DATA.education;
        portfolioData.internships = portfolioData.internships || DEFAULT_PORTFOLIO_DATA.internships;
        portfolioData.projects = portfolioData.projects || DEFAULT_PORTFOLIO_DATA.projects;
        portfolioData.achievements = portfolioData.achievements || DEFAULT_PORTFOLIO_DATA.achievements;
        portfolioData.certifications = portfolioData.certifications || DEFAULT_PORTFOLIO_DATA.certifications;
        return;
      } catch (e) {
        console.error("Failed to parse local portfolio data:", e);
      }
    }

    try {
      const res = await fetch("data.json");
      if (res.ok) {
        portfolioData = await res.json();
        saveDataLocally();
        return;
      }
    } catch (err) {
      console.warn("Could not fetch data.json directly, using fallback data.");
    }

    portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    saveDataLocally();
  }

  async function saveDataLocally() {
    if (portfolioData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData, null, 2));
      autoPushToGitHub();
    }
  }

  async function autoPushToGitHub() {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    const repo = localStorage.getItem(GH_REPO_KEY) || "akillouisa26/My-portfolio";

    if (!token) return;

    try {
      const path = "data.json";
      const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;

      let sha = "";
      const getRes = await fetch(apiUrl, {
        headers: { Authorization: `token ${token}` },
      });
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      }

      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(portfolioData, null, 2))));
      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update portfolio content via Admin Panel (Auto-sync)",
          content: contentBase64,
          sha: sha || undefined,
        }),
      });

      if (putRes.ok) {
        showToast("Saved & Auto-pushed to GitHub!");
      }
    } catch (err) {
      console.error("Auto-push to GitHub error:", err);
    }
  }

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64 = result.substr(result.indexOf(",") + 1);
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  async function autoPushFileToGitHub(filePath, base64Content, commitMessage = "Upload file via Admin Panel") {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    const repo = localStorage.getItem(GH_REPO_KEY) || "akillouisa26/My-portfolio";

    if (!token) return { success: false, reason: "no_token" };

    try {
      const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

      let sha = "";
      const getRes = await fetch(apiUrl, {
        headers: { Authorization: `token ${token}` },
      });
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      }

      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: base64Content,
          sha: sha || undefined,
        }),
      });

      if (putRes.ok) {
        return { success: true };
      } else {
        const errJson = await putRes.json();
        console.error("Failed to push file to GitHub:", errJson);
        return { success: false, reason: errJson.message || "api_error" };
      }
    } catch (err) {
      console.error("Auto-push file error:", err);
      return { success: false, reason: err.message };
    }
  }

  function injectAdminUI() {
    if (document.getElementById("adminFloatBtn")) return;

    const floatBtn = document.createElement("button");
    floatBtn.className = "admin-float-btn";
    floatBtn.id = "adminFloatBtn";
    floatBtn.title = "Admin Panel / Edit Content";
    floatBtn.innerHTML = `<i class="ti ti-settings"></i>`;
    floatBtn.onclick = handleAdminFloatClick;
    document.body.appendChild(floatBtn);

    const toast = document.createElement("div");
    toast.className = "admin-toast";
    toast.id = "adminToast";
    toast.innerHTML = `<i class="ti ti-circle-check"></i> <span id="adminToastMsg">Saved successfully!</span>`;
    document.body.appendChild(toast);

    const modalWrap = document.createElement("div");
    modalWrap.id = "adminModalContainer";
    document.body.appendChild(modalWrap);
  }

  function updateToggleVisibility() {
    const floatBtn = document.getElementById("adminFloatBtn");
    if (floatBtn) {
      floatBtn.style.display = isAdminLoggedIn ? "none" : "flex";
    }
  }

  function showToast(msg, isError = false) {
    const toast = document.getElementById("adminToast");
    const toastMsg = document.getElementById("adminToastMsg");
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.style.borderColor = isError ? "#b91c1c" : "#8b5e3c";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function handleAdminFloatClick() {
    if (isAdminLoggedIn) {
      toggleAdminBar();
    } else {
      promptPinModal();
    }
  }

  window.togglePasswordVisibility = function (e, inputId) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const input = document.getElementById(inputId);
    const btn = e ? e.currentTarget : null;
    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
      if (btn) btn.innerHTML = EYE_CLOSED_SVG;
    } else {
      input.type = "password";
      if (btn) btn.innerHTML = EYE_OPEN_SVG;
    }
  };

  function promptPinModal() {
    const container = document.getElementById("adminModalContainer");
    container.innerHTML = `
      <div class="admin-modal-overlay active" id="pinModal">
        <div class="admin-modal-box">
          <div class="admin-modal-header">
            <h4 class="admin-modal-title"><i class="ti ti-lock"></i> Admin Login</h4>
            <button class="admin-modal-close" onclick="closeAdminModal()">✕</button>
          </div>
          <div class="admin-form-group" style="margin-top:10px;">
            <label class="admin-form-label">Enter your password</label>
            <div class="password-input-wrap">
              <input type="password" id="adminPinInput" class="admin-form-input" placeholder="Enter your password" maxlength="20" />
              <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility(event, 'adminPinInput')" title="Toggle Password Visibility">
                ${EYE_OPEN_SVG}
              </button>
            </div>
          </div>
          <div class="admin-form-footer">
            <button class="admin-btn" onclick="closeAdminModal()">Cancel</button>
            <button class="admin-btn admin-btn-primary" onclick="submitPin()">Unlock Admin Mode</button>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => document.getElementById("adminPinInput")?.focus(), 100);
  }

  window.closeAdminModal = function () {
    const overlay = document.querySelector(".admin-modal-overlay");
    if (overlay) overlay.classList.remove("active");
    setTimeout(() => {
      const container = document.getElementById("adminModalContainer");
      if (container) container.innerHTML = "";
    }, 250);
  };

  window.submitPin = function () {
    const input = document.getElementById("adminPinInput");
    const savedPin = localStorage.getItem(PIN_KEY) || "1234";
    if (input && input.value === savedPin) {
      isAdminLoggedIn = true;
      closeAdminModal();
      enableAdminMode();
      showToast("Admin Mode Unlocked!");
    } else {
      showToast("Incorrect Password. Please try again.", true);
    }
  };

  function enableAdminMode() {
    document.body.classList.add("admin-active", "admin-mode-on");
    updateToggleVisibility();
    createTopAdminBar();
    renderAllSections();
  }

  // Top Admin Bar (Separated GitHub & Change Password buttons)
  function createTopAdminBar() {
    let topBar = document.getElementById("adminTopBar");
    if (!topBar) {
      topBar = document.createElement("div");
      topBar.className = "admin-top-bar";
      topBar.id = "adminTopBar";
      document.body.appendChild(topBar);
    }

    topBar.innerHTML = `
      <div class="admin-status-badge">
        <i class="ti ti-shield-check"></i> Admin Edit Mode Active
      </div>
      <div class="admin-actions">
        <button class="admin-btn" onclick="openEditCVModal()"><i class="ti ti-file-text"></i> Edit CV</button>
        <button class="admin-btn" onclick="openGitHubModal()"><i class="ti ti-brand-github"></i> GitHub Auto-Push</button>
        <button class="admin-btn" onclick="openChangePasswordModal()"><i class="ti ti-key"></i> Change Password</button>
        <button class="admin-btn admin-btn-danger" onclick="logoutAdmin()"><i class="ti ti-logout"></i> Exit Admin</button>
      </div>
    `;
  }

  function toggleAdminBar() {
    const topBar = document.getElementById("adminTopBar");
    if (topBar) {
      topBar.style.display = topBar.style.display === "none" ? "flex" : "none";
    }
  }

  window.logoutAdmin = function () {
    isAdminLoggedIn = false;
    document.body.classList.remove("admin-active", "admin-mode-on");
    updateToggleVisibility();
    const topBar = document.getElementById("adminTopBar");
    if (topBar) topBar.remove();
    renderAllSections();
    showToast("Exited Admin Mode.");
  };

  // 1. DEDICATED CHANGE PASSWORD MODAL (Password ONLY)
  window.openChangePasswordModal = function () {
    const container = document.getElementById("adminModalContainer");
    container.innerHTML = `
      <div class="admin-modal-overlay active">
        <div class="admin-modal-box">
          <div class="admin-modal-header">
            <h4 class="admin-modal-title"><i class="ti ti-key"></i> Change Admin Password</h4>
            <button class="admin-modal-close" onclick="closeAdminModal()">✕</button>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Current Password</label>
            <div class="password-input-wrap">
              <input type="password" id="currPinInput" class="admin-form-input" placeholder="Enter current password" />
              <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility(event, 'currPinInput')">
                ${EYE_OPEN_SVG}
              </button>
            </div>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">New Password</label>
            <div class="password-input-wrap">
              <input type="password" id="newPinInput" class="admin-form-input" placeholder="Enter new password" />
              <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility(event, 'newPinInput')">
                ${EYE_OPEN_SVG}
              </button>
            </div>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Confirm New Password</label>
            <div class="password-input-wrap">
              <input type="password" id="confirmPinInput" class="admin-form-input" placeholder="Re-enter new password" />
              <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility(event, 'confirmPinInput')">
                ${EYE_OPEN_SVG}
              </button>
            </div>
          </div>

          <div class="admin-form-footer">
            <button class="admin-btn" onclick="closeAdminModal()">Cancel</button>
            <button class="admin-btn admin-btn-primary" onclick="saveNewPassword()">Update Password</button>
          </div>
        </div>
      </div>
    `;
  };

  window.saveNewPassword = function () {
    const currPin = document.getElementById("currPinInput")?.value;
    const newPin = document.getElementById("newPinInput")?.value;
    const confirmPin = document.getElementById("confirmPinInput")?.value;
    const savedPin = localStorage.getItem(PIN_KEY) || "1234";

    if (currPin !== savedPin) {
      showToast("Current password is incorrect!", true);
      return;
    }

    if (!newPin || newPin.trim().length === 0) {
      showToast("New password cannot be empty!", true);
      return;
    }

    if (newPin !== confirmPin) {
      showToast("New passwords do not match!", true);
      return;
    }

    localStorage.setItem(PIN_KEY, newPin);
    closeAdminModal();
    showToast("Password updated successfully!");
  };

  // 2. DEDICATED GITHUB AUTO-PUSH MODAL (GitHub Token & Repo ONLY)
  window.openGitHubModal = function () {
    const ghToken = localStorage.getItem(GH_TOKEN_KEY) || "";
    const ghRepo = localStorage.getItem(GH_REPO_KEY) || "akillouisa26/My-portfolio";

    const container = document.getElementById("adminModalContainer");
    container.innerHTML = `
      <div class="admin-modal-overlay active">
        <div class="admin-modal-box">
          <div class="admin-modal-header">
            <h4 class="admin-modal-title"><i class="ti ti-brand-github"></i> GitHub Auto-Push Settings</h4>
            <button class="admin-modal-close" onclick="closeAdminModal()">✕</button>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">GitHub Access Token (PAT)</label>
            <div class="password-input-wrap">
              <input type="password" id="ghTokenInput" class="admin-form-input" value="${ghToken}" placeholder="ghp_xxxxxxxxxxxx" />
              <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility(event, 'ghTokenInput')">
                ${EYE_OPEN_SVG}
              </button>
            </div>
            <small style="color:#7a6a5f; font-size:0.75rem; margin-top:4px; display:block;">Paste your GitHub Token starting with <code>ghp_</code>. All edits will automatically push to your live website!</small>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">GitHub Repository (username/repository)</label>
            <input type="text" id="ghRepoInput" class="admin-form-input" value="${escapeHTML(ghRepo)}" placeholder="akillouisa26/My-portfolio" />
          </div>

          <div class="admin-form-footer">
            <button class="admin-btn" onclick="closeAdminModal()">Cancel</button>
            <button class="admin-btn admin-btn-primary" onclick="saveGitHubSettings()">Save GitHub Settings</button>
          </div>
        </div>
      </div>
    `;
  };

  window.saveGitHubSettings = function () {
    const ghToken = document.getElementById("ghTokenInput")?.value;
    const ghRepo = document.getElementById("ghRepoInput")?.value;

    if (ghToken !== undefined) localStorage.setItem(GH_TOKEN_KEY, ghToken.trim());
    if (ghRepo !== undefined) localStorage.setItem(GH_REPO_KEY, ghRepo.trim());

    closeAdminModal();
    showToast("GitHub settings saved! Auto-push enabled.");
  };

  // Edit CV Link Modal (Method 1 Primary)
  window.openEditCVModal = function () {
    const currentCV = portfolioData?.cvUrl || "resume.pdf";
    const container = document.getElementById("adminModalContainer");
    container.innerHTML = `
      <div class="admin-modal-overlay active">
        <div class="admin-modal-box">
          <div class="admin-modal-header">
            <h4 class="admin-modal-title"><i class="ti ti-file-text"></i> Edit CV / Resume Link</h4>
            <button class="admin-modal-close" onclick="closeAdminModal()">✕</button>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Resume PDF Filename or Web Link</label>
            <input type="text" id="cvUrlInput" class="admin-form-input" value="${escapeHTML(currentCV)}" placeholder="e.g. resume2.pdf or https://..." required />
            <small style="color:#7a6a5f; font-size:0.75rem; margin-top:4px; display:block;">Type your resume PDF filename (e.g. <code>resume2.pdf</code>) or URL. Clicking Save will automatically push the update live to GitHub!</small>
          </div>

          <div class="admin-form-group" style="margin-top:14px;">
            <label class="admin-form-label">OR Upload New PDF File (Optional)</label>
            <input type="file" id="cvFileInput" class="admin-form-input" accept=".pdf" />
            <small style="color:#7a6a5f; font-size:0.75rem; margin-top:4px; display:block;">Optional: Choose a new PDF file from your device to auto-upload to GitHub.</small>
          </div>

          <div class="admin-form-footer">
            <button class="admin-btn" onclick="closeAdminModal()">Cancel</button>
            <button class="admin-btn admin-btn-primary" id="saveCvBtn" onclick="saveCVLink()">Save CV Link</button>
          </div>
        </div>
      </div>
    `;
  };

  window.saveCVLink = async function () {
    const fileInput = document.getElementById("cvFileInput");
    const urlInput = document.getElementById("cvUrlInput");
    const saveBtn = document.getElementById("saveCvBtn");

    const file = fileInput?.files?.[0];
    let cvPath = urlInput?.value?.trim();

    if (file) {
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = "Uploading PDF to GitHub...";
      }
      try {
        const base64 = await readFileAsBase64(file);
        const filename = file.name;
        cvPath = filename;

        const pushRes = await autoPushFileToGitHub(filename, base64, `Upload ${filename} resume via Admin Panel`);
        if (pushRes.success) {
          showToast(`Uploaded ${filename} & pushed to GitHub!`);
        } else if (pushRes.reason === "no_token") {
          showToast("PDF set locally. Set GitHub token in settings to auto-push!", true);
        } else {
          showToast("GitHub upload error: " + pushRes.reason, true);
        }
      } catch (err) {
        console.error("File upload error:", err);
        showToast("Failed to read PDF file.", true);
      }
    }

    if (!cvPath) {
      showToast("Please enter a CV filename or web link!", true);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "Save CV Link";
      }
      return;
    }

    portfolioData.cvUrl = cvPath;
    saveDataLocally();
    renderCV();
    closeAdminModal();
    showToast("CV link updated & auto-pushed to GitHub!");
  };

  // Render CV Link Across All Buttons on Page
  function renderCV() {
    const cvUrl = portfolioData?.cvUrl || "resume.pdf";
    const cvBtns = document.querySelectorAll("[data-cv-btn]");
    cvBtns.forEach((btn) => {
      btn.setAttribute("href", cvUrl);
    });
  }

  // ============================================================
  // RENDER SECTIONS
  // ============================================================
  function renderAllSections() {
    if (!portfolioData) return;
    renderCV();
    renderSkills();
    renderEducationAndInternships();
    renderProjects();
    renderAchievements();
    renderCertifications();
  }

  // 1. SKILLS
  function renderSkills() {
    const mernCol = document.querySelector(".col-mern-skills");
    const langCol = document.querySelector(".col-lang-skills");
    if (!mernCol || !langCol) return;

    injectHeaderAddBtn(".col-mern-label .skill-section-label", "mern_skill", "+ Add MERN Skill");
    injectHeaderAddBtn(".col-lang-label .skill-section-label", "lang_skill", "+ Add Language");

    const mernHTML = (portfolioData.skills?.mern || [])
      .map(
        (item, idx) => `
      <div class="skill-item skill-animate active" style="--delay:${(idx + 1) * 0.1}s">
        ${renderItemControls("mern_skill", item.id)}
        <div class="skill-top">
          <span class="skill-name">${escapeHTML(item.name)}</span>
          <span class="skill-badge ${item.badgeType}">${escapeHTML(item.badge)}</span>
        </div>
        <div class="skill-bar"><div class="skill-fill ${item.badgeType === "known" ? "known-fill" : item.badgeType === "slight" ? "slight-fill" : ""}" style="width:${item.width}; --w:${item.width}"></div></div>
      </div>
    `
      )
      .join("");
    mernCol.innerHTML = mernHTML;

    const langHTML = (portfolioData.skills?.languages || [])
      .map(
        (item, idx) => `
      <div class="skill-item skill-animate active" style="--delay:${(idx + 1) * 0.1}s">
        ${renderItemControls("lang_skill", item.id)}
        <div class="skill-top">
          <span class="skill-name">${escapeHTML(item.name)}</span>
          <span class="skill-badge ${item.badgeType}">${escapeHTML(item.badge)}</span>
        </div>
        <div class="skill-bar"><div class="skill-fill ${item.badgeType === "known" ? "known-fill" : item.badgeType === "slight" ? "slight-fill" : ""}" style="width:${item.width}; --w:${item.width}"></div></div>
      </div>
    `
      )
      .join("");
    langCol.innerHTML = langHTML;
  }

  // 2. EDUCATION & INTERNSHIPS
  function renderEducationAndInternships() {
    const eduCard = document.querySelector("#education .timeline");
    const intCard = document.querySelector("#internship .timeline");

    injectHeaderAddBtn("#education .about-sub-heading", "education", "+ Add Education");
    injectHeaderAddBtn("#internship .about-sub-heading", "internship", "+ Add Internship");

    if (eduCard) {
      eduCard.innerHTML = (portfolioData.education || [])
        .map(
          (item, idx) => `
        <li class="tl-item tl-animate active" style="--delay:${(idx + 1) * 0.1}s">
          ${renderItemControls("education", item.id)}
          <div class="tl-dot tl-dot--edu"></div>
          <div class="tl-body">
            <span class="tl-date">${escapeHTML(item.date)}</span>
            <h4 class="tl-role">${escapeHTML(item.role)}</h4>
            <p class="tl-place">${escapeHTML(item.place)}</p>
            <p class="tl-desc">${escapeHTML(item.desc)}</p>
          </div>
        </li>
      `
        )
        .join("");
    }

    if (intCard) {
      intCard.innerHTML = (portfolioData.internships || [])
        .map(
          (item, idx) => `
        <li class="tl-item tl-animate active" style="--delay:${(idx + 1) * 0.1}s">
          ${renderItemControls("internship", item.id)}
          <div class="tl-dot"></div>
          <div class="tl-body">
            <span class="tl-date">${escapeHTML(item.date)}</span>
            <h4 class="tl-role">${escapeHTML(item.role)}</h4>
            <p class="tl-place">${escapeHTML(item.place)}</p>
            <p class="tl-desc">${escapeHTML(item.desc)}</p>
          </div>
        </li>
      `
        )
        .join("");
    }
  }

  // 3. PROJECTS
  function renderProjects() {
    const projContainer = document.querySelector("#projects .row.g-4");
    if (!projContainer) return;

    injectHeaderAddBtn("#projects .section-title", "project", "+ Add Project");

    projContainer.innerHTML = (portfolioData.projects || [])
      .map(
        (item) => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="proj-card reveal active">
          ${renderItemControls("project", item.id)}
          <div class="proj-top">
            <div class="proj-links">
              ${
                item.github && item.github !== "#"
                  ? `<a href="${escapeHTML(item.github)}" target="_blank" class="proj-link" title="GitHub">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                    </a>`
                  : ""
              }
              ${
                item.live && item.live !== ""
                  ? `<a href="${escapeHTML(item.live)}" target="_blank" class="proj-link" title="Live Demo">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>`
                  : ""
              }
            </div>
          </div>
          <h4 class="proj-title">${escapeHTML(item.title)}</h4>
          <p class="proj-desc">${escapeHTML(item.desc)}</p>
          <div class="proj-tags">
            ${(item.tags || []).map((t) => `<span class="proj-tag">${escapeHTML(t)}</span>`).join("")}
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 4. ACHIEVEMENTS
  function renderAchievements() {
    const achList = document.getElementById("achList");
    if (!achList) return;

    injectHeaderAddBtn("#achievements .ach-card .about-sub-heading", "achievement", "+ Add Achievement");

    const items = portfolioData.achievements || [];
    achList.innerHTML = items
      .map(
        (item, index) => `
      <li class="ach-item-card ${index >= 3 ? "ach-extra" : ""}" style="${index >= 3 ? "display:none;" : ""}">
        ${renderItemControls("achievement", item.id)}
        <h5 class="ach-title">${escapeHTML(item.title)}</h5>
        <p class="ach-org">${escapeHTML(item.org)}</p>
        <p class="ach-desc">${escapeHTML(item.desc)}</p>
      </li>
    `
      )
      .join("");
  }

  // 5. CERTIFICATIONS
  function renderCertifications() {
    const certRow = document.querySelector("#achievements .col-md-7 .row.g-3");
    if (!certRow) return;

    injectHeaderAddBtn("#achievements .col-md-7 .about-sub-heading", "certification", "+ Add Certification");

    certRow.innerHTML = (portfolioData.certifications || [])
      .map(
        (item) => `
      <div class="col-12 col-sm-6">
        <div class="cert-card" onclick="openCert('${escapeHTML(item.title)}')">
          ${renderItemControls("certification", item.id)}
          <div class="cert-img-wrap">
            <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" class="cert-img" onerror="this.parentElement.classList.add('cert-no-img')" />
            <div class="cert-overlay"><span class="cert-view-btn">👁 View</span></div>
          </div>
          <div class="cert-info">
            <h6 class="cert-title">${escapeHTML(item.title)}</h6>
            <p class="cert-issuer">${escapeHTML(item.issuer)}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Helper Controls Renderer
  function renderItemControls(type, id) {
    if (!isAdminLoggedIn) return "";
    return `
      <div class="item-admin-controls" onclick="event.stopPropagation()">
        <button class="item-admin-btn edit-btn" onclick="openEditModal('${type}', '${id}')" title="Edit Item"><i class="ti ti-edit"></i></button>
        <button class="item-admin-btn delete-btn" onclick="deleteItem('${type}', '${id}')" title="Delete Item"><i class="ti ti-trash"></i></button>
      </div>
    `;
  }

  function injectHeaderAddBtn(selector, type, label) {
    const header = document.querySelector(selector);
    if (!header) return;
    let existing = header.querySelector(`.section-add-btn[data-type="${type}"]`);
    if (isAdminLoggedIn) {
      if (!existing) {
        const btn = document.createElement("button");
        btn.className = "section-add-btn";
        btn.setAttribute("data-type", type);
        btn.innerHTML = label;
        btn.onclick = (e) => {
          e.stopPropagation();
          openAddModal(type);
        };
        header.appendChild(btn);
      }
    } else if (existing) {
      existing.remove();
    }
  }

  // ============================================================
  // EDIT & ADD MODALS
  // ============================================================
  window.openAddModal = function (type) {
    openFormModal(type, null);
  };

  window.openEditModal = function (type, id) {
    let item = findItem(type, id);
    if (item) {
      openFormModal(type, item);
    }
  };

  function findItem(type, id) {
    if (type === "mern_skill") return portfolioData.skills.mern.find((x) => x.id === id);
    if (type === "lang_skill") return portfolioData.skills.languages.find((x) => x.id === id);
    if (type === "education") return portfolioData.education.find((x) => x.id === id);
    if (type === "internship") return portfolioData.internships.find((x) => x.id === id);
    if (type === "project") return portfolioData.projects.find((x) => x.id === id);
    if (type === "achievement") return portfolioData.achievements.find((x) => x.id === id);
    if (type === "certification") return portfolioData.certifications.find((x) => x.id === id);
    return null;
  }

  window.deleteItem = function (type, id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    if (type === "mern_skill") portfolioData.skills.mern = portfolioData.skills.mern.filter((x) => x.id !== id);
    if (type === "lang_skill") portfolioData.skills.languages = portfolioData.skills.languages.filter((x) => x.id !== id);
    if (type === "education") portfolioData.education = portfolioData.education.filter((x) => x.id !== id);
    if (type === "internship") portfolioData.internships = portfolioData.internships.filter((x) => x.id !== id);
    if (type === "project") portfolioData.projects = portfolioData.projects.filter((x) => x.id !== id);
    if (type === "achievement") portfolioData.achievements = portfolioData.achievements.filter((x) => x.id !== id);
    if (type === "certification") portfolioData.certifications = portfolioData.certifications.filter((x) => x.id !== id);

    saveDataLocally();
    renderAllSections();
    showToast("Item deleted!");
  };

  function openFormModal(type, item) {
    const isEdit = !!item;
    currentEditContext = { type, id: item ? item.id : "new_" + Date.now() };

    let fieldsHTML = "";

    if (type === "mern_skill" || type === "lang_skill") {
      fieldsHTML = `
        <div class="admin-form-group">
          <label class="admin-form-label">Skill Name</label>
          <input type="text" id="f_name" class="admin-form-input" value="${item ? escapeHTML(item.name) : ""}" required />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Level Badge</label>
          <select id="f_badgeType" class="admin-form-select">
            <option value="known" ${item && item.badgeType === "known" ? "selected" : ""}>Familiar</option>
            <option value="learning" ${item && item.badgeType === "learning" ? "selected" : ""}>Learning</option>
            <option value="slight" ${item && item.badgeType === "slight" ? "selected" : ""}>Slight</option>
          </select>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Proficiency Bar Width (e.g. 80%)</label>
          <input type="text" id="f_width" class="admin-form-input" value="${item ? escapeHTML(item.width) : "70%"}" />
        </div>
      `;
    } else if (type === "education" || type === "internship") {
      fieldsHTML = `
        <div class="admin-form-group">
          <label class="admin-form-label">Degree / Role Title</label>
          <input type="text" id="f_role" class="admin-form-input" value="${item ? escapeHTML(item.role) : ""}" required />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">College / Company Name</label>
          <input type="text" id="f_place" class="admin-form-input" value="${item ? escapeHTML(item.place) : ""}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Duration / Date Range</label>
          <input type="text" id="f_date" class="admin-form-input" value="${item ? escapeHTML(item.date) : "2026 — Present"}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Description / CGPA</label>
          <textarea id="f_desc" class="admin-form-textarea">${item ? escapeHTML(item.desc) : ""}</textarea>
        </div>
      `;
    } else if (type === "project") {
      fieldsHTML = `
        <div class="admin-form-group">
          <label class="admin-form-label">Project Title</label>
          <input type="text" id="f_title" class="admin-form-input" value="${item ? escapeHTML(item.title) : ""}" required />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Description</label>
          <textarea id="f_desc" class="admin-form-textarea">${item ? escapeHTML(item.desc) : ""}</textarea>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Technologies (comma-separated)</label>
          <input type="text" id="f_tags" class="admin-form-input" value="${item ? escapeHTML((item.tags || []).join(", ")) : "HTML, CSS, JavaScript"}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">GitHub Repository Link</label>
          <input type="text" id="f_github" class="admin-form-input" value="${item ? escapeHTML(item.github || "") : ""}" placeholder="https://github.com/..." />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Live Demo Link (Optional)</label>
          <input type="text" id="f_live" class="admin-form-input" value="${item ? escapeHTML(item.live || "") : ""}" placeholder="https://..." />
        </div>
      `;
    } else if (type === "achievement") {
      fieldsHTML = `
        <div class="admin-form-group">
          <label class="admin-form-label">Achievement Title</label>
          <input type="text" id="f_title" class="admin-form-input" value="${item ? escapeHTML(item.title) : ""}" required />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Organization / Category</label>
          <input type="text" id="f_org" class="admin-form-input" value="${item ? escapeHTML(item.org) : ""}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Description</label>
          <textarea id="f_desc" class="admin-form-textarea">${item ? escapeHTML(item.desc) : ""}</textarea>
        </div>
      `;
    } else if (type === "certification") {
      fieldsHTML = `
        <div class="admin-form-group">
          <label class="admin-form-label">Certificate Title</label>
          <input type="text" id="f_title" class="admin-form-input" value="${item ? escapeHTML(item.title) : ""}" required />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Issuer & Year</label>
          <input type="text" id="f_issuer" class="admin-form-input" value="${item ? escapeHTML(item.issuer) : ""}" placeholder="Infosys Springboard · 2026" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Upload Certificate Image File</label>
          <input type="file" id="f_image_file" class="admin-form-input" accept="image/*" />
          <small style="color:#7a6a5f; font-size:0.75rem; margin-top:4px; display:block;">Select an image file to auto-upload directly to GitHub Images folder.</small>
        </div>
        <div class="admin-form-group" style="margin-top:10px;">
          <label class="admin-form-label">OR Image Path / URL</label>
          <input type="text" id="f_image" class="admin-form-input" value="${item ? escapeHTML(item.image) : "Images/"}" />
        </div>
      `;
    }

    const container = document.getElementById("adminModalContainer");
    container.innerHTML = `
      <div class="admin-modal-overlay active">
        <div class="admin-modal-box">
          <div class="admin-modal-header">
            <h4 class="admin-modal-title">${isEdit ? "Edit Item" : "Add New Item"}</h4>
            <button class="admin-modal-close" onclick="closeAdminModal()">✕</button>
          </div>
          <form onsubmit="saveItemForm(event, '${type}', '${currentEditContext.id}', ${isEdit})">
            ${fieldsHTML}
            <div class="admin-form-footer">
              <button type="button" class="admin-btn" onclick="closeAdminModal()">Cancel</button>
              <button type="submit" class="admin-btn admin-btn-primary">Save Item</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  window.saveItemForm = async function (e, type, id, isEdit) {
    e.preventDefault();

    if (type === "mern_skill" || type === "lang_skill") {
      const badgeType = document.getElementById("f_badgeType").value;
      const badgeMap = { known: "Familiar", learning: "Learning", slight: "Slight" };
      const newItem = {
        id,
        name: document.getElementById("f_name").value,
        badgeType: badgeType,
        badge: badgeMap[badgeType] || "Familiar",
        width: document.getElementById("f_width").value || "70%",
      };
      const arr = type === "mern_skill" ? portfolioData.skills.mern : portfolioData.skills.languages;
      if (isEdit) {
        const idx = arr.findIndex((x) => x.id === id);
        if (idx !== -1) arr[idx] = newItem;
      } else {
        arr.unshift(newItem);
      }
    } else if (type === "education" || type === "internship") {
      const newItem = {
        id,
        role: document.getElementById("f_role").value,
        place: document.getElementById("f_place").value,
        date: document.getElementById("f_date").value,
        desc: document.getElementById("f_desc").value,
      };
      const arr = type === "education" ? portfolioData.education : portfolioData.internships;
      if (isEdit) {
        const idx = arr.findIndex((x) => x.id === id);
        if (idx !== -1) arr[idx] = newItem;
      } else {
        arr.unshift(newItem);
      }
    } else if (type === "project") {
      const rawTags = document.getElementById("f_tags").value;
      const newItem = {
        id,
        title: document.getElementById("f_title").value,
        desc: document.getElementById("f_desc").value,
        tags: rawTags.split(",").map((t) => t.trim()).filter(Boolean),
        github: document.getElementById("f_github").value,
        live: document.getElementById("f_live").value,
      };
      if (isEdit) {
        const idx = portfolioData.projects.findIndex((x) => x.id === id);
        if (idx !== -1) portfolioData.projects[idx] = newItem;
      } else {
        portfolioData.projects.unshift(newItem);
      }
    } else if (type === "achievement") {
      const newItem = {
        id,
        title: document.getElementById("f_title").value,
        org: document.getElementById("f_org").value,
        desc: document.getElementById("f_desc").value,
      };
      if (isEdit) {
        const idx = portfolioData.achievements.findIndex((x) => x.id === id);
        if (idx !== -1) portfolioData.achievements[idx] = newItem;
      } else {
        portfolioData.achievements.unshift(newItem);
      }
    } else if (type === "certification") {
      const imgFileInput = document.getElementById("f_image_file");
      const imgFile = imgFileInput?.files?.[0];
      let imgPath = document.getElementById("f_image").value;

      if (imgFile) {
        try {
          const base64 = await readFileAsBase64(imgFile);
          const targetPath = "Images/" + imgFile.name;
          imgPath = targetPath;
          const pushRes = await autoPushFileToGitHub(targetPath, base64, `Upload ${imgFile.name} image via Admin Panel`);
          if (pushRes.success) {
            showToast(`Uploaded ${imgFile.name} image to GitHub!`);
          }
        } catch (err) {
          console.error("Image upload error:", err);
        }
      }

      const newItem = {
        id,
        title: document.getElementById("f_title").value,
        issuer: document.getElementById("f_issuer").value,
        image: imgPath,
      };
      if (isEdit) {
        const idx = portfolioData.certifications.findIndex((x) => x.id === id);
        if (idx !== -1) portfolioData.certifications[idx] = newItem;
      } else {
        portfolioData.certifications.unshift(newItem);
      }
    }

    saveDataLocally();
    closeAdminModal();
    renderAllSections();
    showToast(isEdit ? "Item updated!" : "New item added at top!");
  };

  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
