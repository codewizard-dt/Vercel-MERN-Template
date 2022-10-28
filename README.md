# Vercel-MERN-Template

Barebones MERN Stack configured for Vercel

React Frontend with Express Backend on a Serverless Vercel Deployment

## Important to Know

`./vercel.json` is a configuration file that you can read more about [here](https://vercel.com/docs/project-configuration)

```json
{
  "outputDirectory": "client/build", // This is the default React build folder
  "headers": [
    {
      // This applies the following headers to all traffic
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Authorization, Origin, Content-Type, Accept"
        }
      ]
    }
  ],
  "rewrites": [
    // Rewrites do not affect the URL
    {
      // This directs *ALL* api traffic back to the api/index.ts module
      "source": "/api/(.*)",
      "destination": "/api/index.ts"
    },
    {
      // Directs all non-api traffic back to the index.html (React will still render the given URL)
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```