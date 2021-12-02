import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

/*
 * Course information for the core courses required for graduation.
 */

const CDA3100 = {
  title: 'Computer Organization I',
  code: 'CDA 3100',
  prereq: 'Prerequisites: COP 3363 or COP 3014 with COP 3353',
  coreq: 'Corequisite: COP 3330',
  description: 'This course is intended for computer science majors ' +
  'with a previous C/C++ background. It introduces fundamental concepts in computer organization ' +
  'and digital logic design, including number representation, instruction set architecture, ' +
  'logic gates and design, datapath and control, pipeline, memory hierarchy, the machine ' +
  'instruction execution cycle, and performance measures and assessment.',
};

const COP3330 = {
  title: 'Data Structures, Algorithms, and General Programming I',
  code: 'COP 3330',
  prereq: 'Prerequisites: COP 3363 or COP 3014 with COP 3353',
  coreq: 'Corequisite: COP 3353',
  description: 'This course focuses on object-oriented programming in a modern programming ' +
  'language; classes, objects, inheritance, and polymorphism; introduction to data structures ' +
  'and container classes.',
};

const COP4530 = {
  title: 'Data Structures, Algorithms, and General Programming II',
  code: 'COP 4530',
  prereq: 'Prerequisites: COP 3330 and MAD 2104',
  coreq: 'Corequisite: CDA 3100',
  description: 'This course focuses on definition, use, and implementation of generic data ' +
  'structures using a modern programming language; reusable program components.',
};

const MAD2104 = {
  title: 'Discrete Mathematics I',
  code: 'MAD 2104',
  prereq: 'Prerequisites: MAC 2311 or COP 3014 and MAC 1140',
  coreq: '',
  description: 'This course covers techniques of definition and logical argument, sets and ' +
  'functions, propositional logic, introduction to graphs and relations, and applications.',
};

const MAD3105 = {
  title: 'Discrete Mathematics II',
  code: 'MAD 3105',
  prereq: 'Prerequisites: MAD 2104 or MGF 3301.',
  coreq: '',
  description: 'This course covers techniques of definition and logical argument, graphs and ' +
  'diagraphs, relations, Boolean algebra, and applications.',
};

const CIS3250 = {
  title: 'Ethics and Computer Science',
  code: 'CIS 3250',
  prereq: 'Prerequisites: COP 3363 or COP 3014 with COP 3353',
  coreq: '',
  description: 'This course presents basic ethical theories and analysis methods as they apply ' +
  'to ethical, social, and legal issues in computing and information technology. Case studies ' +
  'and hypothetical scenarios are discussed for their social, ethical, and legal implications, ' +
  'as well as analyzed through various ethical-analysis methodologies. The course fosters the ' +
  'development of skills in logical and critical analysis of issues and viewpoints. This course ' +
  'satisfies the University’s Oral Communication Competency requirement.',
};

const COP3363 = {
  title: 'Intro to Programming in C++',
  code: 'COP 3363',
  prereq: 'Prerequisites: MAC 1140 or higher; or instructor permission',
  coreq: '',
  description: 'This course covers fundamental concepts and skills of programming in C++ in the ' +
  'Unix Environment. This course is primarily for Computer Science majors who are taking upper ' +
  'division CS courses. Students are also instructed on efficient program design using a ' +
  'combination of procedural and Object Oriented paradigms.',
};

const COP4610 = {
  title: 'Operating Systems and Concurrent Programming',
  code: 'COP 4610',
  prereq: 'Prerequisite: COP 4530',
  coreq: 'Corequisites: CDA 3100 and COP 4530',
  description: 'This course explores design principles of batch, multiprogramming, ' +
  'time-sharing operating systems, linking, loading, input-output inter acting processes, ' +
  'storage process and resource control, and file systems.',
};

const COP4521 = {
  title: 'Secure, Parallel & Distributed Computing in Python',
  code: 'COP 4521',
  prereq: 'Prerequisite: COP 4530',
  coreq: '',
  description: 'This course explores Python, a very popular and versatile ' +
  'programming language with applications across a variety of domains. This programming language ' +
  'owes its popularity to its ease of use and a large and dynamic list of third-party libraries. ' +
  'This course explores how several Python libraries can be used in different scenarios and ' +
  'applications to solve a diverse set of problems.',
};

