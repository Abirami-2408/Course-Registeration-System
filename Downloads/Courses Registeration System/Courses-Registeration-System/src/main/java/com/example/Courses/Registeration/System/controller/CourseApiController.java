package com.example.Courses.Registeration.System.controller;
import com.example.Courses.Registeration.System.model.Course;
import com.example.Courses.Registeration.System.model.CourseRegistry;
import com.example.Courses.Registeration.System.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CourseApiController {
    @Autowired
    CourseService courseService;
    @GetMapping("/courses")
    public List<Course> availableCourses() {
        return courseService.availableCourses();
    }
    @GetMapping("/courses/enrolled")
    public List<CourseRegistry> enrolledStudents() {
        return courseService.enrolledstudents();
    }
    @DeleteMapping("/courses/{id}")
    public String deleteStudent(@PathVariable int id) {
        courseService.deleteStudent(id);
        return " Student deleted successfully!";
    }
    @PutMapping("/courses/{id}")
    @ResponseBody
    public String updateStudent(@PathVariable int id,
                                @RequestBody CourseRegistry updated) {
        courseService.updateStudent(id,updated);
        return "Student updated successfully!";
    }

}