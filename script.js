"use strict";

/* =========================================
   SMART QUEUE MANAGEMENT SYSTEM
   Frontend: HTML, CSS, JavaScript
   Backend: Python Flask
   Database: MySQL
   ========================================= */

// Location and service data
const LOCATION_DATA = {
  "Eluru": {

    "": [
      {
        id: "-bank",
        name: "Bank",
        address: "Main Road, ",
        services: ["Account Enquiry", "Cash Counter", "Document Submission", "Customer Support"]
      },
      {
        id: "-government",
        name: "Government Office",
        address: "Main Road, ",
        services: ["Application Submission", "Document Verification", "Public Enquiry", "Certificate Service"]
      },
      {
        id: "-college",
        name: "College Office",
        address: ", Eluru district",
        services: ["Bonafide Certificate", "Fee Enquiry", "Certificate Collection", "Student Support"]
      }
    ],

    "Polavaram": [
      {
        id: "polavaram-bank",
        name: "Bank",
        address: "Main Road, Polavaram",
        services: ["Account Enquiry", "Cash Counter", "Document Submission", "Customer Support"]
      },
      {
        id: "polavaram-government",
        name: "Government Office",
        address: "Main Road, Polavaram",
        services: ["Application Submission", "Document Verification", "Public Enquiry", "Certificate Service"]
      },
      {
        id: "polavaram-college",
        name: "College Office",
        address: "Polavaram, Eluru district",
        services: ["Bonafide Certificate", "Fee Enquiry", "Certificate Collection", "Student Support"]
      }
    ],
"Kovvur": [
  {
    id: "kovvur-sbi",
    name: "SBI Bank",
    address: "Main Road, Kovvur",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "New Account Opening"]
  },
  {
    id: "kovvur-hdfc",
    name: "HDFC Bank",
    address: "Main Road, Kovvur",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "Loan Enquiry"]
  },
  {
    id: "kovvur-icici",
    name: "ICICI Bank",
    address: "Station Road, Kovvur",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kovvur-canara",
    name: "Canara Bank",
    address: "Main Road, Kovvur",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kovvur-union",
    name: "Union Bank",
    address: "Main Road, Kovvur",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kovvur-axis",
    name: "Axis Bank",
    address: "Main Road, Kovvur",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  }
],
"Nidadavole": [
  {
    id: "nidadavole-sbi",
    name: "SBI Bank",
    address: "Main Road, Nidadavole",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "New Account Opening"]
  },
  {
    id: "nidadavole-hdfc",
    name: "HDFC Bank",
    address: "Main Road, Nidadavole",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "Loan Enquiry"]
  },
  {
    id: "nidadavole-icici",
    name: "ICICI Bank",
    address: "Station Road, Nidadavole",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "nidadavole-canara",
    name: "Canara Bank",
    address: "Main Road, Nidadavole",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "nidadavole-union",
    name: "Union Bank",
    address: "Main Road, Nidadavole",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "nidadavole-indian",
    name: "Indian Bank",
    address: "Main Road, Nidadavole",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  }
],
    "Jangareddigudem": [
      {
        id: "jangareddigudem-bank",
        name: "Bank",
        address: "Main Road, Jangareddigudem",
        services: ["Account Enquiry", "Cash Counter", "Document Submission", "Customer Support"]
      },
      {
        id: "jangareddigudem-government",
        name: "Government Office",
        address: "Town Centre, Jangareddigudem",
        services: ["Application Submission", "Document Verification", "Public Enquiry", "Certificate Service"]
      },
      {
        id: "jangareddigudem-college",
        name: "College Office",
        address: "College Road, Jangareddigudem",
        services: ["Bonafide Certificate", "Fee Enquiry", "Certificate Collection", "Student Support"]
      }
    ],
  },

    "Kakinada": {
      "kakinada":[
  {
    id: "kakinada-sbi",
    name: "SBI Bank",
    address: "Main Road, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "New Account Opening"]
  },
  {
    id: "kakinada-hdfc",
    name: "HDFC Bank",
    address: "Bhanugudi Junction, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "Loan Enquiry"]
  },
  {
    id: "kakinada-icici",
    name: "ICICI Bank",
    address: "Ramanayyapeta, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kakinada-axis",
    name: "Axis Bank",
    address: "Main Road, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kakinada-canara",
    name: "Canara Bank",
    address: "Gandhi Nagar, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kakinada-union",
    name: "Union Bank",
    address: "Sarpavaram Junction, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kakinada-pnb",
    name: "Punjab National Bank",
    address: "Main Road, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "New Account Opening"]
  },
  {
    id: "kakinada-bob",
    name: "Bank of Baroda",
    address: "Bhanugudi Junction, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kakinada-indian",
    name: "Indian Bank",
    address: "Ramanayyapeta, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kakinada-kotak",
    name: "Kotak Mahindra Bank",
    address: "Gandhi Nagar, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "Loan Enquiry"]
  },
  {
    id: "kakinada-yes",
    name: "Yes Bank",
    address: "Main Road, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "kakinada-idfc",
  name: "IDFC First Bank",
    address: "Sarpavaram Junction, Kakinada",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  }
],
 "Samalkot": [
  {
    id: "samalkot-sbi",
    name: "SBI Bank",
    address: "Main Road, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "New Account Opening"]
  },
  {
    id: "samalkot-hdfc",
    name: "HDFC Bank",
    address: "Main Road, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "Loan Enquiry"]
  },
  {
    id: "samalkot-icici",
    name: "ICICI Bank",
    address: "Station Road, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "samalkot-axis",
    name: "Axis Bank",
    address: "Main Road, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "samalkot-canara",
    name: "Canara Bank",
    address: "Gandhi Nagar, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {id: "samalkot-union",
    name: "Union Bank",
    address: "Main Road, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "samalkot-pnb",
    name: "Punjab National Bank",
    address: "Station Road, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "samalkot-indian",
    name: "Indian Bank",
    address: "Main Road, Samalkot",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  }
],
},

      "rajahmundry":{
        "rajamundry":[
   {
     id:"rajahmundry-pnb",
    name: "Punjab National Bank",
    address: "Main Road, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "New Account Opening"]
  },
  {
    id: "rajahmundry-bob",
    name: "Bank of Baroda",
    address: "Danavaipeta, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajahmundry-indian",
    name: "Indian Bank",
    address: "Jampeta, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajahmundry-iob",
    name: "Indian Overseas Bank",
    address: "Gandhi Puram, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajahmundry-kotak",
    name: "Kotak Mahindra Bank",
    address: "Kambala Cheruvu, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "Loan Enquiry"]
  },
  {
    id: "rajahmundry-yes",
    name: "Yes Bank",
    address: "Danavaipeta, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajahmundry-idfc",
    name: "IDFC First Bank",
    address: "Main Road, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajahmundry-federal",
    name: "Federal Bank",
    address: "Kotipalli Bus Stand Road, Rajahmundry",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  }
],
"rajanagaram":[
  {

   id: "rajanagaram-axis",
    name: "Axis Bank",
    address: "Main Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajanagaram-canara",
    name: "Canara Bank",
    address: "Main Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajanagaram-sbi",
    name: "SBI Bank",
    address: "Main Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "New Account Opening"]
  },
  {
    id: "rajanagaram-hdfc",
    name: "HDFC Bank",
    address: "Main Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission", "Loan Enquiry"]
  },
  {
    id: "rajanagaram-icici",
    name: "ICICI Bank",
    address: "Kakinada Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id:"rajanagaram-union",
    name: "Union Bank",
    address: "Kakinada Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajanagaram-pnb",
    name: "Punjab National Bank",
    address: "Main Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  },
  {
    id: "rajanagaram-indian",
    name: "Indian Bank",
    address: "Main Road, Rajanagaram",
    services: ["Account Enquiry", "Cash Counter", "Document Submission"]
  }
],
      }
 };

