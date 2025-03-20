// Global variables
let currentUser = null
let currentLocation = null
const selectedSpot = null
let bookingDetails = null

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Check which page we're on
  const currentPath = window.location.pathname

  if (currentPath.includes("index.html") || currentPath === "/") {
    initLoginPage()
  } else if (currentPath.includes("dashboard.html")) {
    initDashboardPage()
  } else if (currentPath.includes("confirmation.html")) {
    initConfirmationPage()
  }
})

// Login Page Initialization
function initLoginPage() {
  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation
      if (!email || !password) {
        alert("Please enter both email and password")
        return
      }

      // Mock login - in a real app, this would call an API
      mockLogin(email, password)
    })
  }
}

// Mock login function
function mockLogin(email, password) {
  // In a real app, this would validate credentials with a server
  currentUser = {
    id: "user123",
    name: "John Doe",
    email: email,
    avatar: "/placeholder.svg?height=32&width=32",
  }

  // Store user in session storage
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser))

  // Redirect to dashboard
  window.location.href = "dashboard.html"
}

// Dashboard Page Initialization
function initDashboardPage() {
  // Load user from session storage
  loadUser()

  // Initialize map
  initMap()

  // Set up event listeners
  const findSpotsBtn = document.getElementById("findSpots")
  if (findSpotsBtn) {
    findSpotsBtn.addEventListener("click", findAvailableSpots)
  }

  // Set up booking buttons
  const bookButtons = document.querySelectorAll(".book-btn")
  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const spotId = this.getAttribute("data-spot")
      bookSpot(spotId)
    })
  })
}

// Initialize map on dashboard
function initMap() {
  // In a real app, this would initialize a map library like Google Maps or Leaflet
  console.log("Map initialized")

  // For demo purposes, we'll just show a placeholder
  const mapElement = document.getElementById("parkingMap")
  if (mapElement) {
    // Map initialization code would go here
  }
}

// Find available spots based on form input
function findAvailableSpots() {
  const location = document.getElementById("location").value
  const date = document.getElementById("date").value
  const startTime = document.getElementById("startTime").value
  const endTime = document.getElementById("endTime").value
  const vehicleType = document.getElementById("vehicleType").value

  if (!location || !date || !startTime || !endTime) {
    alert("Please fill in all required fields")
    return
  }

  // In a real app, this would call an API to get available spots
  // For demo purposes, we'll just show the pre-populated spots

  // Store the booking details in session storage for the confirmation page
  bookingDetails = {
    location: location,
    locationName: getLocationName(location),
    date: date,
    startTime: startTime,
    endTime: endTime,
    vehicleType: vehicleType,
    licensePlate: document.getElementById("licensePlate").value,
  }

  sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))

  // Show the available spots section
  const spotsSection = document.getElementById("availableSpots")
  if (spotsSection) {
    spotsSection.style.display = "block"

    // Scroll to the spots section
    spotsSection.scrollIntoView({ behavior: "smooth" })
  }
}

// Book a parking spot
function bookSpot(spotId) {
  // Get booking details from session storage
  const details = JSON.parse(sessionStorage.getItem("bookingDetails")) || {}

  // Add spot information
  details.spotId = spotId
  details.bookingId = "SP" + Math.floor(10000000 + Math.random() * 90000000)
  details.amount = calculateAmount(details.startTime, details.endTime)

  // Store updated booking details
  sessionStorage.setItem("bookingDetails", JSON.stringify(details))

  // Redirect to confirmation page
  window.location.href = "confirmation.html"
}

// Confirmation Page Initialization
function initConfirmationPage() {
  // Load user from session storage
  loadUser()

  // Load booking details
  loadBookingDetails()

  // Get user's current location
  getUserLocation()

  // Set up event listeners for confirmation page buttons
  setupConfirmationButtons()
}

// Load booking details on confirmation page
function loadBookingDetails() {
  const details = JSON.parse(sessionStorage.getItem("bookingDetails")) || {}

  // Display booking details
  document.getElementById("bookingId").textContent = details.bookingId || "SP12345678"
  document.getElementById("locationName").textContent = details.locationName || "Downtown Parking"
  document.getElementById("spotNumber").textContent = details.spotId || "A1"
  document.getElementById("bookingDate").textContent = formatDate(details.date) || "March 18, 2025"
  document.getElementById("bookingTime").textContent =
    formatTimeRange(details.startTime, details.endTime) || "2:00 PM - 4:00 PM"
  document.getElementById("vehicleInfo").textContent =
    `${details.vehicleType || "Sedan"} (${details.licensePlate || "ABC-1234"})`
  document.getElementById("amountPaid").textContent = `${details.amount || "10.00"}`
}

