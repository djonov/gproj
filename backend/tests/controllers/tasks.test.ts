import "mocha";
import { expect } from "chai";
const chai = require("chai");
const chaiHttp = require("chai-http");

import { app } from "../../src/app";
import { Task, TaskStatus } from "../../src/models/task.model";
import { create } from "../../src/dataaccess/tasks.da";

chai.use(chaiHttp);
describe("### Tasks controller", () => {
  let taskId;
  const newTaskStatus = TaskStatus.INPROGRESS;
  const newTaskContent = "Hello World";

  before((done) => {
    app.addListener("DB_CONNECTED", () => {
      done();
    });
  });

  it("should create a task", (done) => {
    chai
      .request(app)
      .post("/tasks")
      .send({
        content: "Hello World!",
        status: TaskStatus.INPROGRESS,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property("_id");
        done();
      });
  });

  it("should fail create because of missing parameters", (done) => {
    chai
      .request(app)
      .post(`/tasks`)
      .send({
        status: newTaskStatus,
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(422);
        done();
      });
  });

  it("should fail create because of invalid content parameter", (done) => {
    chai
      .request(app)
      .post(`/tasks`)
      .send({
        content: 8,
        status: newTaskStatus,
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(422);
        done();
      });
  });

  it("should fail create because of invalid status parameter", (done) => {
    chai
      .request(app)
      .post(`/tasks`)
      .send({
        content: newTaskContent,
        status: "x",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(422);
        done();
      });
  });

  beforeEach((done) => {
    create(
      new Task({
        content: newTaskContent,
        status: newTaskStatus,
      })
    ).then((task: Task) => {
      taskId = task._id;
      done();
    });
  });

  it("should update a task with all properties", (done) => {
    const content = "Hello World2!";
    const status = TaskStatus.COMPLETED;
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send({
        content,
        status,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("content");
        expect(res.body).to.have.property("status");
        expect(res.body.content).to.be.equal(content);
        expect(res.body.status).to.be.equal(status);
        done();
      });
  });

  it("should update a task only with content", (done) => {
    const content = "Hello World 3!";
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send({
        content,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("content");
        expect(res.body).to.have.property("status");
        expect(res.body.content).to.be.equal(content);
        expect(res.body.status).to.be.equal(newTaskStatus);
        done();
      });
  });

  it("should update a task only with status", (done) => {
    const status = TaskStatus.COMPLETED;
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send({
        status,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("content");
        expect(res.body).to.have.property("status");
        expect(res.body.content).to.be.equal(newTaskContent);
        expect(res.body.status).to.be.equal(status);
        done();
      });
  });

  it("should fail update because of invalid content parameter", (done) => {
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send({
        content: 8,
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(422);
        done();
      });
  });

  it("should fail update because of invalid status parameter", (done) => {
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send({
        status: "x",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(422);
        done();
      });
  });

  it("should delete task", (done) => {
    chai
      .request(app)
      .delete(`/tasks/${taskId}`)
      .send()
      .end((err, res) => {
        expect(res.status).to.be.equal(204);
        done();
      });
  });
});
