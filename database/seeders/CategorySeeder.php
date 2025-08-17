<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Technology',
                'description' => 'Latest trends and updates in the technology world',
                'color' => '#3B82F6'
            ],
            [
                'name' => 'Business',
                'description' => 'Business insights, strategies, and market analysis',
                'color' => '#10B981'
            ],
            [
                'name' => 'Lifestyle',
                'description' => 'Tips and stories about living your best life',
                'color' => '#F59E0B'
            ],
            [
                'name' => 'Science',
                'description' => 'Discoveries and breakthroughs in scientific research',
                'color' => '#8B5CF6'
            ],
            [
                'name' => 'Health',
                'description' => 'Health tips, medical news, and wellness advice',
                'color' => '#EF4444'
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'description' => $category['description'],
                    'color' => $category['color'],
                ]
            );
        }
    }
}