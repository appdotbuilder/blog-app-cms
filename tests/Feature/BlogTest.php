<?php

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Role;

beforeEach(function () {
    // Create roles
    Role::create(['name' => 'admin']);
    Role::create(['name' => 'user']);
});

it('displays welcome page with blog preview', function () {
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('featuredPosts')
            ->has('stats')
    );
});

it('displays blog index page', function () {
    $response = $this->get('/blog');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('blog/index')
            ->has('featuredPosts')
            ->has('latestPosts')
            ->has('categories')
            ->has('popularTags')
    );
});

it('displays published blog post', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $user->assignRole('admin');
    
    $post = Post::factory()->published()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
    ]);

    $response = $this->get("/blog/{$post->slug}");
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('blog/show')
            ->has('post')
            ->has('relatedPosts')
    );
});

it('redirects unauthenticated users from admin pages', function () {
    $response = $this->get('/posts');
    
    $response->assertRedirect('/login');
});

it('allows admin to access post management', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get('/posts');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('posts/index')
    );
});

it('denies regular user access to admin pages', function () {
    $user = User::factory()->create();
    $user->assignRole('user');

    $response = $this->actingAs($user)->get('/posts');
    
    $response->assertStatus(403);
});

it('allows admin to create new post', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $category = Category::factory()->create();
    $tags = Tag::factory()->count(3)->create();

    $postData = [
        'title' => 'Test Blog Post',
        'slug' => 'test-blog-post',
        'content' => 'This is test content for the blog post.',
        'status' => 'published',
        'category_id' => $category->id,
        'tags' => $tags->pluck('id')->toArray(),
    ];

    $response = $this->actingAs($admin)->post('/posts', $postData);
    
    $response->assertRedirect();
    
    $this->assertDatabaseHas('posts', [
        'title' => 'Test Blog Post',
        'slug' => 'test-blog-post',
        'user_id' => $admin->id,
    ]);
});

it('increments view count when post is viewed', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    
    $post = Post::factory()->published()->create([
        'user_id' => $user->id,
        'views_count' => 0,
    ]);

    $initialViews = $post->views_count;
    
    $this->get("/blog/{$post->slug}");
    
    $post->refresh();
    expect($post->views_count)->toBe($initialViews + 1);
});

it('displays category page with posts', function () {
    $category = Category::factory()->create();
    $user = User::factory()->create();
    $user->assignRole('admin');
    
    Post::factory()->published()->count(3)->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
    ]);

    $response = $this->get("/categories/{$category->slug}");
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('categories/show')
            ->has('category')
            ->has('posts')
    );
});

it('displays tag page with posts', function () {
    $tag = Tag::factory()->create();
    $user = User::factory()->create();
    $user->assignRole('admin');
    
    $post = Post::factory()->published()->create([
        'user_id' => $user->id,
    ]);
    
    $post->tags()->attach($tag);

    $response = $this->get("/tags/{$tag->slug}");
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('tags/show')
            ->has('tag')
            ->has('posts')
    );
});

it('shows different dashboard content for admin and users', function () {
    // Test admin dashboard
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get('/dashboard');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('recentPosts')
    );

    // Test user dashboard
    $user = User::factory()->create();
    $user->assignRole('user');

    $response = $this->actingAs($user)->get('/dashboard');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('userPosts')
    );
});