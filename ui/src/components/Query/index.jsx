import React from "react";
import Button from "../Button";

import "./_index.scss";

const Query = () => {
  const render = (json) => {
    var config = {
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      selector: "#result",
    };
    window.d3sparql.forcegraph(json, config);
  };

  const handleExecution = () => {
    var endpoint = window.d3.select("#endpoint").property("value");
    var sparql = window.d3.select("#sparql").property("value");
    window.d3sparql.query(endpoint, sparql, render);
  };

  return (
    <>
      <div className="config--container">
        <form>
          <input id="endpoint" value="http://dbpedia.org/sparql" type="text" />
          <textarea id="sparql"></textarea>
        </form>
        <Button onClick={handleExecution}>Query</Button>
      </div>
      <span className="title">Query Viz</span>
      <div id="result"></div>
    </>
  );
};

export default Query;

// # https://en.wikipedia.org/wiki/History_of_programming_languages
// # https://en.wikipedia.org/wiki/Perl
// # http://dbpedia.org/page/Perl
// # http://dbpedia.org/sparql
//
// PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
//     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
//     PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
//     PREFIX dbpprop: <http://dbpedia.org/property/>
//     PREFIX dbpedia: <http://dbpedia.org/resource/>
//
//     SELECT DISTINCT ?lang1 ?lang2 ?lang1label ?lang2label ?lang1value ?lang2value ?lang1year ?lang2year
// WHERE {
//       ?lang1 rdf:type dbpedia-owl:ProgrammingLanguage ;
//   rdfs:label ?lang1name ;
//   dbpprop:year ?lang1year .
//       ?lang2 rdf:type dbpedia-owl:ProgrammingLanguage ;
//   rdfs:label ?lang2name ;
//   dbpprop:year ?lang2year .
//       ?lang1 dbpedia-owl:influenced ?lang2 .
//       FILTER (?lang1 != ?lang2)
//       FILTER (LANG(?lang1name) = 'en')
//   FILTER (LANG(?lang2name) = 'en')
//   BIND (replace(?lang1name, " .programming language.", "") AS ?lang1label)
//   BIND (replace(?lang2name, " .programming language.", "") AS ?lang2label)
//   FILTER (?lang1year > 1950 AND ?lang1year < 2020)
//   FILTER (?lang2year > 1950 AND ?lang2year < 2020)
//   # To render older language larger than newer
//   BIND ((2020 - ?lang1year) AS ?lang1value)
//   BIND ((2020 - ?lang2year) AS ?lang2value)
// }
//
