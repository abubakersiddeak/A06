//  mobile menu troggule button
const menuModal = document.getElementById("menuModal");
let num = 1;
function handleManuClick() {
  num++;
  if (num % 2 === 0) {
    menuModal.classList.remove("hidden");
    menuModal.classList.add("flex");
  } else {
    menuModal.classList.remove("flex");
    menuModal.classList.add("hidden");
  }
}
