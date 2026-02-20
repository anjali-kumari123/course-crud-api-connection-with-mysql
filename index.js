const express = require("express");
const app = express();
const db = require("./db");
app.use(express.json());

// new course add
app.post("/NewCourse/add", (request, response) => {
  const { course_name, duration, total_semesters, fees } = request.body;
  const sql =
    "INSERT INTO courses (course_name,duration,total_semesters,fees) VALUES (?,?,?,?)";
  db.query(
    sql,
    [course_name, duration, total_semesters, fees],
    (error, result) => {
      if (error) {
        return response.status(500).json({
          message: "server internal error" + error,
        });
      }
      response.status(201).json({
        message: " Courses added successfully",
        course_name,
        duration,
        total_semesters,
        fees,
      });
    },
  );
});

// all courses get
app.get("/allCourse", (request, response) => {
  const sql = "SELECT * FROM courses";
  db.query(sql, (error, result) => {
    if (error) {
      return response.status(500).json({
        message: "server internal error" + error,
      });
    }
    response.status(200).json({
      message: "data fetch successfully",
      result,
    });
  });
});

// all faileds update
app.patch("/updateSpecific/data/:course_id", (request, response) => {
  const cId = parseInt(request.params.course_id);
  const { course_name, duration, total_semesters, fees } = request.body;

  let fields = [];
  let value = [];

  if (course_name) {
    fields.push("course_name=?");
    value.push(course_name);
  }

  if (duration) {
    fields.push("duration=?");
    value.push(duration);
  }

  if (total_semesters) {
    fields.push("total_semesters=?");
    value.push(total_semesters);
  }

  if (fees) {
    fields.push("fees=?");
    value.push(fees);
  }

  if (fields.length === 0) {
    return response.status(400).json({
      message: "No fields to update! ",
    });
  }
  const sql = `UPDATE courses SET ${fields.join(", ")} WHERE course_id  = ?`;
  value.push(cId);

  db.query(sql, value, (error, result) => {
    if (error) {
      return response.status(500).json({
        message: "Database update failed",
        error,
      });
    }
    if (result.affectedRows === 0) {
      return response.status(404).json({
        message: " course not found ",
      });
    }
    response.status(200).json({
      message: " course updated successfully ",
      data: { course_id: cId, course_name, duration, total_semesters, fees },
    });
  });
});

// data delete
app.delete("/deleteCourse/:course_id", (request, response) => {
  const cId = parseInt(request.params.course_id);
  const sql = "DELETE FROM courses WHERE course_id=?";
  db.query(sql, [cId], (error, result) => {
    if (error) {
      return response.status(500).json({
        message: "Server internal error:" + error,
      });
    }
    if (result.affectedRows === 0) {
      return response.status(404).json({
        message: "course Not Found",
      });
    }
    response.status(200).json({
      message: "course Deleted Successfully",
      cId,
    });
  });
});

app.listen(2000, () => {
  console.log("server is running");
});
