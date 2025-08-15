// api/contentful-test.js
// Teste detalhado da API do Contentful

export default async function handler(req, res) {
  console.log('=== CONTENTFUL TEST START ===');
  
  // Credenciais do Contentful
  const configs = [
    {
      name: 'Delivery API',
      spaceId: 'g8ip8odd5vbl',
      accessToken: 'cr6Ra2NQPO9jz2qTWmAK2ykLy0I_4bIqVCyepF8ix-k',
      baseUrl: 'https://cdn.contentful.com'
    },
    {
      name: 'Preview API', 
      spaceId: 'g8ip8odd5vbl',
      accessToken: '5zPxaj2LvLizxduBP6BiRoXvPYFRL8GRrWjMGRWex3U',
      baseUrl: 'https://preview.contentful.com'
    }
  ];
  
  const results = [];
  
  for (const config of configs) {
    console.log(`\nTesting ${config.name}...`);
    
    const result = {
      api: config.name,
      spaceId: config.spaceId,
      tokenPreview: config.accessToken.substring(0, 10) + '...',
      tests: {}
    };
    
    // Test 1: Basic space info
    try {
      const spaceUrl = `${config.baseUrl}/spaces/${config.spaceId}`;
      console.log(`Fetching space info from: ${spaceUrl}`);
      
      const spaceResponse = await fetch(spaceUrl, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
        },
      });
      
      result.tests.spaceInfo = {
        status: spaceResponse.status,
        ok: spaceResponse.ok
      };
      
      if (spaceResponse.ok) {
        const spaceData = await spaceResponse.json();
        result.tests.spaceInfo.name = spaceData.name;
      } else {
        const errorText = await spaceResponse.text();
        result.tests.spaceInfo.error = errorText;
        console.error(`Space info error: ${spaceResponse.status} - ${errorText}`);
      }
    } catch (error) {
      result.tests.spaceInfo = { error: error.message };
    }
    
    // Test 2: Content types
    try {
      const typesUrl = `${config.baseUrl}/spaces/${config.spaceId}/environments/master/content_types`;
      console.log(`Fetching content types from: ${typesUrl}`);
      
      const typesResponse = await fetch(typesUrl, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
        },
      });
      
      result.tests.contentTypes = {
        status: typesResponse.status,
        ok: typesResponse.ok
      };
      
      if (typesResponse.ok) {
        const typesData = await typesResponse.json();
        result.tests.contentTypes.types = typesData.items.map(item => ({
          id: item.sys.id,
          name: item.name
        }));
      } else {
        const errorText = await typesResponse.text();
        result.tests.contentTypes.error = errorText;
        console.error(`Content types error: ${typesResponse.status} - ${errorText}`);
      }
    } catch (error) {
      result.tests.contentTypes = { error: error.message };
    }
    
    // Test 3: Entries for blogCarla
    try {
      const entriesUrl = `${config.baseUrl}/spaces/${config.spaceId}/environments/master/entries?content_type=blogCarla&limit=5`;
      console.log(`Fetching entries from: ${entriesUrl}`);
      
      const entriesResponse = await fetch(entriesUrl, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
        },
      });
      
      result.tests.blogEntries = {
        status: entriesResponse.status,
        ok: entriesResponse.ok
      };
      
      if (entriesResponse.ok) {
        const entriesData = await entriesResponse.json();
        result.tests.blogEntries.total = entriesData.total;
        result.tests.blogEntries.count = entriesData.items.length;
        
        // Get first entry fields to understand structure
        if (entriesData.items.length > 0) {
          const firstEntry = entriesData.items[0];
          result.tests.blogEntries.sampleFields = Object.keys(firstEntry.fields);
          result.tests.blogEntries.sampleEntry = {
            id: firstEntry.sys.id,
            fields: firstEntry.fields
          };
        }
      } else {
        const errorText = await entriesResponse.text();
        result.tests.blogEntries.error = errorText;
        console.error(`Blog entries error: ${entriesResponse.status} - ${errorText}`);
      }
    } catch (error) {
      result.tests.blogEntries = { error: error.message };
    }
    
    results.push(result);
  }
  
  console.log('=== CONTENTFUL TEST COMPLETE ===');
  console.log(JSON.stringify(results, null, 2));
  
  // Return detailed JSON response
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    timestamp: new Date().toISOString(),
    results,
    summary: {
      deliveryApiWorking: results[0]?.tests?.blogEntries?.ok || false,
      previewApiWorking: results[1]?.tests?.blogEntries?.ok || false,
      totalBlogPosts: results[0]?.tests?.blogEntries?.total || 0
    }
  });
}
