package com.example.Courses.Registeration.System.service;
import com.example.Courses.Registeration.System.model.Course;
import com.example.Courses.Registeration.System.model.CourseRegistry;
import com.example.Courses.Registeration.System.repository.CourseRegistryRepo;
import com.example.Courses.Registeration.System.repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CourseService {
    @Autowired
    CourseRepo courseRepo;
    @Autowired
    CourseRegistryRepo courseRegistryRepo;
   public List<Course> availableCourses() {
       return courseRepo.findAll();//list of methods return to controller- find all()
   }
   public List<CourseRegistry>enrolledstudents(){
       return courseRegistryRepo.findAll();
   }
   public void enrollCourse(String Name,String EmailId,String Contact,String  CourseName){
       CourseRegistry courseRegistry=new CourseRegistry(Name,EmailId,Contact,CourseName);
       courseRegistryRepo.save(courseRegistry);
   }
    public void deleteStudent(int id) {
        courseRegistryRepo.deleteById(id);
    }
    public void updateStudent(int id, CourseRegistry updated) {
        CourseRegistry existing = courseRegistryRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updated.getName());
            existing.setEmailId(updated.getEmailId());
            existing.setContact(updated.getContact());
            existing.setCourseName(updated.getCourseName());
            courseRegistryRepo.save(existing);
        }
    }

}
