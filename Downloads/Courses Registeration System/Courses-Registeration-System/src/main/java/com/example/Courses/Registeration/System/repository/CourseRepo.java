package com.example.Courses.Registeration.System.repository;

import com.example.Courses.Registeration.System.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepo extends JpaRepository<Course,String> {

}
