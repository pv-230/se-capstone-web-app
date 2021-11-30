import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CDA3100 = 'Corequisite: COP 3330. This course is intended for computer science majors with a \
previous C/C++ background. It introduces fundamental concepts in computer organization and digital \
logic design, including number representation, instruction set architecture, logic gates and \
design, datapath and control, pipeline, memory hierarchy, the machine instruction execution cycle, \
and performance measures and assessment.'

const COP3330 = 'Prerequisite: COP 3014 or a comparable course in C or C++ programming. \
Corequisite: COP 3353. This course focuses on object-oriented programming in a modern programming \
language; classes, objects, inheritance, and polymorphism; introduction to data structures and \
container classes.'

const COP4530 = 'Prerequisites: COP 3330 and MAD 2104. Pre- or corequisite: CDA 3100. This course \
focuses on definition, use, and implementation of generic data structures using a modern \
programming language; reusable program components.'

const MAD2104 = 'Prerequisite: MAC 2311 or COP 3014 and MAC 1140. Recommended prerequisite: MAC \
2311. This course covers techniques of definition and logical argument, sets and functions, \
propositional logic, introduction to graphs and relations, and applications. Mathematics majors \
should take MGF 3301 instead of MAD 2104.'

const MAD3105 = 'Prerequisite: MAD 2104 or MGF 3301. Recommended prerequisite: MAC 2311. This \
course covers techniques of definition and logical argument, graphs and diagraphs, relations, \
Boolean algebra, and applications.'

const CIS3250 = 'This course presents basic ethical theories and analysis methods as they apply \
to ethical, social, and legal issues in computing and information technology. Case studies and \
hypothetical scenarios are discussed for their social, ethical, and legal implications, as well \
as analyzed through various ethical-analysis methodologies. The course fosters the development of \
skills in logical and critical analysis of issues and viewpoints. This course satisfies the \
University’s Oral Communication Competency requirement.'

const COP3363 = 'Prerequisite: MAC 1140 or higher; or instructor permission. This course covers \
fundamental concepts and skills of programming in C++ in the Unix Environment. This course is \
primarily for Computer Science majors who are taking upper division CS courses. Students are also \
instructed on efficient program design using a combination of procedural and Object Oriented \
paradigms.'

const COP4610 = 'Prerequisite: COP 4530. Corequisite: CDA 3101 and COP 4530. This course explores \
design principles of batch, multiprogramming, and time-sharing operating systems; linking; \
loading; input-output inter acting processes; storage process and resource control; and file \
systems.'

const COP4521 = 'Prerequisite: COP 4530. This course explores Python, a very popular and versatile \
programming language with applications across a variety of domains. This programming language owes \
its popularity to its ease of use and a large and dynamic list of third-party libraries. This \
course explores how several Python libraries can be used in different scenarios and applications \
to solve a diverse set of problems.'

const CEN4090L = 'Prerequisite: COP 4530. Corequisite: CEN 4020. In this course, students apply \
their software engineering, programming, and teamworking skills in a semester-long group project \
to design and implement an original software system from scratch. The team project exposes \
students to working in groups on a larger project and the complexity of communications among \
multiple participants. This course satisfies the University’s Scholarship in Practice requirement.'

const CEN4020 = 'Corequisite: COP 4530. This course covers the principles of programming \
languages, including language constructs, syntactic and semantic specification methods, runtime \
structures, implementation techniques, and alternative programming paradigms. The course involves \
programming assignments in a variety of languages and individual investigations accompanied by a \
required written report and oral presentation.'

const STA3032 = ''

const COT4420 = 'Prerequisite: MAD 3105. This course is an introduction to the theory of \
computation, including models of computation such as Turing machines; theory of programming \
languages, including grammars, parsing, syntax, and semantics.'

const CourseDescription = (props) => {
  var description = '';

  // Sets the description based on the selected course
  switch (props.cardInfo[0]) {
    case ('CDA3100'):
      description = CDA3100;
      break;
    case ('COP3330'):
      description = COP3330;
      break;
    case ('COP4530'):
      description = COP4530;
      break;
    case ('MAD2104'):
      description = MAD2104;
      break;
    case ('MAD3105'):
      description = MAD3105;
      break;
    case ('CIS3250'):
      description = CIS3250;
      break;
    case ('COP3363'):
      description = COP3363;
      break;
    case ('COP4610'):
      description = COP4610;
      break;
    case ('COP4521'):
      description = COP4521;
      break;
    case ('CEN4090L'):
      description = CEN4090L;
      break;
    case ('CEN4020'):
      description = CEN4020;
      break;
    case ('STA3032'):
      description = STA3032;
      break;
    case ('COT4420'):
      description = COT4420;
      break;
  }

  // Select CDA3100 if no other courses were selected
  if (!description) {
    props.cardInfo[0] = 'CDA3100';
    props.cardInfo[1] = 'Computer Organization I';
    description = CDA3100;
  }

  return (
    <Card sx={{
      height: '75vh',
      width: '50vw',
    }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h4" >
          {props.cardInfo[1]}
        </Typography>
        <Typography sx={{ my: 2 }} variant="h6">
          {props.cardInfo[0]}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CourseDescription