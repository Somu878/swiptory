const express = require("express");
const Story = require("../models/storyModel");
const storyRouter = express.Router();
const tokenVerification = require("../middlewares/verifyToken");
const { handleErrorResponse } = require("../utils/handleError");
const Joi = require("joi");
const storySchemaValidation = Joi.object({
  createdAt: Joi.date(),
  lastUpdatedAt: Joi.date().default(null),
  slides: Joi.array()
    .min(3)
    .items(
      Joi.object({
        category: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        imageURL: Joi.string().required(),
      })
    ),
});
const storyByCategoryController = async (req, res) => {
  try {
    const { category, page } = req.body;
    const categoryRegex = new RegExp(category, "i");
    const query = {
      "slides.category": categoryRegex,
    };
    const totalStories = await Story.countDocuments(query);

    const stories = await Story.find(query).limit(page * 4);
    const storiesRemainanig = totalStories - page * 4;
    const storiesWithEditAccess = stories.map((story) => {
      const editable = story.ownedBy.toString() === req.userID;
      return {
        ...story.toObject(),
        editable: editable,
      };
    });
    res.json({
      stories: storiesWithEditAccess,
      remainingStories: Math.max(storiesRemainanig, 0),
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
storyRouter.get("/story-by-category", storyByCategoryController);
storyRouter.get(
  "/story-by-category",
  tokenVerification,
  storyByCategoryController
);

storyRouter.post("/add", tokenVerification, async (req, res) => {
  try {
    const story = await storySchemaValidation.validateAsync(req.body);
    const newStory = new Story({
      ...story,
      ownedBy: req.userID,
    });
    await newStory.save();
    return res.status(201).json({
      message: "New Story added",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});
module.exports = storyRouter;
