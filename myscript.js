function showCourses() {
    fetch("https://courses-registeration-backened.onrender.com/api/courses")
        .then((response) => response.json())
        .then((courses) => {
            const dataTable = document.getElementById("coursetable");
            courses.forEach(course => {
                var row = `<tr>
                    <td>${course.courseId}</td>
                    <td>${course.courseName}</td>
                    <td>${course.durationInWeeks}</td>
                    <td>${course.trainer}</td>
                </tr>`;
                dataTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading courses:", error));
}

function loadStudents() {
    fetch("https://courses-registeration-backened.onrender.com/api/courses/enrolled")
        .then(response => response.json())
        .then((students) => {
            console.log("DATA:", students);
            const dataTable = document.getElementById("studentTable");
            dataTable.innerHTML = "";
            students.forEach(student => {
                var row = `<tr>
                    <td>${student.name}</td>
                    <td>${student.emailId}</td>
                    <td style="color:red;">${student.contact}</td>
                    <td>${student.courseName}</td>
                    <td>
                        <button onclick='editStudent(${JSON.stringify(student)})'>Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>`;
                dataTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error:", error));
}
function deleteStudent(id) {
    // Custom confirm instead of browser default
    const confirmed = confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    fetch(`https://courses-registeration-backened.onrender.com/api/courses/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        showToast("Student deleted successfully!");
        loadStudents();
    })
    .catch(error => console.error("Error:", error));
}

function editStudent(student) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("editId").value = student.id;
    document.getElementById("editName").value = student.name;
    document.getElementById("editEmail").value = student.emailId;
    document.getElementById("editContact").value = student.contact;
    document.getElementById("editCourse").value = student.courseName;
}

function updateStudent() {
    document.getElementById("editForm").style.display = "none";
    const id = document.getElementById("editId").value;
    const data = {
        name: document.getElementById("editName").value,
        emailId: document.getElementById("editEmail").value,
        contact: document.getElementById("editContact").value,
        courseName: document.getElementById("editCourse").value
    };
    fetch(`https://courses-registeration-backened.onrender.com/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {  
        showToast("Student updated successfully!");
        loadStudents();
    })
    .catch(err => console.error(err));
}

function registerStudent(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const name = document.getElementById("Name").value;
    const course = document.getElementById("Course").value;

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("emailId", document.getElementById("EmailId").value);
    formData.append("contact", document.getElementById("Contact").value);
    formData.append("courseName", course);

    fetch("https://courses-registeration-backened.onrender.com/courses/register", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
        redirect: "manual"
    })
    .then(response => {
        if (response.type === "opaqueredirect" || response.ok) {
            window.location.href = "success.html?name=" +
                encodeURIComponent(name) +
                "&course=" + encodeURIComponent(course);
        } else {
            alert("Registration failed. Try again.");
        }
    })
    .catch(() => {
        window.location.href = "success.html?name=" +
            encodeURIComponent(name) +
            "&course=" + encodeURIComponent(course);
    });
}

function validateForm() {
    let name = document.getElementById("Name").value;
    let email = document.getElementById("EmailId").value;
    let contact = document.getElementById("Contact").value;
    let nameError = document.getElementById("nameError");
    nameError.innerText = "";

    if (name.trim() === "") {
        nameError.innerText = "Name is required";
        return false;
    }
    if (!email.includes("@")) {
        alert("Enter valid email");
        return false;
    }
    if (contact.length !== 10) {
        alert("Contact must be 10 digits");
        return false;
    }
    return true;
}
function showToast(message) {
    // Create toast element
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #4b6756;
        color: white;
        padding: 12px 25px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(toast);
    // Remove after 3 seconds
    setTimeout(() => toast.remove(), 3000);
}
