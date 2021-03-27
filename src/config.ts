import def from 'ajv/dist/vocabularies/applicator/additionalItems'

const config = {
  server_port: process.env.server_port,
  mongodb_uri: process.env.mongodb_uri,
  elasticsearch_uri: process.env.elasticsearch_uri,
}

export default config
