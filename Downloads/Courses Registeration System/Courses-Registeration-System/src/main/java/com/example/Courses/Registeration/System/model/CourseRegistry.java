package com.example.Courses.Registeration.System.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
@Entity
public class CourseRegistry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Name is required")
    private String name;
    @Email(message = "Invalid email format")
    private String emailId;
    @Pattern(regexp = "\\d{10}", message = "Contact must be 10 digits")
    private String contact;
    @NotBlank(message = "Course name is required")
    private String courseName;
    // Default constructor (REQUIRED)
    public CourseRegistry() {}
    // Parameterized constructor
    public CourseRegistry(String name, String emailId, String contact, String courseName) {
        this.name = name;
        this.emailId = emailId;
        this.contact = contact;
        this.courseName = courseName;
    }

    // Getters & Setters

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getEmailId() { return emailId; }

    public void setEmailId(String emailId) { this.emailId = emailId; }

    public String getContact() { return contact; }

    public void setContact(String contact) { this.contact = contact; }

    public String getCourseName() { return courseName; }

    public void setCourseName(String courseName) { this.courseName = courseName; }
}