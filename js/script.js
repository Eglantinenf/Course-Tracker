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

function deleteCourse(index) {
  courses.splice(index, 1);
  localStorage.setItem("courses", JSON.stringify(courses));
  renderCourses();
}

function formatTime(time) {
  if (time < 60) {
    return `${time} min`;
  } else {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`;
  }
}

function renderCourses() {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";
  totalRemaining = 0;
  totalSpent = 0;

  courses.forEach((course, index) => {
    const listItem = document.createElement("li");
    listItem.className = course.completed
      ? "completed border-b border-gray-300 py-2"
      : "border-b border-gray-200 py-2";

    const formattedTime = formatTime(course.totalTime);

    listItem.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">${course.title} - Total Lectures: ${formattedTime}</span>
        <div>
          <button onclick="markCompleted(${index})" class="bg-green-500 text-white rounded-lg p-1 ml-2 hover:bg-green-600 transition duration-200">Complete Lecture</button>
          <button onclick="deleteCourse(${index})" class="bg-red-500 text-white rounded-lg p-1 ml-2 hover:bg-red-600 transition duration-200">Delete</button>
        </div>
      </div>
    `;
    courseList.appendChild(listItem);
  });

  totalRemaining = courses.reduce(
    (sum, course) => sum + (course.completed ? 0 : course.totalTime),
    0
  );

  totalSpent = courses.reduce(
    (sum, course) => sum + (course.completed ? course.totalTime : 0),
    0
  );

  document.getElementById("totalSpent").innerText = formatTime(totalSpent);
  document.getElementById("totalRemaining").innerText =
    formatTime(totalRemaining);
}

renderCourses();
