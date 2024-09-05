const courses = JSON.parse(localStorage.getItem("courses")) || [];
let totalSpent = 0;
let totalRemaining = 0;

function addCourse() {
  const title = document.getElementById("courseTitle").value;
  const time = parseInt(document.getElementById("lectureTime").value);

  if (title && !isNaN(time) && time > 0) {
    const course = { title, totalTime: time, completed: false };
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
    document.getElementById("courseTitle").value = "";
    document.getElementById("lectureTime").value = "";
    renderCourses();
  } else {
    alert("Please enter a valid course title and total lectures.");
  }
}

function checkEnter(event) {
  if (event.key === "Enter") {
    addCourse();
  }
}

function markCompleted(index) {
  if (!courses[index].completed) {
    courses[index].completed = true;
    totalSpent += courses[index].totalTime;
    localStorage.setItem("courses", JSON.stringify(courses));
    renderCourses();
  } else {
    alert("This course is already completed.");
  }
}

function renderCourses() {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";
  totalRemaining = 0;
  courses.forEach((course, index) => {
    const listItem = document.createElement("li");
    listItem.className = course.completed
      ? "completed border-b border-gray-300 py-2"
      : "border-b border-gray-200 py-2";
    listItem.innerHTML = `  
                    <div class="flex justify-between items-center">  
                        <span class="text-lg font-medium">${course.title} - Total Lectures: ${course.totalTime}</span>  
                        <button onclick="markCompleted(${index})" class="bg-green-500 text-white rounded-lg p-1 ml-2 hover:bg-green-600 transition duration-200">Complete Lecture</button>  
                    </div>  
                `;
    courseList.appendChild(listItem);
  });

  totalRemaining = courses.reduce(
    (sum, course) => sum + (course.completed ? 0 : course.totalTime),
    0
  );
  document.getElementById("totalSpent").innerText = totalSpent;
  document.getElementById("totalRemaining").innerText = totalRemaining;
}

renderCourses();
