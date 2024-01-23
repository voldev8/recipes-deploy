const mongoose = require('mongoose');
const slugify = require('slugify');

const RecipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add an ingredient'],
    maxlength: [500, 'Ingredient can not be more than 50 characters'],
  },
  instructions: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  image: {
    type: String,
    default:
      'https://media.istockphoto.com/vectors/smiling-chef-face-vector-id533998629?k=6&m=533998629&s=612x612&w=0&h=vnud6hVo61ORPVmLuoPOFFMHTdAyM1YorfgINRLnurY=',
    // '/public/images/no-photo-jpg',
  },
  link: {
    type: String,
    default: '/no-link',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  slug: String,
});

RecipesSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

module.exports = mongoose.model('Recipes', RecipesSchema);
