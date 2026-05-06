package com.example.Courses.Registeration.System.controller;
import com.example.Courses.Registeration.System.model.CourseRegistry;
import com.example.Courses.Registeration.System.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.validation.BindingResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@Controller
@CrossOrigin(origins = "*")
public class CourseController {
    @Autowired
    CourseService courseService;

    @PostMapping("/courses/register")
    public String enrollCourse(@Valid @ModelAttribute CourseRegistry courseRegistry,
                               BindingResult result) {

        if (result.hasErrors()) {
            return "redirect:/register.html";
        }
        courseService.enrollCourse(
                courseRegistry.getName(),
                courseRegistry.getEmailId(),
                courseRegistry.getContact(),
                courseRegistry.getCourseName()
        );

        return "redirect:/success.html?name=" + courseRegistry.getName()
                + "&course=" + courseRegistry.getCourseName();
    }
}