// Convert location data into one list
const LOCATIONS = Object.entries(LOCATION_DATA).flatMap(
  ([district, villages]) =>
    Object.entries(villages).flatMap(([village, locations]) =>
      locations.map(location => ({
        ...location,
        district,
        village,
        fullName: `${location.name} — ${village}, ${district}`
      }))
    )
);

const $ = id => document.getElementById(id);

let currentUser = null;
let currentView = "dashboard";
let tokenCache = [];

// =========================================
// FLASK API CONNECTION
// =========================================

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.error || "Request failed. Please try again."
    );
  }

  return data;
}

// Tokens are fetched from Flask/MySQL.
// No localStorage is used.
function tokens() {
  return tokenCache;
}

async function refreshTokens() {
  const data = await apiRequest("/api/tokens");
  tokenCache = Array.isArray(data.tokens)
    ? data.tokens
    : [];
}

function locById(id) {
  return LOCATIONS.find(location => location.id === id)
    || LOCATIONS[0];
}

function queueTokens(locationId, service) {
  return tokens().filter(token =>
    token.locationId === locationId &&
    token.service === service
  );
}

function active(token) {
  return token.status === "Waiting" ||
         token.status === "Serving";
}

function sortedQueue(list) {
  return list.slice().sort((a, b) =>
    String(a.createdAt).localeCompare(String(b.createdAt))
  );
}

