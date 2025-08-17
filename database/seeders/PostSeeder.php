<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $categories = Category::all();
        $tags = Tag::all();

        if ($users->isEmpty() || $categories->isEmpty()) {
            return;
        }

        $samplePosts = [
            [
                'title' => 'The Future of Artificial Intelligence in Modern Business',
                'excerpt' => 'Exploring how AI is transforming industries and creating new opportunities for growth and innovation.',
                'content' => 'Artificial Intelligence is revolutionizing the way businesses operate across all industries. From automation to predictive analytics, AI technologies are enabling companies to make data-driven decisions, improve efficiency, and deliver better customer experiences.

In the manufacturing sector, AI-powered robots and machine learning algorithms are optimizing production lines and reducing waste. Healthcare organizations are using AI to analyze medical images and assist in diagnosis. Financial institutions are leveraging AI for fraud detection and risk assessment.

The key to successful AI implementation lies in understanding your business needs and choosing the right technologies. Companies that embrace AI early and invest in proper training will have a significant competitive advantage in the coming years.

As we look toward the future, we can expect AI to become even more integrated into our daily business operations, making processes smarter and more efficient.',
                'status' => 'published',
            ],
            [
                'title' => 'Remote Work Revolution: Building Successful Distributed Teams',
                'excerpt' => 'Best practices for managing remote teams and maintaining productivity in a distributed work environment.',
                'content' => 'The shift to remote work has fundamentally changed how we think about team collaboration and productivity. Organizations worldwide have discovered that successful remote teams require intentional design and thoughtful management approaches.

Communication is the cornerstone of effective remote work. Teams that establish clear communication protocols, use the right tools, and maintain regular check-ins tend to perform better than those that don\'t. Video calls, instant messaging, and project management platforms have become essential tools for staying connected.

Building trust in remote teams requires transparency and accountability. When team members can\'t see each other working, it becomes crucial to focus on outcomes rather than hours worked. Setting clear expectations and providing regular feedback helps maintain team cohesion.

The future of work is likely to be hybrid, combining the flexibility of remote work with the benefits of in-person collaboration. Organizations that master this balance will attract top talent and maintain competitive advantages.',
                'status' => 'published',
            ],
            [
                'title' => 'Sustainable Technology: Green Computing for the Future',
                'excerpt' => 'How technology companies are reducing their environmental impact through innovative green computing solutions.',
                'content' => 'As climate change concerns grow, the technology industry is taking significant steps toward sustainability. Green computing initiatives are helping reduce energy consumption and environmental impact across the sector.

Data centers, which consume enormous amounts of energy, are becoming more efficient through advanced cooling systems and renewable energy sources. Cloud computing providers are investing in solar and wind power to run their operations sustainably.

Software optimization is another crucial aspect of green computing. Efficient code and algorithms can significantly reduce the computational resources required for applications, leading to lower energy consumption. Developers are increasingly considering environmental impact in their design decisions.

The circular economy principles are also being applied to technology hardware, with companies focusing on device longevity, repairability, and responsible recycling programs. These efforts are creating a more sustainable technology ecosystem for future generations.',
                'status' => 'published',
            ],
            [
                'title' => 'The Rise of No-Code Development Platforms',
                'excerpt' => 'How no-code tools are democratizing software development and empowering non-technical users to build applications.',
                'content' => 'No-code development platforms are revolutionizing software creation by enabling users without programming knowledge to build functional applications. This democratization of development is changing how businesses approach digital transformation.

These platforms provide visual interfaces, drag-and-drop functionality, and pre-built components that make application development accessible to everyone. Business users can now create workflows, databases, and even complex applications without writing a single line of code.

The benefits extend beyond accessibility. No-code platforms can significantly reduce development time and costs while enabling rapid prototyping and iteration. Organizations can respond quickly to changing business needs without relying solely on technical teams.

However, it\'s important to understand the limitations. Complex applications with specific requirements may still need traditional development approaches. The key is finding the right balance and using no-code platforms for appropriate use cases while maintaining traditional development capabilities for more complex projects.',
                'status' => 'published',
            ],
            [
                'title' => 'Cybersecurity in the Digital Age: Protecting Your Business',
                'excerpt' => 'Essential cybersecurity strategies and best practices for modern businesses facing evolving digital threats.',
                'content' => 'Cybersecurity has become one of the most critical concerns for businesses of all sizes. With increasing digitalization and remote work, organizations face more sophisticated and frequent cyber threats than ever before.

The threat landscape is constantly evolving, with cybercriminals using advanced techniques like AI-powered attacks, social engineering, and zero-day exploits. Traditional security measures are no longer sufficient to protect against these modern threats.

A comprehensive cybersecurity strategy should include multiple layers of protection: network security, endpoint protection, data encryption, user education, and incident response planning. Regular security audits and penetration testing help identify vulnerabilities before they can be exploited.

Employee training is crucial because human error remains one of the biggest security risks. Regular training on recognizing phishing attempts, using strong passwords, and following security protocols can significantly reduce the risk of successful attacks.

Investing in cybersecurity is no longer optional – it\'s a business necessity. The cost of prevention is always lower than the cost of recovery from a successful attack.',
                'status' => 'published',
            ]
        ];

        foreach ($samplePosts as $postData) {
            $post = Post::create([
                'title' => $postData['title'],
                'slug' => Str::slug($postData['title']),
                'excerpt' => $postData['excerpt'],
                'content' => $postData['content'],
                'status' => $postData['status'],
                'published_at' => now(),
                'user_id' => $users->random()->id,
                'category_id' => $categories->random()->id,
                'views_count' => random_int(50, 1000),
            ]);

            // Attach random tags
            $randomTags = $tags->random(random_int(2, 4));
            $post->tags()->attach($randomTags->pluck('id'));
        }
    }
}