const express = require('express')
const app = express()
const port = 3000
const RdfXmlParser = require("rdfxml-streaming-parser").RdfXmlParser;
const myParser = new RdfXmlParser({
  baseIRI: "http://www.semanticweb.org/hsh/ontologies/2023/5/untitled-ontology-114",
  contentType: "application/rdf+xml",
  rdfs: true,
});
const fs = require('fs');

fs.createReadStream('22.rdf')
  .pipe(myParser)
  .on('data', quad => test(quad))

function test(quad) {
  console.log("1 :", quad)
}