const CEN4090L = {
  title: 'Software Engineering Capstone',
  code: 'CEN 4090L',
  prereq: 'Prerequisite: COP 4530',
  coreq: 'Corequisite: CEN 4020',
  description: 'In this course, students apply their software engineering, programming, and ' +
  'teamworking skills in a semester-long group project to design and implement an original ' +
  'software system from scratch. The team project exposes students to working in groups on a ' +
  'larger project and the complexity of communications among multiple participants. This course ' +
  'satisfies the University’s Scholarship in Practice requirement.',
};

const CEN4020 = {
  title: 'Software Engineering I',
  code: 'CEN 4020',
  prereq: 'Prerequisite: COP 4530',
  coreq: '',
  description: 'This course covers the principles of programming languages, including language ' +
  'constructs, syntactic and semantic specification methods, runtime structures, implementation ' +
  'techniques, and alternative programming paradigms. The course involves programming ' +
  'assignments in a variety of languages and individual investigations accompanied by a ' +
  'required written report and oral presentation.',
};

const STA4442 = {
  title: 'Intro to Probability',
  code: 'STA 4442',
  prereq: 'Prerequisite: MAC 2312',
  coreq: '',
  description: 'This course covers various topics including combinatorial analysis, random ' +
  'variables (discrete and continuous), probability distributions, independence, conditional ' +
  'probability, sums of random variables, generating functions, central limit theorem, the ' +
  'laws of large numbers, etc.',
};

const COT4420 = {
  title: 'Theory of Computation',
  code: 'COT 4420',
  prereq: 'Prerequisite: MAD 3105',
  coreq: '',
  description: 'This course is an introduction to the theory of computation, including models of ' +
  'computation such as Turing machines; theory of programming languages, including grammars, ' +
  'parsing, syntax, and semantics.',
};

/*
 * Course info for alternative courses that may be taken in place of other core courses.
 */

const COP3014 = {
  title: 'Programming I',
  code: 'COP 3014',
  prereq: 'Prerequisite: MAC 1140',
  coreq: '',
  description: 'This course covers fundamental concepts and skills of programming in a ' +
  'high-level language. Flow of control: sequence, selection, iteration, subprograms. ' +
  'Data structures: arrays, strings, structs, ADT lists and tables. Algorithms using selection ' +
  'and iteration (decision making, finding maxima and minima, basic searching and sorting, ' +
  'simulation, etc.). Good program design using a procedural paradigm, structure, and style ' +
  'are emphasized. Interactive and file IO. Testing and debugging techniques. ' +
  'Intended primarily for computer science or computer engineering majors, or anyone who ' +
  'is required to take COP 3330. This course may be taken with COP 3353 to replace COP 3363.'
};

const COP3353 = {
  title: 'Intro to Unix',
  code: 'COP 3353',
  prereq: '',
  coreq: '',
  description: 'This course for majors and non-majors offers an introduction to the UNIX ' +
  'operating system. Topics include: UNIX history, requesting UNIX accounts, logging into a ' +
  'UNIX system, basic operating system concepts and file structure, basic commands, ' +
  'text editor(s) (to include emacs, vi, and pico), printing, mail, and online help. ' +
  'The goals of this course are to enable students to log in to their UNIX accounts from any ' +
  'type of computer and have a basic understanding of the commands and utilities. ' +
  'This course may be taken with COP 3353 to replace COP 3363.',
};

const STA3032 = {
  title: 'Applied Statistics for Engineers and Scientists',
  code: 'STA 3032',
  prereq: 'Prerequisite: MAC 2312',
  coreq: '',
  description: 'This course aims to provide a calculus based introduction to statistics for ' +
  'students in engineering and science programs. At the end of the course, students should be ' +
  'able  to describe basic statistical analysis methods, the assumptions of the methods, and ' +
  'diagnostics for validating assumptions; Conduct basic descriptive and inferential ' +
  'statistics procedures;  Translate scientific and research questions into statistical ' +
  'questions; Interpret the results of statistical analyses within the appropriate subject ' +
  'context; Outline the capabilities and limitations of using statistics as a means of reasoning ' +
  'about uncertainty and providing answers to scientific questions. This course may be taken ' +
  'in place of STA 4442.',
};

