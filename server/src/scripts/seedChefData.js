import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDb } from '../config/db.js'
import Dish from '../models/Dish.js'
import Recipe from '../models/Recipe.js'
import Review from '../models/Review.js'
import Settings from '../models/Settings.js'
import { siteConfig, dishes, recipes, mentors, certifications, timeline } from '../../../client/src/data/config.js'

async function seedChefData() {
  await connectDb()
  console.log('Seeding initial chef portfolio data...')

  // 1. Seed Settings
  const existingSettings = await Settings.findOne()
  if (!existingSettings) {
    await Settings.create({
      ...siteConfig,
      certifications,
      timeline,
    })
    console.log('✅ Settings seeded')
  } else {
    console.log('ℹ️ Settings already exists, skipped')
  }

  // 2. Seed Dishes
  const dishCount = await Dish.countDocuments()
  if (dishCount === 0) {
    const dishDocs = dishes.map((d, index) => ({
      title: d.title || d.alt,
      slug: d.id,
      category: d.category,
      src: d.src,
      alt: d.alt,
      order: index,
      visible: true,
    }))
    await Dish.insertMany(dishDocs)
    console.log(`✅ Seeded ${dishDocs.length} dishes`)
  } else {
    console.log(`ℹ️ ${dishCount} dishes already exist, skipped`)
  }

  // 3. Seed Recipes
  const recipeCount = await Recipe.countDocuments()
  if (recipeCount === 0) {
    const recipeDocs = recipes.map((r, index) => ({
      title: r.title,
      slug: r.id,
      category: r.category || 'General',
      image: r.image || '',
      prepTime: r.prepTime || '20 mins',
      cookTime: r.cookTime || '45 mins',
      servings: r.servings || '2-4 portions',
      ingredients: r.ingredients || [],
      instructions: r.instructions || [],
      chefTips: r.chefTips || '',
      order: index,
      visible: true,
    }))
    await Recipe.insertMany(recipeDocs)
    console.log(`✅ Seeded ${recipeDocs.length} recipes`)
  } else {
    console.log(`ℹ️ ${recipeCount} recipes already exist, skipped`)
  }

  // 4. Seed Reviews (Mentors)
  const reviewCount = await Review.countDocuments()
  if (reviewCount === 0) {
    const reviewDocs = mentors.map((m, index) => ({
      name: m.name,
      role: m.role,
      quote: m.quote,
      image: m.img,
      order: index,
      visible: true,
    }))
    await Review.insertMany(reviewDocs)
    console.log(`✅ Seeded ${reviewDocs.length} mentor reviews`)
  } else {
    console.log(`ℹ️ ${reviewCount} mentor reviews already exist, skipped`)
  }

  console.log('🎉 Chef portfolio seeding complete!')
  await mongoose.disconnect()
}

seedChefData().catch((err) => {
  console.error('Failed to seed chef data:', err)
  process.exit(1)
})
