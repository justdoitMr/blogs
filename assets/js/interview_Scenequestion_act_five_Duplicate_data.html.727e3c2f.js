"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7837],{6262:(e,t)=>{t.A=(e,t)=>{const o=e.__vccOpts||e;for(const[e,n]of t)o[e]=n;return o}},6352:(e,t,o)=>{o.r(t),o.d(t,{comp:()=>p,data:()=>c});var n=o(641);const a=[(0,n.Lk)("h1",{id:"五、提问-如何找出大数据量中的重复数据",tabindex:"-1"},[(0,n.Lk)("a",{class:"header-anchor",href:"#五、提问-如何找出大数据量中的重复数据"},[(0,n.Lk)("span",null,"五、提问：如何找出大数据量中的重复数据？")])],-1),(0,n.Lk)("p",null,"场景：表1有50w+条数据；在这50W+数据中找出其中重复的数据。重复数据的条件是：表1中的字段1、字段2、字段3、字段4的值与其他数据的这几个字段值相等（其中表1中有20+字段），请问有什么合适的方案从这50W条数据中筛选出重复的数据（重复数据大概有5000条）。",-1),(0,n.Lk)("p",null,"方案一：通过sql在内存中比对",-1),(0,n.Lk)("p",null,"通过row number，group by having写sql语句进行查询，对数据库性能要求高，耗时。",-1),(0,n.Lk)("p",null,"方案二：",-1),(0,n.Lk)("p",null,"对重复的数据判定条件进行冗余一个hash字段，然后拿这个字段判断比较是否有相同的。",-1),(0,n.Lk)("blockquote",null,[(0,n.Lk)("p",null,"拓展：另外做拉链表可以使用md5值来判断一个数据是否被更新过。")],-1)],r={},p=(0,o(6262).A)(r,[["render",function(e,t){return(0,n.uX)(),(0,n.CE)("div",null,a)}]]),c=JSON.parse('{"path":"/interview/Scenequestion/act_five_Duplicate_data.html","title":"五、提问：如何找出大数据量中的重复数据？","lang":"zh-CN","frontmatter":{"icon":"file","order":5,"author":"bugcode","date":"2020-01-01T00:00:00.000Z","category":["面试"],"tag":["面试","场景"],"sticky":false,"star":true,"footer":"分布式","copyright":"bugcode","description":"五、提问：如何找出大数据量中的重复数据？ 场景：表1有50w+条数据；在这50W+数据中找出其中重复的数据。重复数据的条件是：表1中的字段1、字段2、字段3、字段4的值与其他数据的这几个字段值相等（其中表1中有20+字段），请问有什么合适的方案从这50W条数据中筛选出重复的数据（重复数据大概有5000条）。 方案一：通过sql在内存中比对 通过row ...","head":[["meta",{"property":"og:url","content":"https://www.bugcode.online/interview/Scenequestion/act_five_Duplicate_data.html"}],["meta",{"property":"og:site_name","content":"bugcode 的架构之路"}],["meta",{"property":"og:title","content":"五、提问：如何找出大数据量中的重复数据？"}],["meta",{"property":"og:description","content":"五、提问：如何找出大数据量中的重复数据？ 场景：表1有50w+条数据；在这50W+数据中找出其中重复的数据。重复数据的条件是：表1中的字段1、字段2、字段3、字段4的值与其他数据的这几个字段值相等（其中表1中有20+字段），请问有什么合适的方案从这50W条数据中筛选出重复的数据（重复数据大概有5000条）。 方案一：通过sql在内存中比对 通过row ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-23T07:40:31.000Z"}],["meta",{"property":"article:author","content":"bugcode"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"场景"}],["meta",{"property":"article:published_time","content":"2020-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-23T07:40:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"五、提问：如何找出大数据量中的重复数据？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-23T07:40:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"bugcode\\"}]}"]]},"headers":[],"git":{"createdTime":1729669231000,"updatedTime":1729669231000,"contributors":[{"name":"不爱打代码的程序员","email":"2284609302@qq.com","commits":1}]},"readingTime":{"minutes":1.21,"words":364},"filePathRelative":"interview/Scenequestion/act_five_Duplicate_data.md","localizedDate":"2020年1月1日","excerpt":"\\n<p>场景：表1有50w+条数据；在这50W+数据中找出其中重复的数据。重复数据的条件是：表1中的字段1、字段2、字段3、字段4的值与其他数据的这几个字段值相等（其中表1中有20+字段），请问有什么合适的方案从这50W条数据中筛选出重复的数据（重复数据大概有5000条）。</p>\\n<p>方案一：通过sql在内存中比对</p>\\n<p>通过row number，group by having写sql语句进行查询，对数据库性能要求高，耗时。</p>\\n<p>方案二：</p>\\n<p>对重复的数据判定条件进行冗余一个hash字段，然后拿这个字段判断比较是否有相同的。</p>\\n<blockquote>\\n<p>拓展：另外做拉链表可以使用md5值来判断一个数据是否被更新过。</p>\\n</blockquote>","autoDesc":true}')}}]);