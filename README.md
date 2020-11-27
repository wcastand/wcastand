### Hi there 👋

<!--
**wcastand/wcastand** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->

```typescript
import { Informations, Skills, Education, Work } from 'self-description'

const basic_infos: Informations = () => ({
  firstname: 'William',
  lastname: 'Castandet',
  age: 29,
  location: 'France',
  email: 'wcastand@gmail.com',
  phone: '+33 7 64 24 81 53',
  github: 'wcastand',
  npm: 'wcastand',
})

const skills: Skills = `
  - Javascript, HTML, CSS, ...
  - React, React Native, Gatsby, NextJS, ...
  – Node, Hapi, Express, ...
  - PostgreSQL, ArangoDB, Redis, ...
  - Hosting service (Netlify, Vercel, Heroku, ...)
  - Agile software development (Sprints, Kanban, stand up, ...)
`

const educations: Education = () => ({
  'Master 1 - 3D': {
    school: 'ESTEI',
    year: '2014 - 2015',
    skills: '3D - Maya, 3DS Max, Nuke, Fusion, Max Scripts, Python, Lua, ...',
  },
  'Bachelor IT / Multimedia': {
    school: 'ESTEI',
    year: '2011 - 2014',
    skills: [
      '3D - 3DS Max, Fusion, color theory, Storyboard',
      'Design - Adobe suite, After Effects, Premiere',
      'Web - Javascript, PHP, MySQL, HTML, CSS, Flash',
    ],
  },
  'DUT IT': {
    school: 'University of La Rochelle',
    year: '2009 - 2011',
    skills: 'C++, Java, C, SQL, Embedded computing',
  },
})

const experiences: Work = () => ({
  paybase: {
    year: 'May 2019 - July 2020',
    title: 'Fullstack Javascript developer',
    skills: `
      Working on a product full time instead of short projects for the first time, lead frontend.
      Working with FaaS, GraphQL, React, koa, Gatsby, NextJs, ...
      Negotiated 4 h/week for the team to work on Open source and/or self learning.
      Started to learn Rust.
    `,
  },
  planes: {
    year: 'December 2018 - May 2019',
    title: 'Fullstack Javascript developer',
    skills: `
      Web agency working on mobile/web app (React / React-native).
      Using Graphql and services like Vercel, Netlify, AWS, ...
      Worked on Open source project like Dashbored and article to present it.
    `,
  },
  kilix: {
    year: 'January 2016 - December 2017',
    title: 'Fullstack Javascript developer',
    skills: `
      Create Web app, Mobile app and Terminal cli.
      Work in an agile environement (Sprints, Kanban, Stand up, remote work, scoping meeting, ...)
      Work on open source projects (Storybook, babel, fela, cycle, ...)
      Create and maintained open source projects (storybook-addons-jsx, Okami, selectless, ...)
    `,
  },
  offensive_studio: {
    year: 'April-September 2014',
    title: 'PHP developer',
    skills: `
      Create Web app for small to medium companies with a custom CMS made by the agency.
      Create a new Custom CMS to improve workflow in the agency.
    `,
  },
  april_marine: {
    year: 'April-August 2014',
    title: 'PHP developer | designer',
    skills: `Create mobile website based on a design gave to me at the time. Help as a designer to
    create poster, ads and web design.`,
  },
})
```