// =========================================
// HELPER FUNCTIONS
// =========================================

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function statusBadge(status) {
  return `
    <span class="badge-status status-${escapeHTML(status)}">
      ${escapeHTML(status)}
    </span>
  `;
}

function fmtDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString();
}

function showAlert(id, message, type = "danger") {
  const element = $(id);
  if (!element) return;

  element.innerHTML = `
    <div class="alert alert-${type} py-2 small">
      ${escapeHTML(message)}
    </div>
  `;
}

function clearAlert(id) {
  const element = $(id);
  if (element) element.innerHTML = "";
}

function toast(message, type = "success") {
  const area = $("toastArea");

  if (!area) {
    alert(message);
    return;
  }

  const element = document.createElement("div");
  element.className = `alert alert-${type} shadow-sm`;
  element.textContent = message;

  area.appendChild(element);

  setTimeout(() => element.remove(), 3200);
}

// =========================================
// LOGIN AND REGISTRATION
// =========================================

function switchAuth(mode) {
  const login = mode === "login";

  $("loginFormWrap").classList.toggle("hidden", !login);
  $("registerFormWrap").classList.toggle("hidden", login);

  clearAlert("loginAlert");
  clearAlert("registerAlert");
}

$("showRegister").addEventListener("click", event => {
  event.preventDefault();
  switchAuth("register");
});

$("showLogin").addEventListener("click", event => {
  event.preventDefault();
  switchAuth("login");
});

