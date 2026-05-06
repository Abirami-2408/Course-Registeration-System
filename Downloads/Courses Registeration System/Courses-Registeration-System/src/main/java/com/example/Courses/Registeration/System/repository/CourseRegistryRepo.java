package com.example.Courses.Registeration.System.repository;
import com.example.Courses.Registeration.System.model.Course;
import com.example.Courses.Registeration.System.model.CourseRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRegistryRepo extends JpaRepository <CourseRegistry,Integer>{

}
