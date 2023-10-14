//express 모듈 불러오기
const express = require("express");

//express 사용
const app = express();

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const cors = require('cors');
app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public/build')));

app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/public/build/index.html'));
});


const fs = require('fs');
const rdfxml = require('rdfxml-streaming-parser');

// RDF/XML 데이터 파일 또는 스트림 경로
const rdfxmlDataPath = '1.rdf';

// RDF/XML 데이터를 스트림으로 읽기
const inputStream = fs.createReadStream(rdfxmlDataPath, { encoding: 'utf8' });

// 파서 생성
const parser = new rdfxml.RdfXmlParser;

let 메뉴 = [];
let 공간명 = [];
let 내외부 = [];
let 마감재료 = [];
let 부위명 = [];
const cutString = 'http://www.semanticweb.org/hsh/ontologies/2023/5/untitled-ontology-114#';

// 이벤트 핸들러 설정
parser.on('data', (triple) => {

  // 메뉴 추출
  if(triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
    if(triple.object.value == "http://www.semanticweb.org/hsh/ontologies/2023/5/untitled-ontology-114#설계정보"){
      메뉴.push(triple.subject.value.split(cutString)[1]);
    }
  }

  // 공간명 추출
  if(triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
    if(triple.object.value == "http://www.semanticweb.org/hsh/ontologies/2023/5/untitled-ontology-114#공간명"){
      공간명.push(triple.subject.value.split(cutString)[1]);
    }
  }

  // 내/외부 추출
  if(triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
    if(triple.object.value == "http://www.semanticweb.org/hsh/ontologies/2023/5/untitled-ontology-114#내/외부"){
      내외부.push(triple.subject.value.split(cutString)[1]);
    }
  }

   // 마감재료 추출
   if(triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
    if(triple.object.value == "http://www.semanticweb.org/hsh/ontologies/2023/5/untitled-ontology-114#마감재료"){
      마감재료.push(triple.subject.value.split(cutString)[1]);
      console.log(마감재료);
    }
  }

   // 부위명 추출
   if(triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
    if(triple.object.value == "http://www.semanticweb.org/hsh/ontologies/2023/5/untitled-ontology-114#부위명"){
      부위명.push(triple.subject.value.split(cutString)[1]);
      console.log(부위명);
    }
  }
});

// 파싱 시작
inputStream.pipe(parser);

app.get("/api/menu", (req, res) => {
  console.log("들어옴1")
  const menu = {
    메뉴,
    공간명,
    내외부,
    마감재료,
    부위명,
  }
  //유저 정보 반환
  return res.json({ok: true, menu });
})

app.listen(8000, () => console.log("server on"));