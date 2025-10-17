import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import App from '@/App';
import { convertManifest } from './utils';

const app = express();
const port = 3001;

app.use(express.static('./dist/static'));
app.get('/root', async (req, res) => {
    // TODO: look at this place
    // @ts-ignore
    const manifest = await import(/* webpackIgnore: true */'./static/manifest.json', {
        with: {
            type: 'json',
        },
    });

    res.status(200).json({
        containerId: 'root',
        // TODO: research using pipe stream
        content: renderToString(<App />),
        title: 'Root Page',
        description: 'Root description',
        assets: convertManifest(manifest.default),
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