const STA4321 = {
  title: 'Intro to Mathematical Statistics',
  code: 'STA 4321',
  prereq: 'Prerequisite: MAC 2313',
  coreq: '',
  description: 'This aims to provide the comprehensive introduction to the theory of probability ' +
  'and random variables necessary for a first course in mathematical statistics. Topics in the ' +
  'course include the basics of combinatorial probability, axioms of probability events and ' +
  'probabilities of events, conditional probability and independence, conditional expectation, ' +
  'random variables (continuous and discrete), multivariate distributions of random variables, ' +
  'probability inequalities, the Law of Large Numbers, and the Central Limit Theorem. ' +
  'This course may be taken in place of STA 4442.',
};

/*
 * Course info for elective courses that may be taken in place of other core courses.
 */

const COP3252 = {
  title: 'Advanced Programming with Java',
  code: 'COP 3252',
  prereq: 'Prerequisite: COP 3330',
  coreq: '',
  description: 'This course offers instruction in advanced programming using Java. ' +
  'This course assumes the student is conversant with C++. The course covers the core features ' +
  'of the Java language, together with as many advanced topics as time permits.',
};

const CDA4150 = {
  title: 'Computer Architecture',
  code: 'CDA 4150',
  prereq: 'Prerequisite: CDA 3101',
  coreq: '',
  description: 'This course explores high performance architecture design and analysis, ' + 
  'including memory-system design, pipelining, vector computers, and multiprocessors.',
};

const CDA3101 = {
  title: 'Computer Organization II',
  code: 'CDA 3101',
  prereq: 'Prerequisite: CDA 3100',
  coreq: '',
  description: 'This course explores the fundamental concepts in processor design, ' +
  'including datapath and control, pipelining, memory hierarchies, and I/O.',
};

const CIS4360 = {
  title: 'Computer Security Fundamentals',
  code: 'CIS 4360',
  prereq: 'Prerequisite: COP 3330',
  coreq: '',
  description: 'This is an undergraduate-level introduction to computer security, targeted ' +
  'towards seniors and advanced juniors. This course covers a broad range of topics within ' +
  'computer security, such as cryptographic algorithms, security protocols, ' +
  'network authentication, and software security.',
};

const CNT4603 = {
  title: 'Computer and Network System Administration',
  code: 'CNT 4603',
  prereq: ' Prerequisite: CGS 3406 or COP 3014',
  coreq: '',
  description: 'This course offers a hands-on introduction to Unix and Microsoft Windows ' +
  'systems and network administration. Topics include installation, maintenance, and extension ' +
  'of a multi-user computer system; development of administrative policies and procedures; ' +
  'user assistance and education; specifics of the Unix and Windows operating systems; and ' +
  'practical troubleshooting and problem solving.',
};

const CIS4385 = {
  title: 'Cybercrime Detection and Forensics',
  code: 'CIS 4385',
  prereq: 'Prerequisites: CIS 4360 and CJE 3110',
  coreq: '',
  description: 'This course discusses tools, techniques, and procedures for detecting ' +
  'cybercrime and analyzing collected data related to past and on-going cyber offenses, ' +
  'along with preserving the legal value of the collected evidence.',
};

const CEN4681 = {
  title: 'Expert Systems',
  code: 'CEN 4681',
  prereq: '',
  coreq: 'Corequisite: COP 4530',
  description: 'This course covers definitions and historical development, methodology tools ' +
  'for analysis and design, survey of existing systems, inference engines, and theory and ' +
  'applications of fuzzy relational products to new developments in inference engines.',
};

const CAP4601 = {
  title: 'Intro to Artificial Intelligence',
  code: 'CAP 4601',
  prereq: '',
  coreq: 'Corequisite: COP 4530',
  description: 'This first course in Artificial Intelligence (AI) is designed to expose the ' +
  'student to both the breadth and depth of the subject. Topics include problem solving, ' +
  'knowledge and reasoning, acting logically, uncertain knowledge and reasoning, learning, and ' +
  'communicating, perceiving and acting.',
};

