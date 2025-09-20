import React from 'react';
import AutoRecipe from './components/AutoRecipe';
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">FoodBlog — Auto Recipes</h1>
          <a className="text-sm underline" href="#" target="_blank" rel="noreferrer">About</a>
        </header>
        <AutoRecipe />
        <footer className="mt-12 text-center text-sm text-gray-600">Local demo • Images from Wikipedia</footer>
      </div>
    </div>
  );
}
