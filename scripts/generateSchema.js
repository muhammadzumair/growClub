import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import { introspectionQuery } from 'graphql/utilities';

const SERVER = 'http://localhost:3000';
const schemaPath = path.resolve(__dirname, 'schema');

// Save JSON of full schema introspection for Babel Relay Plugin to use
fetch(`${SERVER}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({'query': introspectionQuery}),
}).then(res => res.json()).then(schemaJSON => {
  fs.writeFileSync(
    `${schemaPath}.json`,
    JSON.stringify(schemaJSON, null, 2)
  );
});
