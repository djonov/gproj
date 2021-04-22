import "mocha";
import { expect } from "chai";
const chai = require("chai");
const chaiHttp = require("chai-http");
import { ObjectId } from "mongodb";

import { app } from "../../src/app";
import { Task, TaskStatus } from "../../src/models/task.model";
import { create } from "../../src/dataaccess/tasks.da";

chai.use(chaiHttp);
describe("### Tasks controller", () => {
  const taskIds = [];
  const newTaskStatus = TaskStatus.ACTIVE;
  const newTaskContent = "Hello World";

  before((done) => {
    app.addListener("DB_CONNECTED", () => {
      done();
    });
  });

  it("should create a task", (done) => {
    chai
      .request(app)
      .post("/api/v1/tasks")
      .send({
        content: "Hello World!",
        status: TaskStatus.ACTIVE,
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
      .post(`/api/v1/tasks`)
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
      .post(`/api/v1/tasks`)
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
      .post(`/api/v1/tasks`)
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
      taskIds.push(task._id);
      done();
    });
  });

  it("should update a task with all properties", (done) => {
    const content = "Hello World2!";
    const status = TaskStatus.COMPLETED;
    chai
      .request(app)
      .put(`/api/v1/tasks/${taskIds.slice(-1)}`)
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
        expect(res.body.changeDate).to.not.be.null;
        expect(res.body.createDate).to.not.be.null;
        expect(res.body.changeDate).to.not.equal(res.body.createDate);
        done();
      });
  });

  it("should update a task only with content", (done) => {
    const content = "Hello World 3!";
    chai
      .request(app)
      .put(`/api/v1/tasks/${taskIds.slice(-1)}`)
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
        expect(res.body.changeDate).to.not.be.null;
        expect(res.body.createDate).to.not.be.null;
        expect(res.body.changeDate).to.not.equal(res.body.createDate);
        done();
      });
  });

  it("should update a task only with status", (done) => {
    const status = TaskStatus.COMPLETED;
    chai
      .request(app)
      .put(`/api/v1/tasks/${taskIds.slice(-1)}`)
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
        expect(res.body.changeDate).to.not.be.null;
        expect(res.body.createDate).to.not.be.null;
        expect(res.body.changeDate).to.not.equal(res.body.createDate);
        done();
      });
  });

  it("should fail update because of invalid content parameter", (done) => {
    chai
      .request(app)
      .put(`/api/v1/tasks/${taskIds.slice(-1)}`)
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
      .put(`/api/v1/tasks/${taskIds.slice(-1)}`)
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
      .delete(`/api/v1/tasks/${taskIds.slice(-1)}`)
      .send()
      .end((err, res) => {
        expect(res.status).to.be.equal(204);
        done();
      });
  });

  it("should update multiple tasks at once", (done) => {
    const updateTasks = taskIds.map((taskId: string) => {
      return new Task({
        _id: new ObjectId(taskId),
        status: TaskStatus.COMPLETED,
        content: `Hello world - ${taskId}`,
      });
    });
    chai
      .request(app)
      .put(`/api/v1/tasks`)
      .send(updateTasks)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
