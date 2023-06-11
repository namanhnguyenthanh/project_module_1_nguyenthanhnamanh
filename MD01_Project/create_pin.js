document.addEventListener("DOMContentLoaded", function () {
  let pinForm = document.querySelector("form");
  let createPinButton = document.querySelector(".create-pin-button");

  let loginUser = JSON.parse(localStorage.getItem("loginUser"));

  // Xử lý sự kiện khi nút "Create Pin" được nhấn
  createPinButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Lấy giá trị từ các trường input và textarea
    let pinTitle = pinForm.querySelector('input[type="text"]').value;
    let pinDescription = pinForm.querySelector("textarea").value;
    let pinImageUrl = pinForm.querySelector('input[type="url"]').value;

    // Kiểm tra xem các trường có giá trị không rỗng
    if (
      pinTitle.trim() === "" ||
      pinDescription.trim() === "" ||
      pinImageUrl.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Tạo đối tượng pin từ các giá trị nhập vào
    let newPin = {
      id: Math.floor(Math.random() * 100000000000000),
      title: pinTitle,
      description: pinDescription,
      img: pinImageUrl,
      userId: loginUser.id,
    };

    // Lấy danh sách các pin từ localStorage
    let imgObj = JSON.parse(localStorage.getItem("imgObj")) || [];

    // Thêm pin mới vào danh sách
    imgObj.push(newPin);

    // Lưu danh sách các pin vào localStorage
    localStorage.setItem("imgObj", JSON.stringify(imgObj));

    // Reset giá trị các trường form
    pinForm.reset();

    alert("Pin created successfully!");
    window.location.href = "./mainpage.html";
  });
});
