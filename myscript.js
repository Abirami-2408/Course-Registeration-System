function showCourses(){
    fetch("http://localhost:8080/api/courses")//API End Point
    .then((response)=>response.json())
    .then((courses) =>{
        const dataTable=document.getElementById("coursetable")
        courses.forEach(course => {
            var row = `<tr>
            <td>${course.courseId}</td>
             <td>${course.courseName}</td>
              <td>${course.durationInWeeks}</td>
              <td>${course.trainer}</td>
              
            </tr>`
            dataTable.innerHTML+=row;
        });
    });  
}
function loadStudents() {
    fetch("http://localhost:8080/api/courses/enrolled")//API End Point
        .then(response => response.json())//http response into json object
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
    fetch(`http://localhost:8080/api/courses/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadStudents(); // refresh table
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

    fetch(`http://localhost:8080/api/courses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        loadStudents(); // refresh table
    })
    .catch(err => console.error(err));
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