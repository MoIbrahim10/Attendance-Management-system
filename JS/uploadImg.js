
export function UploadImagefn() {
const uploadImageSec = document.querySelector(".uploadImageSec");
const uploadImageDiv = document.querySelector(".uploadImage");
const uploadImage = document.querySelector(".uploadImage img");

uploadImage.style.boxSize = "border-box";

uploadImageSec.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("accept", "image/*");
  fileInput.click();

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    const fileName = file.name;

    reader.addEventListener("load", () => {
      uploadImage.setAttribute("src", reader.result);
      uploadImage.setAttribute("alt", fileName);
      uploadImageDiv.style.border = "none";
      uploadImageDiv.style.padding = "0";
      uploadImage.style.width = "100%";
      uploadImage.style.height = "100%";
    });

    reader.readAsDataURL(file);
  });
});

}