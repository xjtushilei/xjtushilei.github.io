---
layout: post
title: sparql学习sparql示例、dbpedia在线验证
categories: KnowledgeGraph sparql
description: 通过一些例子，将sparql语法进行展示，方便大家学习
keywords: KnowledgeGraph, sparql, dbpedia
---

# 导言
作为sparql群的群主，自己也不太懂sparql，竟然意外接到了一份作业。好久没有接活了。主要就是复习了一下各个语言怎么写。记录一下，供大家学习

**所有的语句可以在wiki网站的[dbpedia在线查询网站](http://dbpedia.org/sparql)在线测试。**


## select

- select的第1个

    问题：中国的首都是什么？


```
select distinct ?c where
{
<http://dbpedia.org/resource/China> <http://dbpedia.org/property/capital> ?c
}
```

- select的第2个

    问题：韩国比较大的城市有哪些？


```
select distinct ?c where
{
<http://dbpedia.org/resource/Korea> <http://dbpedia.org/property/largestCity> ?c
}
```

# ask
- ask第1个

    问题：北京人口是否超过了1千万？


```
prefix xsdt: <http://www.w3.org/2001/XMLSchema#>
ask where
{
<http://dbpedia.org/resource/Beijing> <http://dbpedia.org/property/populationTotal>  ?total.
filter(?total >"10000000"^^xsdt:integer )
}
```


- ask第2个

    问题：姚明是90后吗？


```
prefix xsdt: <http://www.w3.org/2001/XMLSchema#>
ask where
{
<http://dbpedia.org/resource/Yao_Ming> <http://dbpedia.org/ontology/birthDate>  ?date.
filter(?date>"1990-01-01"^^xsdt:date )
}
```

# describe

- 第1个describe

（**说明**：The DESCRIBE query result clause allows the server to return whatever RDF it wants that describes the given resource(s).）
    问题：返回“哈希表”这个实体的所有内容


```
describe ?a
{?a <http://www.w3.org/2000/01/rdf-schema#label> "哈希表"@zh}
```


- describe第2个
    问题：返回“数据结构”类别下的所有实体内容


```
describe ?a
{?a <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:Data_structures>}
```


# filte
- filter的第1个

    问题：请随意列举出生在中国的20个人

```
select distinct ?name where
{
?a <http://www.w3.org/2000/01/rdf-schema#label> ?name.
?a <http://dbpedia.org/property/birthPlace> ?country.
filter regex(str(?country), "China")
}limit 20
```



- filter第2个

    问题：2008年之后的美国灾难电影有哪些？


```
PREFIX dbpprop:<http://dbpedia.org/property/>
prefix xsdt: <http://www.w3.org/2001/XMLSchema#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX category: <http://dbpedia.org/resource/Category:>
SELECT ?filmname {
?film dcterms:subject category:American_disaster_films.
?film dbpprop:name ?filmname.
?film dbpprop:released ?date.
FILTER (?date > "2008-01-01T00:00:00"^^xsdt:dateTime)
}

```


- filter第3个

    问题：名字中包含'Republic'的且在1920年之前成立的国家有哪些？


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>        
PREFIX type: <http://dbpedia.org/class/yago/>
PREFIX prop: <http://dbpedia.org/property/>
SELECT ?lbl ?est
WHERE {
  ?country rdfs:label ?lbl .
  FILTER(bif:contains(?lbl, "Republic")) .
  ?country prop:establishedDate ?est .
  FILTER(?est < "1920-01-01"^^xsd:date) .
}
```


- filter第4个

    问题：1990到1993年出生的NBA球员有哪些有哪些？


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?name
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a  <http://dbpedia.org/ontology/birthDate>  ?date.
 filter(?date>"1990-01-01"^^xsd:date &&
?date<"1993-01-01"^^xsd:date )
}
```


# bound 

- bound的第1个

    问题：1970年前出生的NBA球员中，没有上过大学的人有谁？（这个问题和下一个问题形成对比）


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT distinct  ?name ?college
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a  <http://dbpedia.org/ontology/birthDate>  ?date.
 filter(?date<"1970-01-01"^^xsd:date  )
optional 
{
?a <http://dbpedia.org/ontology/college> ?college
}
filter(!bound(?college))
}
```


- bound的第2个

    问题：1970年前出生的NBA球员中，上过大学的人有谁？


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT distinct  ?name ?college
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a  <http://dbpedia.org/ontology/birthDate>  ?date.
 filter(?date<"1970-01-01"^^xsd:date  )
optional 
{
?a <http://dbpedia.org/ontology/college> ?college
}
filter(bound(?college))
}
```


# not exists

- not exists的第1个

    问题：NBA球员中，法国出生但是不在法国的“Saint”城市出生的人有谁？



