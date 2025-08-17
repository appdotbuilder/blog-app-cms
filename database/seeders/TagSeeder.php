<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'AI', 'color' => '#3B82F6'],
            ['name' => 'Machine Learning', 'color' => '#6366F1'],
            ['name' => 'Web Development', 'color' => '#10B981'],
            ['name' => 'Mobile Apps', 'color' => '#F59E0B'],
            ['name' => 'Startups', 'color' => '#EF4444'],
            ['name' => 'Productivity', 'color' => '#8B5CF6'],
            ['name' => 'Innovation', 'color' => '#EC4899'],
            ['name' => 'Research', 'color' => '#06B6D4'],
            ['name' => 'Future Tech', 'color' => '#84CC16'],
            ['name' => 'Digital Marketing', 'color' => '#F97316'],
        ];

        foreach ($tags as $tag) {
            Tag::firstOrCreate(
                ['slug' => Str::slug($tag['name'])],
                [
                    'name' => $tag['name'],
                    'color' => $tag['color'],
                ]
            );
        }
    }
}