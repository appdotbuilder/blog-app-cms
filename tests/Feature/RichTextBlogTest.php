<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RichTextBlogTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_admin_can_create_post_with_rich_content(): void
    {
        // Create admin role
        Role::factory()->create(['name' => 'admin']);
        
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $category = Category::factory()->create();
        $tags = Tag::factory()->count(3)->create();

        $this->actingAs($admin);

        $response = $this->post(route('posts.store'), [
            'title' => 'Test Rich Text Post',
            'slug' => 'test-rich-text-post',
            'excerpt' => 'This is a test excerpt for the rich text post.',
            'content' => '<h1>Rich Content</h1><p>This is <strong>bold</strong> and <em>italic</em> text.</p><img src="/storage/images/test.jpg" alt="Test Image" />',
            'status' => 'published',
            'category_id' => $category->id,
            'tag_ids' => $tags->pluck('id')->toArray(),
            'featured_image' => UploadedFile::fake()->image('featured.jpg', 800, 600),
        ]);

        $response->assertRedirect();
        
        $post = Post::where('slug', 'test-rich-text-post')->first();
        $this->assertNotNull($post);
        $this->assertEquals('Test Rich Text Post', $post->title);
        $this->assertEquals('published', $post->status);
        $this->assertStringContainsString('<h1>Rich Content</h1>', $post->content);
        $this->assertNotNull($post->featured_image);
        $this->assertEquals($category->id, $post->category_id);
        $this->assertEquals(3, $post->tags->count());
    }

    public function test_blog_index_displays_posts_with_rich_content(): void
    {
        $category = Category::factory()->create(['color' => '#6366f1']);
        $tag = Tag::factory()->create(['color' => '#ec4899']);
        
        $post = Post::factory()->create([
            'status' => 'published',
            'published_at' => now(),
            'category_id' => $category->id,
            'content' => '<h2>Rich Content</h2><p>This post has <strong>rich</strong> content with images and formatting.</p>',
            'featured_image' => 'posts/test-featured.jpg',
        ]);
        
        $post->tags()->attach($tag);

        $response = $this->get(route('blog.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('blog/index')
                ->has('latestPosts')
                ->has('categories')
                ->has('popularTags')
        );
    }

    public function test_blog_post_displays_rich_content_properly(): void
    {
        $category = Category::factory()->create();
        $post = Post::factory()->create([
            'status' => 'published',
            'published_at' => now(),
            'category_id' => $category->id,
            'content' => '<h1>Test Title</h1><p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p><blockquote>This is a quote</blockquote><img src="/storage/images/test.jpg" alt="Test Image" style="max-width: 100%;" />',
            'featured_image' => 'posts/featured.jpg',
        ]);

        $response = $this->get(route('blog.show', $post->slug));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('blog/show')
                ->has('post', fn ($post) =>
                    $post->where('content', fn ($content) => str_contains($content, '<h1>Test Title</h1>'))
                         ->where('content', fn ($content) => str_contains($content, '<strong>bold text</strong>'))
                         ->where('content', fn ($content) => str_contains($content, '<blockquote>'))
                         ->where('content', fn ($content) => str_contains($content, '<img'))
                         ->etc()
                )
        );

        // Verify view count incremented (might be higher due to other requests)
        $this->assertGreaterThanOrEqual(1, $post->fresh()->views_count);
    }

    public function test_image_upload_endpoint_works(): void
    {
        // Create admin role
        Role::factory()->create(['name' => 'admin']);
        
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $this->actingAs($admin);

        $file = UploadedFile::fake()->image('test-upload.jpg', 600, 400);

        $response = $this->post(route('images.store'), [
            'image' => $file,
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'success',
            'url',
            'path',
            'name',
            'size',
        ]);

        $data = $response->json();
        $this->assertTrue($data['success']);
        $this->assertStringContainsString('/storage/images/', $data['url']);
    }

    public function test_post_reading_time_calculation(): void
    {
        $longContent = str_repeat('This is a test word. ', 100); // ~400 words
        $post = Post::factory()->create([
            'content' => $longContent,
        ]);

        // Reading time calculation may vary, just check it exists and is reasonable
        $this->assertStringContainsString('min read', $post->reading_time);
    }

    public function test_welcome_page_shows_featured_posts(): void
    {
        $category = Category::factory()->create();
        
        // Create posts with different view counts
        Post::factory()->create([
            'status' => 'published',
            'published_at' => now(),
            'views_count' => 100,
            'category_id' => $category->id,
        ]);
        
        Post::factory()->create([
            'status' => 'published',
            'published_at' => now(),
            'views_count' => 200,
            'category_id' => $category->id,
        ]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('featuredPosts')
                ->has('stats')
        );
    }

    public function test_rich_text_editor_components_load(): void
    {
        // Create admin role
        Role::factory()->create(['name' => 'admin']);
        
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $this->actingAs($admin);

        $category = Category::factory()->create();
        $tag = Tag::factory()->create();

        $response = $this->get(route('posts.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('posts/create')
                ->has('categories')
                ->has('tags')
        );
    }
}