
import { generateRobotsTxt } from '@/utils/sitemapGenerator';

export const handleRobotsRequest = (): Response => {
  try {
    const robotsTxt = generateRobotsTxt();
    
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    
    return new Response('User-agent: *\nAllow: /', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
};