const CNT4504 = {
  title: 'Intro to Computer Networks',
  code: 'CNT 4504',
  prereq: '',
  coreq: 'Corequisite: COP 4530',
  description: 'This course covers circuit-switched and packet switched networks; protocols; ' +
  'protocol layering; application layer and socket programming; transport layer, multiplexing ' +
  'and demultiplexing, UDP, TCP, reliability, flow control, and congestion control; ' +
  'network layer, routing protocols, switching technologies, multicast, and mobility; ' +
  'link layer, local area networks, error detection and correction; wireless networks; ' +
  'multimedia networking; network security; network management.',
};

const CIS4626 = {
  title: 'Intro to Offensive Computer Security',
  code: 'CIS 4626',
  prereq: 'Prerequisite: CDA 3100',
  coreq: '',
  description: 'This course provides introductory but comprehensive coverage of fundamental ' +
  'problems, principles, and techniques in offensive computer security including various buffer ' +
  'overflow techniques, format string techniques, basic networking techniques, shellcode ' +
  'development, web application exploitation, software reverse engineering, fuzzing ' +
  'techniques, social engineering techniques, and then commonly used tools for penetration ' +
  'testing with an emphasis on their principles and fundamental techniques.',
};

const CIS4138 = {
  title: 'Intro to Software Reverse Engineering',
  code: 'CIS 4138',
  prereq: 'Prerequisite: CDA 3100',
  coreq: '',
  description: 'This introductory course provides comprehensive coverage of fundamental ' +
  'problems, principles, and techniques in software reverse engineering of binaries including ' +
  'static analysis techniques, disassembly algorithms, dynamic analysis techniques, ' +
  'automated static and dynamic analysis techniques, malware analysis techniques, ' +
  'anti-analysis techniques, and malware obfuscation and packing techniques; many of ' +
  'the techniques will be demonstrated and practiced using IDA. The course also involves ' +
  'analyzing malware samples.',
};

const COP4656 = {
  title: 'Mobile Programming',
  code: 'COP 4656',
  prereq: 'Prerequisite: COP 4530',
  coreq: '',
  description: 'This course teaches students how to program mobile devices. Students use ' +
  'event-based models to write and deploy a content based application using a mobile ' +
  'computing software framework. May be repeated to a maximum of nine semester hours.',
};

const CNT4406 = {
  title: 'Network Security and Cryptography',
  code: 'CNT 4406',
  prereq: '',
  coreq: 'Corequisite: COP 4530',
  description: 'This course examines threats to computer networks, network vulnerabilities, ' +
  'techniques for strengthening passive defenses, tools for establishing an active network ' +
  'defense, and policies for enhancing forensic analysis of crimes and attacks on computer ' +
  'networks. Topics include private and public key cryptography, digital signatures, secret ' +
  'sharing, security protocols, formal methods for analyzing network security, electronic ' +
  'mail security, firewalls, intrusion detection, Internet privacy, and public key ' +
  'infrastructures.',
};

const COP4020 = {
  title: 'Programming Languages',
  code: 'COP 4020',
  prereq: '',
  coreq: 'Corequisite: COP 4530',
  description: 'This course covers the principles of programming languages, including language ' +
  'constructs, syntactic and semantic specification methods, runtime structures, ' +
  'implementation techniques, and alternative programming paradigms. The course involves ' +
  'programming assignments in a variety of languages and individual investigations accompanied ' +
  'by a required written report and oral presentation.',
};

const COP4046C = {
  title: 'Python Programming',
  code: 'COP 4046C',
  prereq: 'Prerequisite: COP 3330',
  coreq: 'Corequisite: COP 4530',
  description: 'This course covers intermediate level Python. Students are expected to know the ' +
  'material taught in COP 4530, and to be comfortable with the programming material taught in ' +
  'COP 3330. This course includes lectures on the python language and development environment ' +
  'and covers select Python modules that demonstrate the versatility of the Python language. ' +
  'Some topics that are covered include types and operations, functions, modules and ' +
  'libraries, text processing, functional programming, object oriented programming, testing, ' +
  'debugging, performance tuning, and algorithm implementations in Python.',
};

