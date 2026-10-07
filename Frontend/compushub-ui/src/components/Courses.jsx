import { useEffect, useState } from "react";
import { getCourses } from "../services/courseApi";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchCourses() {
      try {
        setLoading(true);
        setError("");

        const response = await getCourses();

        if (!ignore) {
          setCourses(response.data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error loading courses:", error);
          setError("Unable to load courses. Check the backend and try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchCourses();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section>
      <h2>Course Management</h2>

      {loading && <p>Loading courses...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p>No courses available.</p>
      )}

      {!loading && !error && courses.length > 0 && (
        <>
          <p>Total Courses: {courses.length}</p>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Title</th>
                <th>Credits</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
