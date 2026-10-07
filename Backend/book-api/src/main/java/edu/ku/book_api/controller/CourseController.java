package edu.ku.book_api.controller;

import edu.ku.book_api.model.Course;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    private final List<Course> courses = new ArrayList<>(List.of(
    new Course(1L, "EWA301", "Advanced Enterprise Web App", 3),
    new Course(2L, "DB201", "Database Systems", 3),
    new Course(3L, "SE202", "Software Engineering", 3)
));

    @GetMapping
    public List<Course> getCourses() {
    return courses;
}

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        courses.add(course);
        return course;
    }
}