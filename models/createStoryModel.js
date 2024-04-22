const mongoose = require('mongoose');

// slide schema
const slideSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

//  custom validator function for slides
function slidesValidator(slides) {
  const minSlides = 3;
  const maxSlides = 6;
  return slides.length >= minSlides && slides.length <= maxSlides;
}

// story schema
const storySchema = new mongoose.Schema({
  slides: {
    type: [slideSchema],
    required: true,
    validate: [slidesValidator, 'Each story must have 3 to 6 slides'],
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'health', 'fitness', 'travel', 'movie', 'education'],
  },
  like_counter: {
    type: Number,
    default: 0,
  },
  liked_by_ids: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    
  },
  story_created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // reference to  User model
  },
});

// Create the Story model
const Story = mongoose.model('Story', storySchema);

  


module.exports = Story;