const COP4380 = {
  title: 'Reactive Systems Programming',
  code: 'COP 4380',
  prereq: 'Prerequisite: COP 4530',
  coreq: 'Corequisite: COP 4610 or instructor permission',
  description: 'This course covers the theory of Hierarchical State Machines [HSM] and the use ' +
  'of HSM to model and implement Reactive Systems [RS]. The course explores implementations of ' +
  'HSM in C, C++, and Java. HSM are applied for modeling and implementing RS including ' +
  'real-time, multi-threaded, and embedded systems.',
};

const CEN4021 = {
  title: 'Software Engineering II',
  code: 'CEN 4021',
  prereq: 'Prerequisite: CEN 4020',
  coreq: '',
  description: 'This course is the second of a two-semester sequence on project-system ' +
  'development and focuses on software design and implementation. Topics include software ' +
  'design, architectures, testing, deployment, metrics, configuration management, ' +
  'reusability, portability, and interoperability.',
};

const COP4710 = {
  title: 'Theory and Structure of Databases',
  code: 'COP 4710',
  prereq: 'Prerequisites: COP 3330 and MAD 2104',
  coreq: '',
  description: 'This course examines the theory of relational and object-oriented databases; ' +
  'relational database management systems and SQL; design, development, and implementation ' +
  'issues in database systems.',
};

const COT4401 = {
  title: 'Top 10 Algorithms',
  code: 'COT 4401',
  prereq: 'Prerequisite: COP 4530',
  coreq: '',
  description: 'This course focuses on a wide-ranging selection of ten of the most influential ' +
  'algorithms in use today: what they are, how they work, and their impact on modern life.',
};

const COP4342 = {
  title: 'Unix Tools',
  code: 'COP 4342',
  prereq: 'Prerequisite: COP 3330',
  coreq: '',
  description: 'This course is an introduction to selected Unix tools and utilities that are ' +
  'useful for advanced users, programmers, and system administrators, such as shell scripts, ' +
  'the perl language, revision control systems, debuggers, editors, and the make, awk, sed, ' +
  'and expect utilities.',
};

const COP4813 = {
  title: 'Web Applications Programming',
  code: 'COP 4813',
  prereq: 'Prerequisite: COP 3252',
  coreq: '',
  description: 'This course teaches programming of distributed Web applications using Java ' +
  'Database Connectivity, Servlets, Java Server Pages, Remote Method Invocation, and ' +
  'Enterprise Java Beans (both session and entity beans). Use of the Sun Microsystems ' +
  'Java 2 Enterprise Edition development platform either directly or through an Integrated ' +
  'Development Environment such as IBM’s Websphere is also covered.',
};

/**
 * @brief Renders a card that contains course information.
 * 
 * @param {cardInfo} props 
 */