// Register a new user in MySQL
$("registerForm").addEventListener("submit", async event => {
  event.preventDefault();
  clearAlert("registerAlert");

  const name = $("registerName").value.trim();
  const email = $("registerEmail").value.trim().toLowerCase();
  const password = $("registerPassword").value;
  const confirm = $("confirmPassword").value;

  if (!name || !email || !password || !confirm) {
    showAlert("registerAlert", "Please fill in every field.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert("registerAlert", "Enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    showAlert(
      "registerAlert",
      "Password must contain at least 6 characters."
    );
    return;
  }

  if (password !== confirm) {
    showAlert("registerAlert", "Passwords do not match.");
    return;
  }

  try {
    await apiRequest("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });

    $("registerForm").reset();
    switchAuth("login");
    $("loginEmail").value = email;

    showAlert(
      "loginAlert",
      "Account created. You can now sign in.",
      "success"
    );
  } catch (error) {
    showAlert("registerAlert", error.message);
  }
});

// Login through Flask
$("loginForm").addEventListener("submit", async event => {
  event.preventDefault();
  clearAlert("loginAlert");

  const email = $("loginEmail").value.trim().toLowerCase();
  const password = $("loginPassword").value;

  try {
    const data = await apiRequest("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    currentUser = data.user;
    await enterApp();
  } catch (error) {
    showAlert("loginAlert", error.message);
  }
});

// =========================================
// OPEN APPLICATION
// =========================================

async function enterApp() {
  $("authPage").classList.add("hidden");
  $("appPage").classList.remove("hidden");

  $("topUserName").textContent = currentUser.name;
  $("topUserRole").textContent =
    currentUser.role === "admin"
      ? "Administrator"
      : "Customer";

  document.querySelectorAll(".user-only").forEach(element => {
    element.classList.toggle(
      "hidden",
      currentUser.role === "admin"
    );
  });

  document.querySelectorAll(".admin-only").forEach(element => {
    element.classList.toggle(
      "hidden",
      currentUser.role !== "admin"
    );
  });

  $("welcomeTitle").textContent =
    "Welcome, " + currentUser.name.split(" ")[0] + "!";

  $("welcomeSubtitle").textContent =
    currentUser.role === "admin"
      ? "Manage service queues and keep customers moving."
      : "Get a token and follow your place in the queue.";

  $("recentHeading").textContent =
    currentUser.role === "admin"
      ? "Queue snapshot"
      : "My active tokens";

  populateAllSelects();

  try {
    await refreshTokens();
    goView("dashboard");
    renderAll();
  } catch (error) {
    toast(error.message, "danger");
  }
}

// Logout from Flask
async function logout() {
  try {
    await apiRequest("/api/logout", {
      method: "POST",
      body: JSON.stringify({})
    });
  } catch {
    // Continue to login even if the session has expired.
  }

  currentUser = null;
  tokenCache = [];

  $("appPage").classList.add("hidden");
  $("authPage").classList.remove("hidden");
  $("loginForm").reset();

  switchAuth("login");
}

$("logoutBtn").addEventListener("click", logout);

// =========================================
// LOCATION DROPDOWNS
// =========================================

function fillLocations(selectId) {
  const select = $(selectId);
  if (!select) return;

  const oldValue = select.value;

  select.innerHTML = LOCATIONS.map(location => `
    <option value="${escapeHTML(location.id)}">
      ${escapeHTML(location.fullName)}
    </option>
  `).join("");

  if (LOCATIONS.some(location => location.id === oldValue)) {
    select.value = oldValue;
  }
}

function fillServices(locationSelectId, serviceSelectId) {
  const locationSelect = $(locationSelectId);
  const serviceSelect = $(serviceSelectId);

  if (!locationSelect || !serviceSelect) return;

  const location = locById(locationSelect.value);
  const oldValue = serviceSelect.value;
  const services = location ? location.services : [];

  serviceSelect.innerHTML = services.map(service => `
    <option value="${escapeHTML(service)}">
      ${escapeHTML(service)}
    </option>
  `).join("");

  if (services.includes(oldValue)) {
    serviceSelect.value = oldValue;
  }
}

function fillDistricts() {
  const select = $("districtSelect");

  select.innerHTML =
    '<option value="">Select district</option>' +
    Object.keys(LOCATION_DATA).map(district => `
      <option value="${escapeHTML(district)}">
        ${escapeHTML(district)}
      </option>
    `).join("");
}

function fillVillages() {
  const district = $("districtSelect").value;
  const select = $("villageSelect");

  const villages = district
    ? Object.keys(LOCATION_DATA[district])
    : [];

  select.innerHTML =
    '<option value="">Select village/town</option>' +
    villages.map(village => `
      <option value="${escapeHTML(village)}">
        ${escapeHTML(village)}
      </option>
    `).join("");

  select.disabled = !district;
  $("locationSelect").innerHTML =
    '<option value="">Select village/town first</option>';
  $("locationSelect").disabled = true;
  $("serviceSelect").innerHTML = "";
}

function fillServiceLocations() {
  const district = $("districtSelect").value;
  const village = $("villageSelect").value;
  const select = $("locationSelect");

  const list = district && village
    ? LOCATION_DATA[district][village] || []
    : [];

  select.innerHTML =
    '<option value="">Select service location</option>' +
    list.map(location => `
      <option value="${escapeHTML(location.id)}">
        ${escapeHTML(location.name)} — ${escapeHTML(location.address)}
      </option>
    `).join("");

  select.disabled = !village;

  fillServices("locationSelect", "serviceSelect");
}

function populateAllSelects() {
  fillDistricts();
  fillVillages();

  fillLocations("adminLocation");
  fillLocations("displayLocation");

  fillServices("adminLocation", "adminService");
  fillServices("displayLocation", "displayService");
}

$("districtSelect").addEventListener("change", fillVillages);

$("villageSelect").addEventListener(
  "change",
  fillServiceLocations
);

$("locationSelect").addEventListener("change", () => {
  fillServices("locationSelect", "serviceSelect");
});

$("adminLocation").addEventListener("change", () => {
  fillServices("adminLocation", "adminService");
  renderAdminQueue();
});

$("adminService").addEventListener("change", renderAdminQueue);

$("displayLocation").addEventListener("change", () => {
  fillServices("displayLocation", "displayService");
  renderDisplay();
});

$("displayService").addEventListener("change", renderDisplay);

// =========================================
// GENERATE TOKEN
// =========================================

$("tokenForm").addEventListener("submit", async event => {
  event.preventDefault();

  if (!currentUser || currentUser.role !== "user") return;

  const locationId = $("locationSelect").value;
  const service = $("serviceSelect").value;
  const location = locById(locationId);

  if (!locationId || !service || !location) {
    $("tokenFormMessage").innerHTML = `
      <div class="alert alert-warning small">
        Please select a district, village/town, location and service.
      </div>
    `;
    return;
  }

  try {
    const data = await apiRequest("/api/tokens", {
      method: "POST",
      body: JSON.stringify({
        locationId,
        locationName: location.name,
        district: location.district,
        village: location.village,
        address: location.address,
        service
      })
    });

    await refreshTokens();

    $("tokenFormMessage").innerHTML = `
      <div class="alert alert-success small">
        Token <strong>${escapeHTML(data.token.tokenNo)}</strong>
        generated successfully!
      </div>
    `;

    toast("Your token " + data.token.tokenNo + " is ready.");

    renderAll();
    goView("mytoken");
  } catch (error) {
    $("tokenFormMessage").innerHTML = `
      <div class="alert alert-warning small">
        ${escapeHTML(error.message)}
      </div>
    `;
  }
});

// =========================================
// QUEUE POSITION
// =========================================

function tokenPosition(token) {
  const queue = sortedQueue(
    queueTokens(token.locationId, token.service).filter(item =>
      item.status === "Waiting" ||
      item.status === "Serving"
    )
  );

  const serving = queue.find(item => item.status === "Serving");

  if (token.status === "Serving") {
    return { ahead: 0, current: token.tokenNo };
  }

  if (token.status !== "Waiting") {
    return {
      ahead: 0,
      current: serving?.tokenNo || "—"
    };
  }

  const index = queue.findIndex(item => item.id === token.id);

  const ahead = queue.slice(0, index).filter(item =>
    item.status === "Waiting" ||
    item.status === "Serving"
  ).length;

  return {
    ahead,
    current: serving?.tokenNo || "—"
  };
}

// =========================================
// TOKEN TABLE
// =========================================

function tokenRow(token, includeUser = false, adminActions = false) {
  let actions = "";

  if (adminActions && token.status === "Waiting") {
    actions = `
      <button class="btn btn-sm btn-outline-primary me-1"
              data-action="call" data-id="${escapeHTML(token.id)}">
        Call
      </button>
      <button class="btn btn-sm btn-outline-danger"
              data-action="skip" data-id="${escapeHTML(token.id)}">
        Skip
      </button>
    `;
  }

  if (adminActions && token.status === "Serving") {
    actions = `
      <button class="btn btn-sm btn-outline-success me-1"
              data-action="complete" data-id="${escapeHTML(token.id)}">
        Complete
      </button>
      <button class="btn btn-sm btn-outline-danger"
              data-action="skip" data-id="${escapeHTML(token.id)}">
        Skip
      </button>
    `;
  }

  if (
    !adminActions &&
    currentUser?.role === "user" &&
    token.userId === currentUser.id &&
    token.status === "Waiting"
  ) {
    actions = `
      <button class="btn btn-sm btn-outline-danger"
              data-action="cancel" data-id="${escapeHTML(token.id)}">
        Cancel
      </button>
    `;
  }

  return `
    <tr>
      <td class="fw-bold">${escapeHTML(token.tokenNo)}</td>
      ${includeUser ? `<td>${escapeHTML(token.userName)}</td>` : ""}
      <td>${escapeHTML(token.locationName)}</td>
      <td>${escapeHTML(token.service)}</td>
      <td>${statusBadge(token.status)}</td>
      <td class="text-nowrap">${fmtDate(token.createdAt)}</td>
      ${actions ? `<td class="text-nowrap">${actions}</td>` : ""}
    </tr>
  `;
}

function tableHTML(list, options = {}) {
  if (!list.length) {
    return `
      <div class="empty-state">
        <i class="fa-regular fa-folder-open d-block"></i>
        <div class="fw-bold text-dark">No tokens yet</div>
        <div class="small mt-1">
          ${escapeHTML(options.empty || "Tokens will appear here.")}
        </div>
      </div>
    `;
  }

  const includeUser = !!options.includeUser;
  const actions = !!options.actions;

  return `
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Token</th>
            ${includeUser ? "<th>Customer</th>" : ""}
            <th>Location</th>
            <th>Service</th>
            <th>Status</th>
            <th>Created</th>
            ${actions ? "<th>Actions</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${list.map(token =>
            tokenRow(token, includeUser, actions)
          ).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// =========================================
// DASHBOARD
// =========================================

function renderDashboard() {
  const all = tokens();

  const mine = all.filter(token =>
    token.userId === currentUser.id
  );

  const activeMine = mine.filter(active);

  const waitingCount = all.filter(token =>
    token.status === "Waiting"
  ).length;

  const serving = all.find(token =>
    token.status === "Serving"
  );

  $("statMyTokens").textContent =
    currentUser.role === "admin"
      ? all.filter(active).length
      : activeMine.length;

  $("statWaiting").textContent = waitingCount;
  $("statServing").textContent = serving?.tokenNo || "—";

  $("statCompleted").textContent = all.filter(token =>
    token.status === "Completed" &&
    token.completedAt &&
    token.completedAt.slice(0, 10) ===
      new Date().toLocaleDateString("en-CA")
  ).length;

  const list = currentUser.role === "admin"
    ? sortedQueue(all.filter(active)).slice(0, 8)
    : sortedQueue(activeMine);

  $("recentTokens").innerHTML = tableHTML(list, {
    includeUser: currentUser.role === "admin",
    actions: currentUser.role === "user",
    empty: currentUser.role === "admin"
      ? "New tokens will appear here."
      : "Generate a token to see your queue here."
  });
}

// =========================================
// MY TOKENS
// =========================================

function renderMyToken() {
  const mine = sortedQueue(
    tokens().filter(token =>
      token.userId === currentUser.id &&
      active(token)
    )
  ).reverse();

  if (!mine.length) {
    $("myTokenContent").innerHTML = `
      <div class="card-soft empty-state">
        <i class="fa-solid fa-ticket d-block"></i>
        <h3 class="h5 text-dark">No active token</h3>
        <p>Go to your dashboard to generate a token.</p>
        <button class="btn btn-primary" data-goto="dashboard">
          Get a token
        </button>
      </div>
    `;
    return;
  }

  $("myTokenContent").innerHTML = `
    <div class="row g-4">
      ${mine.map(token => {
        const position = tokenPosition(token);

        return `
          <div class="col-lg-6">
            <div class="token-box">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <div class="small text-white-50">YOUR TOKEN</div>
                  <div class="token-number">
                    ${escapeHTML(token.tokenNo)}
                  </div>
                </div>
                ${statusBadge(token.status)}
              </div>

              <div class="mt-3 fw-bold">
                ${escapeHTML(token.locationName)}
              </div>

              <div class="text-white-50 small">
                ${escapeHTML(token.village)}, ${escapeHTML(token.district)}
              </div>

              <div class="text-white-50 small">
                ${escapeHTML(token.address)}
              </div>

              <div class="text-white-50 small">
                ${escapeHTML(token.service)}
              </div>

              <div class="row g-2 mt-3">
                <div class="col-6">
                  <div class="token-mini">
                    <div class="small text-white-50">People ahead</div>
                    <div class="h3 mb-0">
                      ${token.status === "Serving" ? 0 : position.ahead}
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div class="token-mini">
                    <div class="small text-white-50">Now serving</div>
                    <div class="h3 mb-0">
                      ${escapeHTML(position.current)}
                    </div>
                  </div>
                </div>
              </div>

              <div class="small text-white-50 mt-3">
                Created ${fmtDate(token.createdAt)}
              </div>

              ${token.status === "Waiting" ? `
                <button class="btn btn-light mt-3"
                        data-action="cancel"
                        data-id="${escapeHTML(token.id)}">
                  Cancel token
                </button>
              ` : ""}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// =========================================
// ADMIN QUEUE
// =========================================

function renderAdminQueue() {
  if (!currentUser || currentUser.role !== "admin") return;

  const locationId = $("adminLocation").value;
  const service = $("adminService").value;

  const list = sortedQueue(queueTokens(locationId, service));

  const waiting = list.filter(token =>
    token.status === "Waiting"
  );

  const serving = list.find(token =>
    token.status === "Serving"
  );

  const completed = list.filter(token =>
    token.status === "Completed"
  );

  $("adminWaitingCount").textContent = waiting.length;
  $("adminServingToken").textContent = serving?.tokenNo || "—";
  $("adminCompletedCount").textContent = completed.length;

  $("adminQueueTable").innerHTML = tableHTML(list, {
    includeUser: true,
    actions: true,
    empty: "No tokens have been generated for this queue."
  });

  $("callNextBtn").disabled =
    !!serving || waiting.length === 0;

  $("completeServingBtn").disabled = !serving;
}

// =========================================
// PUBLIC QUEUE DISPLAY
// =========================================

function renderDisplay() {
  const locationId = $("displayLocation").value;
  const service = $("displayService").value;

  const list = sortedQueue(queueTokens(locationId, service));

  const serving = list.find(token =>
    token.status === "Serving"
  );

  const waiting = list.filter(token =>
    token.status === "Waiting"
  );

  const location = locById(locationId);

  $("displayLocationTitle").textContent =
    location.fullName.toUpperCase() +
    " · " + service.toUpperCase();

  $("displayCurrent").textContent = serving?.tokenNo || "—";
  $("displayNext").textContent = waiting[0]?.tokenNo || "—";
  $("displayWaiting").textContent = waiting.length;
}

// =========================================
// TOKEN HISTORY
// =========================================

function renderHistory() {
  const list = tokens()
    .filter(token =>
      currentUser.role === "admin" ||
      token.userId === currentUser.id
    )
    .sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt))
    );

  $("historyTable").innerHTML = tableHTML(list, {
    includeUser: currentUser.role === "admin",
    actions: false,
    empty: "Your token history will appear here."
  });
}

// =========================================
// RENDER ALL SECTIONS
// =========================================

function renderAll() {
  if (!currentUser) return;

  renderDashboard();
  renderMyToken();
  renderAdminQueue();
  renderDisplay();
  renderHistory();
}

// =========================================
// PAGE NAVIGATION
// =========================================

function goView(view) {
  if (view === "manage" && currentUser?.role !== "admin") {
    view = "dashboard";
  }

  if (view === "mytoken" && currentUser?.role !== "user") {
    view = "dashboard";
  }

  currentView = view;

  document.querySelectorAll(".view").forEach(element => {
    element.classList.toggle(
      "hidden",
      element.id !== "view-" + view
    );
  });

  document.querySelectorAll(".nav-link-custom").forEach(element => {
    element.classList.toggle(
      "active",
      element.dataset.view === view
    );
  });

  if (view === "manage") renderAdminQueue();
  if (view === "display") renderDisplay();
  if (view === "history") renderHistory();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-link-custom").forEach(button => {
  button.addEventListener("click", () => {
    goView(button.dataset.view);
  });
});

// =========================================
// TOKEN ACTIONS
// =========================================

document.addEventListener("click", event => {
  const goto = event.target.closest("[data-goto]");

  if (goto) {
    goView(goto.dataset.goto);
    return;
  }

  const button = event.target.closest("[data-action]");
  if (!button) return;

  performAction(
    button.dataset.action,
    button.dataset.id
  );
});

async function performAction(action, id) {
  const token = tokens().find(item => item.id === id);
  if (!token) return;

  let newStatus;

  if (action === "cancel") {
    if (
      currentUser?.role !== "user" ||
      token.userId !== currentUser.id ||
      token.status !== "Waiting"
    ) {
      toast("This token cannot be cancelled.", "warning");
      return;
    }

    if (!confirm("Cancel token " + token.tokenNo + "?")) {
      return;
    }

    newStatus = "Cancelled";
  } else {
    if (currentUser?.role !== "admin") {
      toast("Only the admin can manage queue tokens.", "danger");
      return;
    }

    if (action === "call") {
      newStatus = "Serving";
    } else if (action === "complete") {
      newStatus = "Completed";
    } else if (action === "skip") {
      if (!confirm("Skip token " + token.tokenNo + "?")) {
        return;
      }
      newStatus = "Skipped";
    } else {
      return;
    }
  }

  try {
    await apiRequest(
      `/api/tokens/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus })
      }
    );

    await refreshTokens();

    if (newStatus === "Serving") {
      toast("Now serving " + token.tokenNo);
    } else if (newStatus === "Completed") {
      toast("Token " + token.tokenNo + " completed.");
    } else if (newStatus === "Cancelled") {
      toast("Token cancelled.");
    } else {
      toast("Token " + token.tokenNo + " skipped.", "warning");
    }

    renderAll();
  } catch (error) {
    toast(error.message, "warning");
  }
}

// =========================================
// ADMIN: CALL NEXT TOKEN
// =========================================

$("callNextBtn").addEventListener("click", async () => {
  const locationId = $("adminLocation").value;
  const service = $("adminService").value;

  const list = tokens();

  const alreadyServing = list.some(token =>
    token.locationId === locationId &&
    token.service === service &&
    token.status === "Serving"
  );

  if (alreadyServing) {
    toast("Complete the currently serving token first.", "warning");
    return;
  }

  const next = sortedQueue(
    list.filter(token =>
      token.locationId === locationId &&
      token.service === service &&
      token.status === "Waiting"
    )
  )[0];

  if (!next) {
    toast("No waiting tokens in this queue.", "warning");
    return;
  }

  await performAction("call", next.id);
});

// =========================================
// ADMIN: COMPLETE SERVING TOKEN
// =========================================

$("completeServingBtn").addEventListener("click", async () => {
  const token = tokens().find(item =>
    item.locationId === $("adminLocation").value &&
    item.service === $("adminService").value &&
    item.status === "Serving"
  );

  if (token) {
    await performAction("complete", token.id);
  }
});

// =========================================
// REFRESH QUEUE AND DASHBOARD
// =========================================

$("adminRefresh").addEventListener("click", async () => {
  try {
    await refreshTokens();
    renderAdminQueue();
    toast("Queue refreshed.");
  } catch (error) {
    toast(error.message, "danger");
  }
});

$("refreshBtn").addEventListener("click", async () => {
  try {
    await refreshTokens();
    renderAll();
    toast("Dashboard refreshed.");
  } catch (error) {
    toast(error.message, "danger");
  }
});

// =========================================
// RESTORE LOGIN SESSION
// =========================================

async function restoreSession() {
  try {
    const data = await apiRequest("/api/me");

    currentUser = data.user;

    await enterApp();
  } catch {
    currentUser = null;
    tokenCache = [];

    $("appPage").classList.add("hidden");
    $("authPage").classList.remove("hidden");
  }
}

// Start the application
restoreSession();