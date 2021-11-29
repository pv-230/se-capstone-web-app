export class ClassInfo {
  constructor() {
    this.classCodes = ['MAC 1105', 'MAC 1114', 'MAC 2312', 'STA 4442', 'MAC 1140', 'MAC 2311', 'MAD 2104', 'MAD 3105',
      'COP 3363', 'CIS 3250', 'COP 3330', 'CDA 3100', 'COT 4420', 'COP 4530', 'CEN 4020', 'CEN 4090L', 'COP 4521', 'COP 4610',
      'Foreign Language I', 'Foreign Language II', 'Foreign Language III',
      'CHM 1045C', 'BSC 2010', 'BSC 2011', 'PHY 2048C', 'PHY 2049C', 'XXX xxxx',
      'CXX 3xxx or 4xxx I', 'CXX 4xxx I', 'CIS 4900 or CXX 3xxx', 'CS 4xxx or Advanced Math Elective',
      'CXX 3xxx or 4xxx II', 'CXX 4xxx II', 'CXX 4xxx III', 'CXX 4xxx IV']

    this.classNames = ["College Algebra", "Trigonometry", "Calculus II", "Intro to Probability", "Precalculus", "Calculus I", "Discrete Math I", "Discrete Math II",
      "Intro to Programming in C++", "Ethics in Computer Science", "Data Strucs, Alg's & Gen Program I", "Computer Organization I", "Theory of Computation", "Data Strucs, Alg's & Gen Program II",
      "Software Engineering", "Software Engineering Capstone", "Secure, Parallel & Dist. Python", "Operating Systems & Concurrent Programming",
      'Foreign Language I', 'Foreign Language II', 'Foreign Language III',
      "Gen Chem I w/lab", "Bio Sci I", "Bio Sci II", "Gen Physics I w/lab", "Gen Physics II w/lab", "Science for Majors",
      'CXX 3xxx or 4xxx I', 'CXX 4xxx I', 'CIS 4900 or CXX 3xxx', 'CS 4xxx or Advanced Math Elective',
      'CXX 3xxx or 4xxx II', 'CXX 4xxx II', 'CXX 4xxx III', 'CXX 4xxx IV']

    this.classMapCodes = ['MAC 1105', 'MAC 1114', 'MAC 1140', 'MAC 2311', 'COP 3363', 'MAC 2312', 'COP 3330', 'PHY 2048C', 'XXX xxxx', 'PHY 2049C',
    'MAD 2104', 'CDA 3100', 'CXX 3xxx or 4xxx I', 'COP 4530', 'MAD 3105', 'CIS 3250', 'CXX 3xxx or 4xxx II',
    'COP 4610', 'Foreign Language I', 'CXX 4xxx I', 'STA 4442', 'COP 4521', 'Foreign Language II',
    'CIS 4900 or CXX 3xxx', 'COT 4420', 'Foreign Language III', 'CEN 4020', 'CXX 4xxx II', 'CEN 4090L', 'CS 4xxx or Advanced Math Elective', 'CXX 4xxx III', 'CXX 4xxx IV'
    ]

    this.classMapNames = ['College Algebra', 'Trigonometry', 'Precalculus', 'Calculus I', 'Intro to Programming in C++', 'Calculus II', "Data Strucs, Alg's & Gen Program I", 'Gen Physics I w/lab', 'Science for Majors', 'Gen Physics II w/lab',
    'Discrete Math I', 'Computer Organization I', 'CXX 3xxx or 4xxx I', "Data Strucs, Alg's & Gen Program II", 'Discrete Math II', 'Ethics in Computer Science', 'CXX 3xxx or 4xxx II',
    'Operating Systems & Concurrent Programming', 'Foreign Language I', 'CXX 4xxx I', 'Intro to Probability', 'Secure, Parallel & Dist. Python', 'Foreign Language II',
    'CIS 4900 or CXX 3xxx', 'Theory of Computation', 'Foreign Language III', 'Software Engineering', 'CXX 4xxx II', 'Software Engineering Capstone', 'CS 4xxx or Advanced Math Elective', 'CXX 4xxx III', 'CXX 4xxx IV'
    ]
  }

  getClassName(code) {
    let pos = this.classCodes.indexOf(code);
    if (pos)
      return this.classNames[pos];
    else
      return null;
  }
}