const CourseDescription = (props) => {
  var courseInfo = {
    title: '',
    code: '',
    prereq: '',
    coreq: '',
    description: '',
  };

  // Sets the description based on the selected course
  switch (props.cardInfo[0]) {
    case ('CDA 3100'):
      courseInfo = CDA3100;
      break;
    case ('COP 3330'):
      courseInfo = COP3330;
      break;
    case ('COP 4530'):
      courseInfo = COP4530;
      break;
    case ('MAD 2104'):
      courseInfo = MAD2104;
      break;
    case ('MAD 3105'):
      courseInfo = MAD3105;
      break;
    case ('CIS 3250'):
      courseInfo = CIS3250;
      break;
    case ('COP 3363'):
      courseInfo = COP3363;
      break;
    case ('COP 4610'):
      courseInfo = COP4610;
      break;
    case ('COP 4521'):
      courseInfo = COP4521;
      break;
    case ('CEN 4090L'):
      courseInfo = CEN4090L;
      break;
    case ('CEN 4020'):
      courseInfo = CEN4020;
      break;
    case ('STA 4442'):
      courseInfo = STA4442;
      break;
    case ('COT 4420'):
      courseInfo = COT4420;
      break;
    case ('COP 3014'):
      courseInfo = COP3014;
      break;
    case ('COP 3353'):
      courseInfo = COP3353;
      break;
    case ('STA 3032'):
      courseInfo = STA3032;
      break;
    case ('STA 4321'):
      courseInfo = STA4321;
      break;
    case ('COP 3252'):
      courseInfo = COP3252;
      break;
    case ('CDA 4150'):
      courseInfo = CDA4150;
      break;
    case ('CDA 3101'):
      courseInfo = CDA3101;
      break;
    case ('CIS 4360'):
      courseInfo = CIS4360;
      break;
      case ('CNT 4603'):
      courseInfo = CNT4603;
      break;
    case ('CIS 4385'):
      courseInfo = CIS4385;
      break;
    case ('CEN 4681'):
      courseInfo = CEN4681;
      break;
    case ('CAP 4601'):
      courseInfo = CAP4601;
      break;
    case ('CNT 4504'):
      courseInfo = CNT4504;
      break;
    case ('CIS 4626'):
      courseInfo = CIS4626;
      break;
    case ('CIS 4138'):
      courseInfo = CIS4138;
      break;
    case ('COP 4656'):
      courseInfo = COP4656;
      break;
    case ('CNT 4406'):
      courseInfo = CNT4406;
      break;
    case ('COP 4020'):
      courseInfo = COP4020;
      break;
    case ('COP 4046C'):
      courseInfo = COP4046C;
      break;
    case ('COP 4380'):
      courseInfo = COP4380;
      break;
    case ('CEN 4021'):
      courseInfo = CEN4021;
      break;
    case ('COP 4710'):
      courseInfo = COP4710;
      break;
    case ('COT 4401'):
      courseInfo = COT4401;
      break;
    case ('COP 4342'):
      courseInfo = COP4342;
      break;
    case ('COP 4813'):
      courseInfo = COP4813;
      break;
    default:
      courseInfo = CDA3100;
  }


  return (
    <Card sx={{
      height: '60vh',
      width: '50vw',
    }}
      variant="outlined"
    >
      <CardContent>
        {/* Course name and code */}
        <Typography sx={{ mb: 2 }} variant="h4" >
          {courseInfo.title}
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h6">
          {courseInfo.code}
        </Typography>

        {/* Course prerequisites */}
        {courseInfo.prereq ? (
          <Typography sx={{ mb: 2 }}>
            {courseInfo.prereq}
          </Typography>
        ) : (
          null
        )}

        {/* Course corequisites */}
        {courseInfo.coreq ? (
          <Typography sx={{ mb: 2 }}>
            {courseInfo.coreq}
          </Typography>
        ) : (
          null
        )}

        {/* Course description */}
        <Typography sx={{ mb: 6 }}>
          {courseInfo.description}
        </Typography>

        {/* Extra info for COP 3363 */}
        {courseInfo.code === 'COP 3363' ? (
          <>
            <Typography sx={{ mb: 2 }} variant="h4">
              Alternative Courses
            </Typography>
            <Typography sx={{ mb: 2 }} variant="h6">
              These courses may replace COP 3363 if both are completed:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              COP 3014 - Programming I
            </Typography>
            <Typography sx={{ mb: 2 }}>
              COP 3353 - Intro to UNIX
            </Typography>
          </>
        ) : (
          null
        )}

        {/* Extra info for STA 4442 */}
        {courseInfo.code === 'STA 4442' ? (
          <>
            <Typography sx={{ mb: 2 }} variant="h4">
              Alternative Courses
            </Typography>
            <Typography sx={{ mb: 2 }} variant="h6">
              Either one of these courses may replace STA 4442:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              STA 3032 - Applied Statistics for Engineers and Scientists
            </Typography>
            <Typography sx={{ mb: 2 }}>
              STA 4321 - Intro to Mathematical Statistics
            </Typography>
          </>
        ) : (
          null
        )}
      </CardContent>
    </Card>
  )
}

export default CourseDescription