```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT  ?name ?country
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a <http://dbpedia.org/property/birthPlace> ?country.
filter regex(str(?country), "France")
filter not exists{
{
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a <http://dbpedia.org/property/birthPlace> ?country.
filter regex(str(?country), "Saint")
}
}
}
```


- not exists的第2个

    问题：出生在西安的名人有哪些？但是这些人不在1970年后出生的人当中


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT  ?name 
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/birthPlace> <http://dbpedia.org/resource/Xi'an>.
filter not exists{
 ?a <http://dbpedia.org/ontology/birthYear> ?date.
 filter(?date>"1970-01-01"^^xsd:date  )
}
}
```

# in

- in第一个（in是限制条件，a in（a,b,c,d）表示返回成功，e in（a,b,c,d）返回失败
） 

    问题：北京的城市人口和总人口是多少？（没有这项指标则忽略）


```
SELECT ?b ?number 
WHERE 
{
 <http://dbpedia.org/resource/Beijing> ?b ?number.
filter( ?b in(<http://dbpedia.org/property/populationUrban>,<http://dbpedia.org/property/populationTotal>)  )
}

```


- in第一个（in是限制条件，a in（a,b,c,d）表示返回成功，e in（a,b,c,d）返回失败） 

    问题：姚明的出生日期和死亡日期是什么时候？如果有数据才返回结果，没有就忽略。


```
SELECT ?b ?date
WHERE 
{
 <http://dbpedia.org/resource/Yao_Ming> ?b ?date.
filter( ?b in(<http://dbpedia.org/ontology/birthDate>,<http://dbpedia.org/ontology/deathDate>)  )
}
```

# regex

- regex的第1个

    问题：NBA球员中，法国出生的有谁？


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT  ?name ?country
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a <http://dbpedia.org/property/birthPlace> ?country.
filter regex(str(?country), "France")
}
```


- regex的第2个

    问题：NBA球员中，名字中有“Jason”的人都有谁？



# minus


- minus（主要就是排除功能）的第1个

    问题：美国浪漫主义电影里，除去2000年以前的电影，还剩下什么电影？


```
PREFIX dbpprop:<http://dbpedia.org/property/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX category: <http://dbpedia.org/resource/Category:>
SELECT ?filmname{
    ?film dcterms:subject category:Romantic_epic_films.
    ?film dbpprop:name ?filmname.
    MINUS{?film dbpprop:released ?date.
    FILTER (?date < 2000 )}
}
```


- minus（主要就是排除功能）的第2个

    问题：NBA队员里，除去出生在美国的，还有哪些人？


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?name
WHERE {
    ?a <http://dbpedia.org/property/name> ?name.
    ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
    ?a  <http://dbpedia.org/ontology/birthDate>  ?date.
    minus{
        ?a <http://dbpedia.org/property/birthPlace> ?country.
        filter regex(str(?country), "American")
        }
}
```

# union

- union（主要进行合并操作）第1个

    问题：中国和韩国的领导人有哪些？


```
SELECT ?people
where{
{
<http://dbpedia.org/resource/China> <http://dbpedia.org/ontology/leader> ?people.
}
union
{
<http://dbpedia.org/resource/Korea> <http://dbpedia.org/property/leaderName> ?people.
}
}
```


- union（主要进行合并操作）第2个

    问题：浪漫主义电影和美国灾难片这两种类型的电影有哪些？


```
PREFIX dbpprop:<http://dbpedia.org/property/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX category: <http://dbpedia.org/resource/Category:>
SELECT ?filmname{
{
?film dcterms:subject category:Romantic_epic_films.
?film dbpprop:name ?filmname.
}
union{
?film dcterms:subject category:American_disaster_films.
?film dbpprop:name ?filmname.
}
}

```

# optional

- optional 第1个

    问题：NBA球员中，出生在1950年以前的人的名字叫什么，如果数据库中有出生地点，也列举出来，没有的话就不用管（备注：其实这也是optional的作用）


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT distinct ?name ?birthPlace
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a  <http://dbpedia.org/ontology/birthDate>  ?date.
 filter(?date<"1950-01-01"^^xsd:date  )
optional {
?a <http://dbpedia.org/property/birthPlace> ?birthPlace
}
}
```


- optional 第2个

    问题：NBA球员中，出生在1970年以前的人的名字叫什么，如果上过大学，请列出大学。（结果中看到有部分人没有大学信息）


```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT distinct  ?name ?college
WHERE {
 ?a <http://dbpedia.org/property/name> ?name.
 ?a  <http://dbpedia.org/property/league> <http://dbpedia.org/resource/National_Basketball_Association>.
?a  <http://dbpedia.org/ontology/birthDate>  ?date.
 filter(?date<"1970-01-01"^^xsd:date  )
optional {
?a <http://dbpedia.org/ontology/college> ?college
}
}

```

# 总结
每个类别几个例子，希望大家在语义网的道路上越走越远！