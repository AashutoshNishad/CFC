const Event_Router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Event = require("../DB Schema/Event");

// hellow
// http://localhost:8000/event/Create_event
Event_Router.post(
  "/Create_event",
  [
    body("Title").isLength({ max: 200, min: 3 }),
    body("Edate").isDate(),
    body("Time").custom((value) => {
      return value ? true : Promise.reject("Time must require");
    }),
    body("venue").isLength({ max: 200 }),
  ],
  async (req, res) => {
    try {
      // const errors = validationResult();
      // if (!errors.isEmpty()) res.send(errors.array());

      const new_event = new Event({
        Title: req.body.Title,
        Date: req.body.EDate,
        Time: req.body.Time,
        venue: req.body.venue ? req.body.venue : "Coming Soon !",
      });

      const rsp = await new_event.save();
      res.send(rsp);
    } catch (error) {
      console.log(error);
      res.send("Internal server error");
    }
  }
);

// http://localhost:8000/event/update_event
Event_Router.post(
  "/update_event",
  [
    body("EventId").custom(async (value) => {
      try {
        const rsp = await Event.findById(value);
        if (rsp != null) {
          return true;
        }
        return Promise.reject("Event not exist");
      } catch (error) {
        console.log(error);
      }
    }),
    body("Date").custom(async (value) => {
      if (value == undefined) return true;
      value.isDate();
    }),
    body("Title").custom((value) => {
      if (value == undefined) return true;

      value.isLength({ max: 200, min: 3 });
    }),
    body("venue").custom((value) => {
      if (value == undefined) return true;

      value.isLength({ max: 200 });
    }),
  ],
  async (req, res) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) res.send(errors.array());
      var obj = {};
      if (req.body.Description) {
        obj.Description = req.body.Description;
      }
      if (req.body.Title) {
        obj.Title = req.body.Title;
      }
      if (req.body.Date) {
        var d = new Date(req.body.Date);
        obj.Date = d;
      }
      if (req.body.venue) {
        obj.venue = req.body.venue;
      }
      const rsp = await Event.findById(req.body.EventId).updateOne({
        $set: obj,
      });
      res.send(rsp);
    } catch (error) {
      console.log(error);
      res.send("internal Server Error");
    }
  }
);

module.exports = Event_Router;
