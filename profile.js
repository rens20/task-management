const imageInput = document.getElementById("image-input");
const profileImage = document.getElementById("profile-image");
const nameInput = document.getElementById("name-input");
const saveButton = document.getElementById("save-button");

// Load saved data
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("name");
  if (savedName) {
    nameInput.value = savedName;
  }
  const savedImage = localStorage.getItem("image");
  if (savedImage) {
    profileImage.src = savedImage;
  }
});

// Update profile image
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    profileImage.src = e.target.result;
    localStorage.setItem("image", e.target.result);
  };
  reader.readAsDataURL(file);
});

// Update name and save data
saveButton.addEventListener("click", () => {
  const name = nameInput.value;
  profileImage.alt = name;
  localStorage.setItem("name", name);
  alert("Profile saved!");
});