// Get user's current location
function getUserLocation() {
  const locationInfo = document.getElementById("locationInfo")

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success callback
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        currentLocation = {
          lat: latitude,
          lng: longitude,
        }

        // Update location info
        if (locationInfo) {
          locationInfo.innerHTML = `
                        <p><strong>Your current coordinates:</strong></p>
                        <p>Latitude: ${latitude.toFixed(6)}</p>
                        <p>Longitude: ${longitude.toFixed(6)}</p>
                    `
        }

        // Update distance and ETA
        updateDistanceAndETA()

        // In a real app, this would initialize a map with the user's location
        initLiveMap(latitude, longitude)
      },
      (error) => {
        // Error callback
        console.error("Error getting location:", error)
        if (locationInfo) {
          locationInfo.innerHTML = `<p>Unable to retrieve your location: ${error.message}</p>`
        }
      },
    )
  } else {
    // Geolocation not supported
    if (locationInfo) {
      locationInfo.innerHTML = "<p>Geolocation is not supported by your browser</p>"
    }
  }
}

// Initialize live map on confirmation page
function initLiveMap(latitude, longitude) {
  // In a real app, this would initialize a map library with the user's location
  console.log(`Initializing live map at ${latitude}, ${longitude}`)

  // For demo purposes, we'll just show a placeholder
  const mapElement = document.getElementById("liveMap")
  if (mapElement) {
    // Map initialization code would go here
  }
}

// Update distance and ETA based on user's location
function updateDistanceAndETA() {
  // In a real app, this would calculate the actual distance and ETA
  // For demo purposes, we'll just show placeholder values
  document.getElementById("distance").textContent = "Distance: 2.5 miles from parking location"
  document.getElementById("eta").textContent = "Estimated arrival time: 10 minutes"
}

// Set up event listeners for confirmation page buttons
function setupConfirmationButtons() {
  const getDirectionsBtn = document.getElementById("getDirections")
  if (getDirectionsBtn) {
    getDirectionsBtn.addEventListener("click", () => {
      // In a real app, this would open a maps app with directions
      alert("Opening directions in maps app...")
    })
  }

  const viewBookingBtn = document.getElementById("viewBooking")
  if (viewBookingBtn) {
    viewBookingBtn.addEventListener("click", () => {
      alert("Viewing booking details...")
    })
  }

  const downloadPassBtn = document.getElementById("downloadPass")
  if (downloadPassBtn) {
    downloadPassBtn.addEventListener("click", () => {
      alert("Downloading parking pass...")
    })
  }

  const addToCalendarBtn = document.getElementById("addToCalendar")
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener("click", () => {
      alert("Adding to calendar...")
    })
  }
}

// Helper Functions
function loadUser() {
  const userDataString = sessionStorage.getItem("currentUser")
  if (userDataString) {
    currentUser = JSON.parse(userDataString)

    // Update UI with user info
    const usernameElement = document.querySelector(".username")
    if (usernameElement) {
      usernameElement.textContent = currentUser.name
    }

    const avatarElement = document.querySelector(".avatar")
    if (avatarElement) {
      avatarElement.src = currentUser.avatar
    }
  } else {
    // No user found, redirect to login
    window.location.href = "index.html"
  }
}

function getLocationName(locationId) {
  const locations = {
    downtown: "Downtown Parking",
    mall: "Shopping Mall",
    airport: "Airport Parking",
    stadium: "Stadium Parking",
  }

  return locations[locationId] || "Unknown Location"
}

function formatDate(dateString) {
  if (!dateString) return ""

  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTimeRange(startTime, endTime) {
  if (!startTime || !endTime) return ""

  return `${formatTime(startTime)} - ${formatTime(endTime)}`
}

function formatTime(timeString) {
  if (!timeString) return ""

  const [hours, minutes] = timeString.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12

  return `${hour12}:${minutes} ${ampm}`
}

function calculateAmount(startTime, endTime) {
  if (!startTime || !endTime) return "10.00"

  // Parse times
  const [startHour, startMinute] = startTime.split(":").map(Number)
  const [endHour, endMinute] = endTime.split(":").map(Number)

  // Calculate duration in hours
  const startTotalMinutes = startHour * 60 + startMinute
  const endTotalMinutes = endHour * 60 + endMinute
  const durationHours = (endTotalMinutes - startTotalMinutes) / 60

  // Calculate amount (assuming $5 per hour)
  const rate = 5
  const amount = durationHours * rate

  return amount.toFixed(2)
}

