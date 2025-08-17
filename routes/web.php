<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Models\Post;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page with blog preview
Route::get('/', function () {
    $featuredPosts = Post::published()
        ->with(['author', 'category', 'tags'])
        ->orderBy('views_count', 'desc')
        ->take(3)
        ->get();

    $stats = [
        'postsCount' => Post::published()->count(),
        'categoriesCount' => Category::count(),
        'authorsCount' => User::has('posts')->count(),
    ];

    return Inertia::render('welcome', [
        'featuredPosts' => $featuredPosts,
        'stats' => $stats,
    ]);
})->name('home');

// Public blog routes
Route::controller(BlogController::class)->group(function () {
    Route::get('/blog', 'index')->name('blog.index');
    Route::get('/blog/{post:slug}', 'show')->name('blog.show');
});

// Public category and tag routes
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('/tags/{tag:slug}', [TagController::class, 'show'])->name('tags.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $data = [
            'totalPosts' => \App\Models\Post::count(),
            'publishedPosts' => \App\Models\Post::published()->count(),
            'totalCategories' => \App\Models\Category::count(),
            'totalTags' => \App\Models\Tag::count(),
        ];

        if ($user->is_admin) {
            $data['recentPosts'] = \App\Models\Post::with(['author', 'category'])
                ->latest()
                ->take(5)
                ->get();
        } else {
            $data['userPosts'] = \App\Models\Post::where('user_id', $user->id)
                ->with(['category'])
                ->latest()
                ->take(5)
                ->get();
        }

        return Inertia::render('dashboard', $data);
    })->name('dashboard');

    // Admin-only routes for content management
    Route::middleware(\App\Http\Middleware\EnsureUserIsAdmin::class)->group(function () {
        Route::resource('posts', PostController::class);
        Route::resource('categories', CategoryController::class)->except(['show']);
        Route::resource('tags', TagController::class)->except(['show']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
